
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";
import { supabase } from "@/integrations/supabase/client";
import { User } from "./types";

export const useAuthProvider = () => {
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
            .select("*")
            .eq("id", data.session.user.id)
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
            .select("*")
            .eq("id", session.user.id)
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

  return {
    user,
    loading,
    error,
    setLoading,
    setError,
    setUser
  };
};
