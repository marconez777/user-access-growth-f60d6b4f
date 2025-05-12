
import { cn } from "@/lib/utils";

interface UsageLimitProps {
  title: string;
  used: number;
  limit: number;
  className?: string;
}

const UsageLimit = ({ title, used, limit, className }: UsageLimitProps) => {
  const isUnlimited = limit === Infinity;
  const percentage = isUnlimited ? 0 : Math.min((used / limit) * 100, 100);
  const isNearLimit = percentage > 80;
  const isExceeded = percentage >= 100;

  return (
    <div className={cn("p-4 bg-white rounded-lg shadow-sm", className)}>
      <div className="flex justify-between items-center mb-2">
        <span className="font-medium text-sm">{title}</span>
        <span className="text-xs font-medium">
          {isUnlimited ? (
            <span className="text-brand-purple">Ilimitado</span>
          ) : (
            <>
              <span className={isExceeded ? "text-red-500" : "text-gray-600"}>
                {used}
              </span>
              <span className="text-gray-400"> / {limit}</span>
            </>
          )}
        </span>
      </div>

      {!isUnlimited && (
        <div className="w-full bg-gray-100 rounded-full h-2">
          <div
            className={cn(
              "h-full rounded-full",
              isExceeded
                ? "bg-red-500"
                : isNearLimit
                ? "bg-amber-500"
                : "bg-brand-purple"
            )}
            style={{ width: `${percentage}%` }}
          ></div>
        </div>
      )}
    </div>
  );
};

export default UsageLimit;
