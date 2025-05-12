
import { useState } from "react";
import { useSubscription, PlanType } from "../../contexts/SubscriptionContext";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { toast } from "sonner";

interface CheckoutFormProps {
  planType: PlanType;
  onClose: () => void;
}

const getPlanDetails = (planType: PlanType) => {
  switch (planType) {
    case "solo":
      return {
        name: "Solo",
        price: 97,
      };
    case "discovery":
      return {
        name: "Discovery",
        price: 297,
      };
    case "escala":
      return {
        name: "Escala",
        price: 997,
      };
    default:
      return {
        name: "Desconhecido",
        price: 0,
      };
  }
};

const CheckoutForm = ({ planType, onClose }: CheckoutFormProps) => {
  const { initiateMercadoPagoCheckout } = useSubscription();
  const [loading, setLoading] = useState(false);
  const planDetails = getPlanDetails(planType);

  const handleCheckout = async () => {
    try {
      setLoading(true);
      
      // In a real implementation, this would create a checkout session
      // and redirect the user to Mercado Pago
      const checkoutUrl = await initiateMercadoPagoCheckout(planType);
      
      if (checkoutUrl) {
        // In a real app, redirect to Mercado Pago
        window.location.href = checkoutUrl;
      } else {
        toast.error("Erro ao iniciar o pagamento. Tente novamente.");
      }
    } catch (error) {
      console.error("Checkout error:", error);
      toast.error("Erro ao processar pagamento");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Card className="w-full max-w-md mx-auto">
      <CardHeader>
        <CardTitle>Finalizar Assinatura</CardTitle>
        <CardDescription>
          Você está assinando o plano {planDetails.name}
        </CardDescription>
      </CardHeader>
      
      <CardContent className="space-y-4">
        <div className="border-b pb-4">
          <div className="flex justify-between mb-2">
            <span>Plano {planDetails.name}</span>
            <span>R$ {planDetails.price.toFixed(2)}</span>
          </div>
          <div className="text-xs text-gray-500">
            Cobrado mensalmente. Cancele a qualquer momento.
          </div>
        </div>
        
        <div className="pt-2">
          <div className="flex justify-between font-bold text-lg">
            <span>Total</span>
            <span>R$ {planDetails.price.toFixed(2)}</span>
          </div>
        </div>
      </CardContent>
      
      <CardFooter className="flex flex-col space-y-2">
        <Button 
          className="w-full bg-brand-purple hover:bg-brand-purpleDark"
          onClick={handleCheckout}
          disabled={loading}
        >
          {loading ? "Processando..." : "Pagar com Mercado Pago"}
        </Button>
        
        <Button 
          variant="ghost" 
          onClick={onClose}
          disabled={loading}
        >
          Cancelar
        </Button>
      </CardFooter>
    </Card>
  );
};

export default CheckoutForm;
