
import {
  ReactNode,
  createContext,
  useContext,
  useEffect,
  useState,
} from "react";
import { useAuth } from "./AuthContext";
import { createClient } from "@supabase/supabase-js";
import { toast } from "sonner";

// Define plan types
export type PlanType = "solo" | "discovery" | "escala";

// Define plan limits
export interface PlanLimits {
  mercadoPublicoAlvo: number;
  funilDeBusca: number;
  palavrasChave: number;
  textoSeoLp: number;
  textoSeoProduto: number;
  textoSeoBlog: number;
  pautasBlog: number;
  metaDados: number;
}

// Define subscription type
export interface Subscription {
  id: string;
  userId: string;
  planType: PlanType;
  status: "active" | "inactive" | "canceled" | "expired";
  currentPeriodEnd: Date;
  createdAt: Date;
}

// Define usage type
export interface Usage {
  mercadoPublicoAlvo: number;
  funilDeBusca: number;
  palavrasChave: number;
  textoSeoLp: number;
  textoSeoProduto: number;
  textoSeoBlog: number;
  pautasBlog: number;
  metaDados: number;
}

// Define payment history
export interface Payment {
  id: string;
  userId: string;
  amount: number;
  paymentMethod: string;
  date: Date;
  status: string;
}

// Context type
type SubscriptionContextType = {
  subscription: Subscription | null;
  loading: boolean;
  error: string | null;
  usage: Usage;
  planLimits: PlanLimits;
  checkUsageAvailability: (resource: keyof Usage) => boolean;
  incrementUsage: (resource: keyof Usage) => Promise<boolean>;
  payments: Payment[];
  fetchPayments: () => Promise<void>;
  initiateMercadoPagoCheckout: (planType: PlanType) => Promise<string | null>;
  fetchSubscriptionStatus: () => Promise<void>;
};

// Create the Supabase client
const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

// This will be properly set up when the Supabase integration is added
const supabase = createClient(
  supabaseUrl || "https://placeholder.supabase.co",
  supabaseKey || "placeholder-key"
);

// Define plan limits
const PLAN_LIMITS: Record<PlanType, PlanLimits> = {
  solo: {
    mercadoPublicoAlvo: 5,
    funilDeBusca: 5,
    palavrasChave: 20,
    textoSeoLp: 15,
    textoSeoProduto: 15,
    textoSeoBlog: 15,
    pautasBlog: 5,
    metaDados: 50,
  },
  discovery: {
    mercadoPublicoAlvo: 15,
    funilDeBusca: 15,
    palavrasChave: 60,
    textoSeoLp: 60,
    textoSeoProduto: 60,
    textoSeoBlog: 60,
    pautasBlog: 15,
    metaDados: 100,
  },
  escala: {
    mercadoPublicoAlvo: Infinity,
    funilDeBusca: Infinity,
    palavrasChave: Infinity,
    textoSeoLp: Infinity,
    textoSeoProduto: Infinity,
    textoSeoBlog: Infinity,
    pautasBlog: Infinity,
    metaDados: Infinity,
  },
};

// Create context
const SubscriptionContext = createContext<SubscriptionContextType | undefined>(
  undefined
);

