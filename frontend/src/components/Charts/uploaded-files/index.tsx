import { compactFormat } from "@/lib/format-number";
import { cn } from "@/lib/utils";
import { getFileUploadsStats } from "@/services/charts.services";
import { FileUploadsChart } from "./chart";

export async function FileUploadsOverview({ className }: { className?: string }) {
  const data = await getFileUploadsStats();

  return (
    <div
      className={cn(
        "rounded-[10px] bg-white shadow-1 dark:bg-gray-dark dark:shadow-card",
        className,
      )}
    >
      <div className="border-b border-stroke px-6 py-5.5 dark:border-dark-3">
        <div className="flex justify-between">
          <h2 className="mb-1.5 text-2xl font-bold text-dark dark:text-white">
            File Uploads Overview
          </h2>
          <div className="mb-0.5 text-2xl font-bold text-dark dark:text-white">
            {compactFormat(data.total_files_uploaded)}
          </div>
        </div>
        <div className="text-sm font-medium">Total Files Uploaded</div>
      </div>
      <FileUploadsChart data={data.chart} />
    </div>
  );
}
