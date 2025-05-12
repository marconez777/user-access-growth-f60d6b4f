
import { PlanType, useSubscription } from "../../contexts/SubscriptionContext";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { CheckIcon } from "lucide-react";

interface PlanCardProps {
  type: PlanType;
  title: string;
  description: string;
  price: number;
  features: string[];
  popular?: boolean;
  currentPlan?: boolean;
  onSelectPlan: (plan: PlanType) => void;
}

const PlanCard = ({
  type,
  title,
  description,
  price,
  features,
  popular,
  currentPlan,
  onSelectPlan,
}: PlanCardProps) => {
  const { loading } = useSubscription();

  return (
    <div
      className={cn(
        "bg-white rounded-lg overflow-hidden transition-all duration-300",
        popular ? "border-2 border-brand-purple scale-105" : "border border-gray-200",
        currentPlan && "ring-2 ring-brand-purple"
      )}
    >
      {popular && (
        <div className="bg-brand-purple text-white text-center py-1 text-sm font-medium">
          Mais Popular
        </div>
      )}
      
      {currentPlan && (
        <div className="bg-green-500 text-white text-center py-1 text-sm font-medium">
          Seu Plano Atual
        </div>
      )}
      
      <div className="p-6">
        <h3 className="text-xl font-bold mb-2">{title}</h3>
        <p className="text-gray-500 mb-4 text-sm">{description}</p>
        
        <div className="flex items-end mb-6">
          <span className="text-3xl font-bold">R$ {price}</span>
          <span className="text-gray-500 ml-1">/mês</span>
        </div>
        
        <ul className="space-y-3 mb-6">
          {features.map((feature, index) => (
            <li key={index} className="flex items-start">
              <CheckIcon className="h-5 w-5 text-green-500 mr-2 flex-shrink-0 mt-0.5" />
              <span className="text-sm">{feature}</span>
            </li>
          ))}
        </ul>
        
        <Button
          variant={popular ? "default" : "outline"}
          className={cn(
            "w-full",
            popular ? "bg-brand-purple hover:bg-brand-purpleDark" : ""
          )}
          onClick={() => onSelectPlan(type)}
          disabled={loading || currentPlan}
        >
          {currentPlan ? "Plano Atual" : "Começar Agora"}
        </Button>
      </div>
    </div>
  );
};

export default PlanCard;
