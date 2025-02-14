"use client";

import React from "react";
import ReactECharts from "echarts-for-react";
import { PostureRecord } from "../fetch";

/** Minimal type for ECharts tooltip formatter param in a heatmap */
interface HeatmapFormatterParams {
  // The 'data' field for a heatmap typically holds [xIndex, yIndex, value]
  data: [number, number, number];
  // You can add other fields if you need them, e.g. seriesName, color, etc.
}

export default function PostureHeatmapChart({ data }: { data: PostureRecord[] }) {
  // 1) Extract unique pig_ids, sorted
  const pigIds = Array.from(new Set(data.map((d) => d.pig_id))).sort((a, b) => a - b);

  // 2) Extract a set of date/time labels (e.g., by day).
  const dayFormat = (dateStr: string) => dateStr.substring(0, 10); // 'YYYY-MM-DD'
  const daysSet = new Set<string>();
  data.forEach((d) => daysSet.add(dayFormat(d.timestamp)));
  const days = Array.from(daysSet).sort(); // sort chronologically

  // 3) Build heatmap data array: [xIndex, yIndex, postureValue]
  const heatmapData: [number, number, number][] = [];
  data.forEach((record) => {
    const x = days.indexOf(dayFormat(record.timestamp)); // day index
    const y = pigIds.indexOf(record.pig_id);              // pig index
    heatmapData.push([x, y, record.posture]);
  });

  // 4) ECharts option
  const option = {
    tooltip: {
      position: "top",
      // Replace 'any' with our custom type
      formatter: (params: HeatmapFormatterParams) => {
        const [xIndex, yIndex, posture] = params.data;
        return `Pig ID: ${pigIds[yIndex]}<br/>Date: ${days[xIndex]}<br/>Posture: ${posture}`;
      },
    },
    animation: false,
    grid: {
      height: "60%",
      top: "10%",
    },
    xAxis: {
      type: "category",
      data: days,
      splitArea: { show: true },
    },
    yAxis: {
      type: "category",
      data: pigIds.map((id) => `Pig ${id}`),
      splitArea: { show: true },
    },
    visualMap: {
      min: 1,
      max: 5, // if posture is 1..5
      calculable: true,
      orient: "horizontal",
      left: "center",
      bottom: "5%",
    },
    series: [
      {
        name: "Posture Heatmap",
        type: "heatmap",
        data: heatmapData,
        label: {
          show: true,
        },
        emphasis: {
          itemStyle: {
            shadowBlur: 10,
            shadowColor: "rgba(0, 0, 0, 0.5)",
          },
        },
      },
    ],
  };

  return <ReactECharts option={option} style={{ height: 400, width: "100%" }} />;
}