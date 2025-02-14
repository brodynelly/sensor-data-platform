// File: app/visualization/posture/posture-over-time/index.tsx
import { cn } from "@/lib/utils"; // if you have a 'cn' utility for classNames
import { PeriodPicker } from "@/components/period-picker"; // if you want a timeframe picker
import { getPostureData } from "../fetch";

import PostureOverTimeChart from "./chart";

type PropsType = {
  timeFrame?: string;
  className?: string;
};

/**
 * Server Component that fetches data, then renders the chart + optional UI
 */
export default async function PostureOverTime({
  timeFrame = "monthly",
  className,
}: PropsType) {
  // 1) Fetch data from your backend
  const data = await getPostureData();

  // 2) Render a container with a heading, timeframe picker, and the chart
  return (
    <div
      className={cn(
        "grid grid-cols-1 grid-rows-[auto_1fr] gap-9 rounded-[10px] bg-white p-7.5 shadow-1 dark:bg-gray-dark dark:shadow-card",
        className
      )}
    >
      <div className="flex flex-wrap items-center justify-between gap-4">
        <h2 className="text-body-2xlg font-bold text-dark dark:text-white">
          Posture Over Time
        </h2>

        {/* If you want a timeframe picker, adapt as needed */}
        <PeriodPicker defaultValue={timeFrame} sectionKey="posture_over_time" />
      </div>

      {/* 3) Pass data to the client chart component */}
      <PostureOverTimeChart data={data} />
    </div>
  );
}