// Provider component
export const SubscriptionProvider = ({ children }: { children: ReactNode }) => {
  const { user } = useAuth();
  const [subscription, setSubscription] = useState<Subscription | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [usage, setUsage] = useState<Usage>({
    mercadoPublicoAlvo: 0,
    funilDeBusca: 0,
    palavrasChave: 0,
    textoSeoLp: 0,
    textoSeoProduto: 0,
    textoSeoBlog: 0,
    pautasBlog: 0,
    metaDados: 0,
  });
  const [planLimits, setPlanLimits] = useState<PlanLimits>(PLAN_LIMITS.solo);
  const [payments, setPayments] = useState<Payment[]>([]);

  // Fetch subscription data
  const fetchSubscriptionStatus = async () => {
    if (!user) return;

    try {
      setLoading(true);
      const { data, error } = await supabase
        .from("user_subscriptions")
        .select("*")
        .eq("user_id", user.id)
        .eq("status", "active")
        .order("created_at", { ascending: false })
        .limit(1)
        .single();

      if (error) throw error;

      if (data) {
        setSubscription({
          id: data.id,
          userId: data.user_id,
          planType: data.plan_type,
          status: data.status,
          currentPeriodEnd: new Date(data.current_period_end),
          createdAt: new Date(data.created_at),
        });

        // Set plan limits based on subscription type
        setPlanLimits(PLAN_LIMITS[data.plan_type as PlanType]);
      } else {
        setSubscription(null);
      }

      // Fetch usage data
      const { data: usageData, error: usageError } = await supabase
        .from("user_usage")
        .select("*")
        .eq("user_id", user.id)
        .limit(1)
        .single();

      if (usageError && usageError.code !== "PGRST116") {
        // PGRST116 is "no rows returned" error, which is fine
        throw usageError;
      }

      if (usageData) {
        setUsage({
          mercadoPublicoAlvo: usageData.mercado_publico_alvo || 0,
          funilDeBusca: usageData.funil_de_busca || 0,
          palavrasChave: usageData.palavras_chave || 0,
          textoSeoLp: usageData.texto_seo_lp || 0,
          textoSeoProduto: usageData.texto_seo_produto || 0,
          textoSeoBlog: usageData.texto_seo_blog || 0,
          pautasBlog: usageData.pautas_blog || 0,
          metaDados: usageData.meta_dados || 0,
        });
      }
    } catch (err) {
      console.error("Error fetching subscription:", err);
      setError(err instanceof Error ? err.message : "Unknown error");
    } finally {
      setLoading(false);
    }
  };

  // Fetch payment history
  const fetchPayments = async () => {
    if (!user) return;

    try {
      setLoading(true);
      const { data, error } = await supabase
        .from("user_payments")
        .select("*")
        .eq("user_id", user.id)
        .order("created_at", { ascending: false });

      if (error) throw error;

      if (data) {
        setPayments(
          data.map((payment) => ({
            id: payment.id,
            userId: payment.user_id,
            amount: payment.amount,
            paymentMethod: payment.payment_method,
            date: new Date(payment.created_at),
            status: payment.status,
          }))
        );
      }
    } catch (err) {
      console.error("Error fetching payments:", err);
      setError(err instanceof Error ? err.message : "Unknown error");
    } finally {
      setLoading(false);
    }
  };

  // Check if user has available credits for a resource
  const checkUsageAvailability = (resource: keyof Usage): boolean => {
    if (!subscription || subscription.status !== "active") {
      return false;
    }

    // Check if subscription is expired
    if (new Date() > subscription.currentPeriodEnd) {
      return false;
    }

    // Check usage against limits
    return usage[resource] < planLimits[resource];
  };

  // Increment usage for a resource
  const incrementUsage = async (resource: keyof Usage): Promise<boolean> => {
    if (!user || !subscription) return false;

    if (!checkUsageAvailability(resource)) {
      toast.error(
        "Limite de uso atingido. Faça upgrade do seu plano para continuar."
      );
      return false;
    }

    try {
      // Map front-end keys to database columns
      const dbColumnMap: Record<keyof Usage, string> = {
        mercadoPublicoAlvo: "mercado_publico_alvo",
        funilDeBusca: "funil_de_busca",
        palavrasChave: "palavras_chave",
        textoSeoLp: "texto_seo_lp",
        textoSeoProduto: "texto_seo_produto",
        textoSeoBlog: "texto_seo_blog",
        pautasBlog: "pautas_blog",
        metaDados: "meta_dados",
      };

      // Increment usage in database
      const { data, error } = await supabase.rpc("increment_usage", {
        user_id_param: user.id,
        resource_column: dbColumnMap[resource],
      });

      if (error) throw error;

      // Update local state
      setUsage((prev) => ({
        ...prev,
        [resource]: prev[resource] + 1,
      }));

      return true;
    } catch (err) {
      console.error("Error incrementing usage:", err);
      setError(err instanceof Error ? err.message : "Unknown error");
      return false;
    }
  };

  // Initiate Mercado Pago checkout
  const initiateMercadoPagoCheckout = async (
    planType: PlanType
  ): Promise<string | null> => {
    if (!user) return null;

    try {
      setLoading(true);

      // This is a mock implementation. In a real app, you would:
      // 1. Call a backend endpoint or edge function to create a Mercado Pago preference
      // 2. Receive the checkout URL and redirect the user

      // Mock plan prices
      const planPrices = {
        solo: 97,
        discovery: 297,
        escala: 997,
      };

      // Call to a backend endpoint
      const response = await fetch("/api/create-checkout", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          planType,
          amount: planPrices[planType],
          userId: user.id,
        }),
      });

      if (!response.ok) {
        throw new Error("Failed to create checkout session");
      }

      const data = await response.json();
      return data.checkoutUrl;
    } catch (err) {
      console.error("Error creating checkout:", err);
      setError(err instanceof Error ? err.message : "Unknown error");
      toast.error("Erro ao processar pagamento");
      return null;
    } finally {
      setLoading(false);
    }
  };

  // Fetch subscription when user changes
  useEffect(() => {
    if (user) {
      fetchSubscriptionStatus();
    } else {
      setSubscription(null);
      setUsage({
        mercadoPublicoAlvo: 0,
        funilDeBusca: 0,
        palavrasChave: 0,
        textoSeoLp: 0,
        textoSeoProduto: 0,
        textoSeoBlog: 0,
        pautasBlog: 0,
        metaDados: 0,
      });
    }
  }, [user]);

  const value = {
    subscription,
    loading,
    error,
    usage,
    planLimits,
    checkUsageAvailability,
    incrementUsage,
    payments,
    fetchPayments,
    initiateMercadoPagoCheckout,
    fetchSubscriptionStatus,
  };

  return (
    <SubscriptionContext.Provider value={value}>
      {children}
    </SubscriptionContext.Provider>
  );
};

// Custom hook to use the subscription context
export const useSubscription = () => {
  const context = useContext(SubscriptionContext);
  if (context === undefined) {
    throw new Error(
      "useSubscription must be used within a SubscriptionProvider"
    );
  }
  return context;
};
