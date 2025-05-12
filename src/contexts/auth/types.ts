
export type User = {
  id: string;
  email: string;
  name: string;
  plano?: string;
  status?: string;
  vencimento?: string;
};

export type AuthContextType = {
  user: User | null;
  loading: boolean;
  error: string | null;
  signIn: (email: string, password: string) => Promise<void>;
  signUp: (name: string, email: string, password: string) => Promise<void>;
  signOut: () => Promise<void>;
  resetPassword: (email: string) => Promise<void>;
};
