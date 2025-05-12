
import { ReactNode } from "react";
import { Link } from "react-router-dom";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useSubscription } from "../../contexts/SubscriptionContext";
import { cn } from "@/lib/utils";

interface ToolCardProps {
  title: string;
  description: string;
  icon: ReactNode;
  link: string;
  resourceType: keyof ReturnType<typeof useSubscription>["usage"];
  used?: number;
  limit?: number;
}

const ToolCard = ({
  title,
  description,
  icon,
  link,
  resourceType,
  used,
  limit,
}: ToolCardProps) => {
  const { usage, planLimits, checkUsageAvailability } = useSubscription();
  
  // Use provided values or get from context
  const usedValue = used !== undefined ? used : usage[resourceType];
  const limitValue = limit !== undefined ? limit : planLimits[resourceType];
  
  const isAvailable = checkUsageAvailability(resourceType);
  const isUnlimited = limitValue === Infinity;
  
  const progress = isUnlimited ? 0 : (usedValue / limitValue) * 100;
  
  return (
    <Card className={cn(
      "transition-all duration-200 hover:shadow-lg",
      !isAvailable && "opacity-75"
    )}>
      <CardHeader className="pb-2">
        <div className="flex justify-between items-center">
          <div className="text-brand-purple">{icon}</div>
          {!isUnlimited && (
            <div className="text-xs text-gray-500 font-medium">
              {usedValue}/{limitValue}
            </div>
          )}
          {isUnlimited && (
            <div className="text-xs text-brand-purple font-medium">
              Ilimitado
            </div>
          )}
        </div>
        <CardTitle className="text-lg">{title}</CardTitle>
        <CardDescription className="text-sm">{description}</CardDescription>
      </CardHeader>
      
      <CardContent>
        {!isUnlimited && (
          <div className="w-full bg-gray-200 rounded-full h-2 mb-2">
            <div
              className={cn(
                "h-full rounded-full",
                progress > 90 ? "bg-red-500" : "bg-brand-purple"
              )}
              style={{ width: `${progress}%` }}
            ></div>
          </div>
        )}
      </CardContent>
      
      <CardFooter>
        <Button
          asChild
          className="w-full"
          variant={isAvailable ? "default" : "outline"}
          disabled={!isAvailable}
        >
          <Link to={link}>
            {isAvailable ? "Acessar" : "Limite Atingido"}
          </Link>
        </Button>
      </CardFooter>
    </Card>
  );
};

export default ToolCard;
