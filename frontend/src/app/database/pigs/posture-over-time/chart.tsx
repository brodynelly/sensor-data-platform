// File: app/visualization/posture/posture-over-time/chart.tsx
"use client";

import React from "react";
import ReactECharts from "echarts-for-react";
import { PostureRecord } from "../fetch";

type PropsType = {
  data: PostureRecord[];
};

export default function PostureOverTimeChart({ data }: PropsType) {
  // Group posture data by pig_id
  // e.g., { 1: [ {pig_id:1, posture:10, ...}, ... ], 2: [...], ... }
  const groupedByPig = data.reduce((acc, record) => {
    if (!acc[record.pig_id]) {
      acc[record.pig_id] = [];
    }
    acc[record.pig_id].push(record);
    return acc;
  }, {} as Record<number, PostureRecord[]>);

  // Build ECharts series array
  const series = Object.entries(groupedByPig).map(([pigId, pigRecords]) => ({
    name: `Pig ${pigId}`,
    type: "line",
    smooth: true,
    data: pigRecords.map((r) => [r.timestamp, r.posture]),
  }));

  // ECharts configuration
  const options = {
    title: {
      text: "Posture Data Over Time",
      left: "center",
    },
    tooltip: {
      trigger: "axis",
    },
    legend: {
      top: 30,
    },
    xAxis: {
      type: "time",
      boundaryGap: false,
    },
    yAxis: {
      type: "value",
      name: "Posture Score",
    },
    series,
  };

  return (
    <ReactECharts option={options} style={{ height: 400, width: "100%" }} />
  );
}