
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

    // Create the user in Supabase Auth
    const { data, error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        data: {
          name,
        },
        emailRedirectTo: `${window.location.origin}/login`,
      },
    });

    if (error) {
      console.error("Erro de cadastro:", error);
      throw error;
    }

    console.log("Resposta do cadastro:", data);

    // Create profile record directly using service role (bypassing RLS)
    // Since we can't use service role from client, we'll use the identity provided
    // and set appropriate metadata during signup
    if (data.user) {
      toast.success("Cadastro realizado com sucesso! Verifique seu email para confirmar.");
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
      // Fetch user profile to check plano and status
      const { data: profileData, error: profileError } = await supabase
        .from('profiles')
        .select("*")
        .eq("id", data.user.id)
        .single();
      
      if (profileError) {
        console.error("Erro ao buscar perfil:", profileError);
      }
      
      // Check if user has a valid subscription
      if (profileData && (profileData.plano === 'free' || profileData.status !== 'ativo')) {
        toast.info("Você precisa ter um plano ativo para acessar. Redirecionando para página de planos.");
        navigate("/plans");
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
