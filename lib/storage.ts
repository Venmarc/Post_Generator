"use client";

import { useEffect, useState, useCallback } from 'react';
import { supabase } from './supabase';

export interface ExportHistoryItem {
  id: string;
  topic: string;
  platform: string;
  timestamp: string;
  image_url?: string;
  is_exported?: boolean;
}

export interface Telemetry {
  generated: number;
  exported: number;
  lastActivity: string | null;
  history: ExportHistoryItem[];
}

const STORAGE_KEY = 'artenova_telemetry';

const defaultStats: Telemetry = {
  generated: 0,
  exported: 0,
  lastActivity: null,
  history: [],
};

// Helper to convert base64 to Blob for Supabase Storage
const base64ToBlob = (base64: string, contentType: string = 'image/png') => {
  const byteCharacters = atob(base64);
  const byteNumbers = new Array(byteCharacters.length);
  for (let i = 0; i < byteCharacters.length; i++) {
    byteNumbers[i] = byteCharacters.charCodeAt(i);
  }
  const byteArray = new Uint8Array(byteNumbers);
  return new Blob([byteArray], { type: contentType });
};

export function useTelemetry() {
  const [stats, setStats] = useState<Telemetry>(defaultStats);
  const [loading, setLoading] = useState(true);

  const fetchCloudStats = useCallback(async () => {
    try {
      // Get counts
      const { count: totalGenerated } = await supabase
        .from('posts_history')
        .select('*', { count: 'exact', head: true });

      const { count: totalExported } = await supabase
        .from('posts_history')
        .select('*', { count: 'exact', head: true })
        .eq('is_exported', true);

      // Get last 10 history items
      const { data: historyData } = await supabase
        .from('posts_history')
        .select('*')
        .order('created_at', { ascending: false })
        .limit(10);

      const formattedHistory: ExportHistoryItem[] = (historyData || []).map(item => ({
        id: item.id,
        topic: item.topic,
        platform: item.platform,
        timestamp: item.created_at,
        image_url: item.image_url,
        is_exported: item.is_exported
      }));

      const newStats: Telemetry = {
        generated: totalGenerated || 0,
        exported: totalExported || 0,
        lastActivity: formattedHistory[0]?.timestamp || null,
        history: formattedHistory
      };

      setStats(newStats);
      localStorage.setItem(STORAGE_KEY, JSON.stringify(newStats));
    } catch (e) {
      console.error("Cloud fetch failed", e);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    // Load local cache immediately
    const saved = localStorage.getItem(STORAGE_KEY);
    if (saved) {
      setStats(JSON.parse(saved));
    }
    fetchCloudStats();
  }, [fetchCloudStats]);

  const trackGeneration = async (topic: string, platform: string, base64Image?: string) => {
    let imageUrl = '';

    if (base64Image) {
      const fileName = `${Date.now()}-${Math.random().toString(36).substring(7)}.png`;
      const blob = base64ToBlob(base64Image);
      
      const { data: uploadData } = await supabase.storage
        .from('post-assets')
        .upload(fileName, blob);

      if (uploadData) {
        const { data: publicUrlData } = supabase.storage
          .from('post-assets')
          .getPublicUrl(fileName);
        imageUrl = publicUrlData.publicUrl;
      }
    }

    const { data: insertedData } = await supabase
      .from('posts_history')
      .insert([{ topic, platform, image_url: imageUrl }])
      .select()
      .single();

    if (insertedData) {
      fetchCloudStats(); // Refresh stats from cloud
    }
  };

  const trackExport = async (topic: string, platform: string, id?: string) => {
    // If we have an ID (from cloud history), update it. 
    // Otherwise, we find the most recent matching topic/platform
    const query = id ? supabase.from('posts_history').update({ is_exported: true }).eq('id', id)
                    : supabase.from('posts_history').update({ is_exported: true }).eq('topic', topic).eq('platform', platform).is('is_exported', false).order('created_at', { ascending: false }).limit(1);

    await query;
    fetchCloudStats();
  };

  return { 
    ...stats, 
    loading,
    exportRate: stats.generated > 0 ? Math.round((stats.exported / stats.generated) * 100) : 0,
    trackGeneration, 
    trackExport 
  };
}
