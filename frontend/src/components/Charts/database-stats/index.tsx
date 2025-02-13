import { compactFormat } from "@/lib/format-number";
import { cn } from "@/lib/utils";
import { getDatabaseStats } from "@/services/charts.services";
import { DatabaseStatsChart } from "./chart";

export async function DatabaseStatsOverview({ className }: { className?: string }) {
  const data = await getDatabaseStats();

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
            Database Stats
          </h2>
          <div className="mb-0.5 text-2xl font-bold text-dark dark:text-white">
            {compactFormat(data.total_queries)}
          </div>
        </div>
        <div className="text-sm font-medium">Total Queries Executed</div>
      </div>
      <DatabaseStatsChart data={data.chart} />
    </div>
  );
}
