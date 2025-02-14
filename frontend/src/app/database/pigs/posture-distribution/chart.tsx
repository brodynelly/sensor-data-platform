// File: app/visualization/posture/posture-distribution/chart.tsx
"use client";

import React from "react";
import ReactECharts from "echarts-for-react";
import { PostureRecord } from "../fetch";

export default function PostureDistributionChart({ data }: { data: PostureRecord[] }) {
  // 1) Count how many times posture is 1, 2, 3, 4, 5
  const postureCounts = [0, 0, 0, 0, 0]; // posture=1..5 => index=0..4
  data.forEach((record) => {
    // posture might be 1..5
    // subtract 1 to map posture=1 => index=0
    postureCounts[record.posture - 1] += 1;
  });

  // 2) ECharts bar chart config
  const option = {
    title: {
      text: "Posture Frequency",
      left: "center",
    },
    tooltip: {
      trigger: "axis",
    },
    xAxis: {
      type: "category",
      data: ["1", "2", "3", "4", "5"],
      name: "Posture Score",
    },
    yAxis: {
      type: "value",
      name: "Count",
    },
    series: [
      {
        data: postureCounts,
        type: "bar",
      },
    ],
  };

  return <ReactECharts option={option} style={{ height: 400, width: "100%" }} />;
}