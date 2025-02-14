// File: app/visualization/posture/posture-heatmap/index.tsx
import { cn } from "@/lib/utils";
import { PeriodPicker } from "@/components/period-picker";
import { getPostureData } from "../fetch";

import PostureHeatmapChart from "./chart";

type PropsType = {
  timeFrame?: string;
  className?: string;
};

export default async function PostureHeatmap({
  timeFrame = "monthly",
  className,
}: PropsType) {
  const data = await getPostureData();

  return (
    <div
      className={cn(
        "grid grid-cols-1 grid-rows-[auto_1fr] gap-9 rounded-[10px] bg-white p-7.5 shadow-1 dark:bg-gray-dark dark:shadow-card",
        className
      )}
    >
      <div className="flex flex-wrap items-center justify-between gap-4">
        <h2 className="text-body-2xlg font-bold text-dark dark:text-white">
          Posture Heatmap
        </h2>

        <PeriodPicker defaultValue={timeFrame} sectionKey="posture_heatmap" />
      </div>

      <PostureHeatmapChart data={data} />
    </div>
  );
}