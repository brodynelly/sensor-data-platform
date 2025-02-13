"use client";

import React, { useEffect, useState } from 'react';
import DataTables, { Pig } from '@/components/data-tables';
import { fetchPigsData } from './fetch';

const PigsPage: React.FC = () => {
  const [pigs, setPigs] = useState<Pig[]>([]);

  useEffect(() => {
    const getData = async () => {
      try {
        const data = await fetchPigsData();
        setPigs(data);
      } catch (error) {
        console.error('Error fetching pigs data:', error);
      }
    };
    getData();
  }, []);

  return (
    <div className="p-8">
      <h1 className="text-2xl font-bold mb-4">Pigs Data Visualization</h1>
      <DataTables pigs={pigs} />
    </div>
  );
};

export default PigsPage;