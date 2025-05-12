
import { 
  ReactNode, 
  createContext, 
  useContext
} from "react";
import { useNavigate } from "react-router-dom";
import { AuthContextType } from "./types";
import { useAuthProvider } from "./useAuthProvider";
import { signIn, signUp, signOut, resetPassword } from "./authActions";

// Create context
const AuthContext = createContext<AuthContextType | undefined>(undefined);

// Provider component
export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const { 
    user, 
    loading, 
    error, 
    setLoading, 
    setError,
    setUser
  } = useAuthProvider();
  const navigate = useNavigate();

  // Authentication actions
  const handleSignIn = async (email: string, password: string) => {
    return signIn(email, password, setLoading, setError, navigate);
  };

  const handleSignUp = async (name: string, email: string, password: string) => {
    return signUp(name, email, password, setLoading, setError, navigate);
  };

  const handleSignOut = async () => {
    return signOut(setLoading, setError, setUser, navigate);
  };

  const handleResetPassword = async (email: string) => {
    return resetPassword(email, setLoading, setError);
  };

  const value = {
    user,
    loading,
    error,
    signIn: handleSignIn,
    signUp: handleSignUp,
    signOut: handleSignOut,
    resetPassword: handleResetPassword
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
