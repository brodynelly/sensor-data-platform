// File: app/visualization/posture/page.tsx
import Breadcrumb from "@/components/Breadcrumbs/Breadcrumb";
import { createTimeFrameExtractor } from "@/utils/timeframe-extractor";
import { Metadata } from "next";

// Our three chart modules
import PostureOverTime from "./posture-over-time";
import PostureHeatmap from "./posture-heatmap";
import PostureDistribution from "./posture-distribution";

export const metadata: Metadata = {
  title: "Basic Chart",
};

type PropsType = {
  searchParams: Promise<{
    selected_time_frame?: string;
  }>;
};

export default async function Page(props: PropsType) {
  // Extract timeframe from the URL's query params if you like
  const { selected_time_frame } = await props.searchParams;
  const extractTimeFrame = createTimeFrameExtractor(selected_time_frame);

  return (
    <>
      <Breadcrumb pageName="Basic Chart" />

      {/* Layout: 3 charts in a grid */}
      <div className="grid grid-cols-12 gap-4 md:gap-6 2xl:gap-7.5">
        {/* 1) Posture Over Time (Line) */}
        <PostureOverTime
          key={extractTimeFrame("posture_over_time")}
          timeFrame={extractTimeFrame("posture_over_time")?.split(":")[1]}
          className="col-span-12 xl:col-span-4"
        />

        {/* 2) Posture Heatmap */}
        <PostureHeatmap
          key={extractTimeFrame("posture_heatmap")}
          timeFrame={extractTimeFrame("posture_heatmap")?.split(":")[1]}
          className="col-span-12 xl:col-span-4"
        />

        {/* 3) Posture Distribution (Bar) */}
        <PostureDistribution
          key={extractTimeFrame("posture_distribution")}
          timeFrame={extractTimeFrame("posture_distribution")?.split(":")[1]}
          className="col-span-12 xl:col-span-4"
        />
      </div>
    </>
  );
}