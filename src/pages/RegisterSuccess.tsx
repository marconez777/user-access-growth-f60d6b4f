
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { CheckCircle } from "lucide-react";

const RegisterSuccess = () => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full text-center space-y-8">
        <div className="flex justify-center">
          <CheckCircle className="h-16 w-16 text-green-500" />
        </div>
        
        <h1 className="text-3xl font-bold text-gray-900">Cadastro realizado com sucesso!</h1>
        
        <div className="mt-6 space-y-4">
          <p className="text-lg text-gray-600">
            Obrigado por se cadastrar no MKRanker
          </p>
          
          <p className="text-gray-500">
            Para acessar todas as funcionalidades da plataforma, faça login e assine um de nossos planos.
          </p>
        </div>
        
        <div className="mt-8">
          <Button asChild className="w-full bg-brand-purple hover:bg-brand-purpleDark">
            <Link to="/login">Fazer Login</Link>
          </Button>
          
          <div className="mt-4">
            <Link to="/" className="text-brand-purple hover:text-brand-purpleDark text-sm">
              Voltar para página inicial
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RegisterSuccess;
