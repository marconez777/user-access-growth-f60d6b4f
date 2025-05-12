
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";

export const signUp = async (
  name: string, 
  email: string, 
  password: string,
  setLoading: (loading: boolean) => void,
  setError: (error: string | null) => void,
  navigate: (path: string) => void
) => {
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
      const { error: profileError } = await supabase.from("profiles").insert([
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

export const signIn = async (
  email: string, 
  password: string,
  setLoading: (loading: boolean) => void,
  setError: (error: string | null) => void,
  navigate: (path: string) => void
) => {
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
        .from("user_subscriptions")
        .select("*")
        .eq("user_id", data.user.id)
        .eq("status", "active")
        .single();

      if (subError || !subscriptionData) {
        toast.error("Você precisa ter um plano ativo para acessar.");
        await supabase.auth.signOut();
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

export const signOut = async (
  setLoading: (loading: boolean) => void,
  setError: (error: string | null) => void,
  setUser: (user: null) => void,
  navigate: (path: string) => void
) => {
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

export const resetPassword = async (
  email: string,
  setLoading: (loading: boolean) => void,
  setError: (error: string | null) => void
) => {
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
