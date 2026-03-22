"use client";

import { useEffect, useState } from 'react';

const DRAFT_KEY = 'artenova_current_draft';

export interface Draft {
  topic: string;
  platform: string;
}

export function useDraft(initialTopic: string = "", initialPlatform: string = "LinkedIn") {
  const [topic, setTopic] = useState(initialTopic);
  const [platform, setPlatform] = useState(initialPlatform);
  const [isHydrated, setIsHydrated] = useState(false);

  // Load draft on mount
  useEffect(() => {
    const saved = localStorage.getItem(DRAFT_KEY);
    if (saved) {
      try {
        const parsed = JSON.parse(saved);
        setTopic(parsed.topic || "");
        setPlatform(parsed.platform || "LinkedIn");
      } catch (e) {
        console.error("Failed to load draft", e);
      }
    }
    setIsHydrated(true);
  }, []);

  // Save draft whenever it changes
  useEffect(() => {
    if (!isHydrated) return;
    localStorage.setItem(DRAFT_KEY, JSON.stringify({ topic, platform }));
  }, [topic, platform, isHydrated]);

  const clearDraft = () => {
    setTopic("");
    localStorage.removeItem(DRAFT_KEY);
  };

  return { topic, setTopic, platform, setPlatform, clearDraft, isHydrated };
}
