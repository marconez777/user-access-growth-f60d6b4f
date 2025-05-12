
import { useState } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { 
  Card, 
  CardContent, 
  CardFooter, 
  CardHeader, 
  CardTitle 
} from "@/components/ui/card";
import { useAuth } from "../contexts/auth";
import { EyeIcon, EyeOffIcon } from "lucide-react";

const Register = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [formErrors, setFormErrors] = useState<{
    name?: string;
    email?: string;
    password?: string;
    confirmPassword?: string;
  }>({});
  
  const { signUp, loading, error } = useAuth();

  const validateForm = () => {
    const errors: {
      name?: string;
      email?: string;
      password?: string;
      confirmPassword?: string;
    } = {};
    
    if (!name.trim()) {
      errors.name = "Nome é obrigatório";
    }
    
    if (!email.trim()) {
      errors.email = "Email é obrigatório";
    } else if (!/\S+@\S+\.\S+/.test(email)) {
      errors.email = "Email inválido";
    }
    
    if (!password) {
      errors.password = "Senha é obrigatória";
    } else if (password.length < 6) {
      errors.password = "Senha deve ter pelo menos 6 caracteres";
    }
    
    if (password !== confirmPassword) {
      errors.confirmPassword = "Senhas não coincidem";
    }
    
    setFormErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (validateForm()) {
      try {
        await signUp(name, email, password);
      } catch (err) {
        // If there's an unhandled error, ensure we're not stuck in loading state
        console.error("Unhandled registration error:", err);
      }
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8">
        <div className="text-center">
          <h1 className="text-3xl font-bold text-gray-900">MKRanker</h1>
          <h2 className="mt-6 text-2xl font-bold text-gray-900">Criar sua conta</h2>
          <p className="mt-2 text-sm text-gray-600">
            Já possui uma conta?{" "}
            <Link to="/login" className="font-medium text-brand-purple hover:text-brand-purpleDark">
              Faça login
            </Link>
          </p>
        </div>
        
        {error && (
          <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded relative" role="alert">
            <span className="block sm:inline">{error}</span>
          </div>
        )}
        
        <Card>
          <form onSubmit={handleSubmit}>
            <CardContent className="pt-6 space-y-4">
              <div className="space-y-1">
                <Label htmlFor="name">Nome completo</Label>
                <Input
                  id="name"
                  placeholder="Seu nome completo"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className={formErrors.name ? "border-red-500" : ""}
                  disabled={loading}
                />
                {formErrors.name && (
                  <p className="text-xs text-red-500">{formErrors.name}</p>
                )}
              </div>
              
              <div className="space-y-1">
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="seu-email@exemplo.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className={formErrors.email ? "border-red-500" : ""}
                  disabled={loading}
                />
                {formErrors.email && (
                  <p className="text-xs text-red-500">{formErrors.email}</p>
                )}
              </div>
              
              <div className="space-y-1">
                <Label htmlFor="password">Senha</Label>
                <div className="relative">
                  <Input
                    id="password"
                    type={showPassword ? "text" : "password"}
                    placeholder="Crie uma senha segura"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className={formErrors.password ? "border-red-500 pr-10" : "pr-10"}
                    disabled={loading}
                  />
                  <button
                    type="button"
                    className="absolute right-3 top-1/2 transform -translate-y-1/2"
                    onClick={() => setShowPassword(!showPassword)}
                    disabled={loading}
                  >
                    {showPassword ? (
                      <EyeOffIcon className="h-4 w-4 text-gray-500" />
                    ) : (
                      <EyeIcon className="h-4 w-4 text-gray-500" />
                    )}
                  </button>
                </div>
                {formErrors.password && (
                  <p className="text-xs text-red-500">{formErrors.password}</p>
                )}
              </div>
              
              <div className="space-y-1">
                <Label htmlFor="confirmPassword">Confirme sua senha</Label>
                <Input
                  id="confirmPassword"
                  type={showPassword ? "text" : "password"}
                  placeholder="Confirme sua senha"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  className={formErrors.confirmPassword ? "border-red-500" : ""}
                  disabled={loading}
                />
                {formErrors.confirmPassword && (
                  <p className="text-xs text-red-500">{formErrors.confirmPassword}</p>
                )}
              </div>
            </CardContent>
            
            <CardFooter className="flex-col gap-4">
              <Button 
                type="submit" 
                className="w-full bg-brand-purple hover:bg-brand-purpleDark"
                disabled={loading}
              >
                {loading ? "Cadastrando..." : "Cadastrar"}
              </Button>
              
              <p className="text-xs text-gray-500 text-center">
                Ao se cadastrar, você concorda com nossos{" "}
                <a href="#" className="text-brand-purple hover:underline">
                  Termos de Serviço
                </a>{" "}
                e{" "}
                <a href="#" className="text-brand-purple hover:underline">
                  Política de Privacidade
                </a>
                .
              </p>
            </CardFooter>
          </form>
        </Card>
      </div>
    </div>
  );
};

export default Register;
