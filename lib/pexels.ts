/**
 * Pexels API abstraction with smart querying and 24h caching.
 */

export interface PexelsPhoto {
  id: number;
  width: number;
  height: number;
  url: string;
  photographer: string;
  photographer_url: string;
  src: {
    original: string;
    large2x: string;
    large: string;
    medium: string;
    small: string;
    portrait: string;
    landscape: string;
    tiny: string;
  };
}

export interface PexelsSearchResponse {
  page: number;
  per_page: number;
  photos: PexelsPhoto[];
  total_results: number;
  next_page?: string;
}

/**
 * Searches for a background image on Pexels using smart query construction.
 */
export async function searchPexels(query: string): Promise<PexelsPhoto | null> {
  const apiKey = process.env.PEXELS_API_KEY;
  if (!apiKey) {
    console.warn("PEXELS_API_KEY is missing in environment.");
    return null;
  }

  try {
    // We use standard fetch with revalidation for 24h caching
    const response = await fetch(
      `https://api.pexels.com/v1/search?query=${encodeURIComponent(query)}&per_page=1&orientation=portrait&size=large`,
      {
        headers: {
          Authorization: apiKey,
        },
        next: {
          revalidate: 86400, // 24 hours
        },
      }
    );

    if (!response.ok) {
      if (response.status === 429) {
        console.error("Pexels API Rate Limit Exceeded (429)");
      } else {
        console.error(`Pexels API Error: ${response.status} ${response.statusText}`);
      }
      return null;
    }

    const data: PexelsSearchResponse = await response.json();
    return data.photos[0] || null;
  } catch (error) {
    console.error("Pexels Search Exception:", error);
    return null;
  }
}

/**
 * Builds a smart search query based on artistic direction.
 */
export function buildPexelsQuery(theme: string, mood: string, layout: string): string {
  // mapping common internal keys to descriptive terms
  const terms = [theme, mood, layout].filter(Boolean);
  
  // Refine common values
  const refined = terms.map(t => {
    switch (t.toLowerCase()) {
      case 'cinematic': return 'dramatic cinematic lighting';
      case 'minimal': return 'minimalist clean aesthetic';
      case 'cosmic': return 'outer space nebula cosmic';
      case 'botanical': return 'nature plants botanical leaves';
      case 'neon': return 'cyberpunk neon lights city';
      case 'glassmorphic': return 'abstract glass shapes blur';
      case 'metallic': return 'industrial metallic texture';
      case 'pastel': return 'soft pastel gradient';
      default: return t;
    }
  });

  return refined.join(' ') + ' background';
}
