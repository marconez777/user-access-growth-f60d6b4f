
import { 
  ReactNode, 
  createContext, 
  useContext, 
  useEffect, 
  useState 
} from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";
import { supabase } from "@/integrations/supabase/client";

// Define types
type User = {
  id: string;
  email: string;
  name: string;
};

type AuthContextType = {
  user: User | null;
  loading: boolean;
  error: string | null;
  signIn: (email: string, password: string) => Promise<void>;
  signUp: (name: string, email: string, password: string) => Promise<void>;
  signOut: () => Promise<void>;
  resetPassword: (email: string) => Promise<void>;
};

// Create context
const AuthContext = createContext<AuthContextType | undefined>(undefined);

// Provider component
export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();

  // Initial session check
  useEffect(() => {
    const checkSession = async () => {
      try {
        setLoading(true);
        const { data, error } = await supabase.auth.getSession();
        
        if (error) throw error;
        
        if (data.session) {
          const { data: userData } = await supabase
            .from('profiles')
            .select('*')
            .eq('id', data.session.user.id)
            .single();
          
          if (userData) {
            setUser({
              id: userData.id,
              email: userData.email,
              name: userData.name
            });
          }
        }
      } catch (err) {
        console.error("Session check error:", err);
        setError(err instanceof Error ? err.message : "Unknown error");
      } finally {
        setLoading(false);
      }
    };

    checkSession();

    // Subscribe to auth changes
    const { data: authListener } = supabase.auth.onAuthStateChange(
      async (event, session) => {
        if (event === "SIGNED_IN" && session) {
          const { data: userData } = await supabase
            .from('profiles')
            .select('*')
            .eq('id', session.user.id)
            .single();
          
          if (userData) {
            setUser({
              id: userData.id,
              email: userData.email,
              name: userData.name
            });
          }
        } else if (event === "SIGNED_OUT") {
          setUser(null);
          navigate("/login");
        }
      }
    );

    return () => {
      if (authListener && authListener.subscription) {
        authListener.subscription.unsubscribe();
      }
    };
  }, [navigate]);

  // Sign up a new user
  const signUp = async (name: string, email: string, password: string) => {
    try {
      setLoading(true);
      setError(null);

      console.log("Iniciando cadastro:", { name, email });

      const { data, error } = await supabase.auth.signUp({
        email,
        password,
        options: {
          data: {
            name,
          },
        },
      });

      if (error) {
        console.error("Erro de cadastro:", error);
        throw error;
      }

      console.log("Resposta do cadastro:", data);

      if (data.user) {
        // Create profile record
        const { error: profileError } = await supabase.from('profiles').insert([
          {
            id: data.user.id,
            name,
            email,
          },
        ]);
        
        if (profileError) {
          console.error("Erro ao criar perfil:", profileError);
          throw profileError;
        }

        toast.success("Cadastro realizado com sucesso!");
        navigate("/register-success");
      }
    } catch (err) {
      console.error("Signup error:", err);
      const message = err instanceof Error ? err.message : "Erro ao criar conta";
      setError(message);
      toast.error(message);
    } finally {
      setLoading(false);
    }
  };

  // Sign in an existing user
  const signIn = async (email: string, password: string) => {
    try {
      setLoading(true);
      setError(null);

      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });

      if (error) throw error;

      if (data.user) {
        // Check if user has an active subscription
        const { data: subscriptionData, error: subError } = await supabase
          .from('user_subscriptions')
          .select('*')
          .eq('user_id', data.user.id)
          .eq('status', 'active')
          .single();

        if (subError || !subscriptionData) {
          toast.error("Você precisa ter um plano ativo para acessar.");
          await supabase.auth.signOut();
          setUser(null);
          return;
        }

        toast.success("Login realizado com sucesso!");
        navigate("/dashboard");
      }
    } catch (err) {
      console.error("Login error:", err);
      const message = err instanceof Error ? err.message : "Erro ao fazer login";
      setError(message);
      toast.error(message);
    } finally {
      setLoading(false);
    }
  };

  // Sign out
  const signOut = async () => {
    try {
      setLoading(true);
      await supabase.auth.signOut();
      setUser(null);
      navigate("/login");
      toast.success("Logout realizado com sucesso");
    } catch (err) {
      console.error("Logout error:", err);
      const message = err instanceof Error ? err.message : "Erro ao fazer logout";
      setError(message);
      toast.error(message);
    } finally {
      setLoading(false);
    }
  };

  // Reset password
  const resetPassword = async (email: string) => {
    try {
      setLoading(true);
      setError(null);
      
      const { error } = await supabase.auth.resetPasswordForEmail(email, {
        redirectTo: `${window.location.origin}/reset-password`,
      });
      
      if (error) throw error;
      
      toast.success("Instruções enviadas para o seu e-mail");
    } catch (err) {
      console.error("Reset password error:", err);
      const message = err instanceof Error 
        ? err.message 
        : "Erro ao solicitar redefinição de senha";
      setError(message);
      toast.error(message);
    } finally {
      setLoading(false);
    }
  };

  const value = {
    user,
    loading,
    error,
    signIn,
    signUp,
    signOut,
    resetPassword
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};

// Custom hook to use the auth context
export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
