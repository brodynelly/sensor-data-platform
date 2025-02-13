export interface Pig {
    pig_id: number;
    breed: string;
    in_heat: boolean;
    breeding_time: string;
    pregnant_check: boolean;
    farrowing_time: string;
  }
  
  export async function fetchPigsData(): Promise<Pig[]> {
    const response = await fetch('http://localhost:3001/api/pigs');
    if (!response.ok) {
      throw new Error('Failed to fetch pigs data');
    }
    return response.json();
  }