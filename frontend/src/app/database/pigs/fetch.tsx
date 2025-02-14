"use client";
export interface PostureRecord {
    posture_id: number;
    pig_id: number;
    posture: number;
    timestamp: string; // ISO datetime string
  }
  
  /**
   * Fetch posture data from your Node.js backend.
   * You can add query parameters for timeframe if needed.
   */
  export async function getPostureData(): Promise<PostureRecord[]> {
    const res = await fetch('http://localhost:3001/api/posture', {
      ///next: { revalidate: 0 } // (optional) if you want no caching in Next.js
    });
    if (!res.ok) {
      throw new Error('Failed to fetch posture data');
    }
    return res.json();
  }