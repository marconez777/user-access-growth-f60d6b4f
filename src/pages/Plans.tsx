
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { CheckIcon } from "lucide-react";

const Plans = () => {
  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-16">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">Nossos Planos</h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Escolha o plano perfeito para você e comece a utilizar todos os recursos do MKRanker
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {/* Plano Básico */}
          <Card className="relative overflow-hidden border-2 hover:border-brand-purple hover:shadow-lg transition-all">
            <CardHeader className="pb-2">
              <CardTitle className="text-2xl">Plano Básico</CardTitle>
              <CardDescription>Para quem está começando</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="mb-6">
                <span className="text-4xl font-bold">R$29</span>
                <span className="text-gray-500">/mês</span>
              </div>
              <ul className="space-y-3">
                <li className="flex items-center gap-2">
                  <CheckIcon className="h-5 w-5 text-green-500" />
                  <span>100 pesquisas por mês</span>
                </li>
                <li className="flex items-center gap-2">
                  <CheckIcon className="h-5 w-5 text-green-500" />
                  <span>Monitoramento de 3 concorrentes</span>
                </li>
                <li className="flex items-center gap-2">
                  <CheckIcon className="h-5 w-5 text-green-500" />
                  <span>Relatórios básicos</span>
                </li>
              </ul>
            </CardContent>
            <CardFooter>
              <Button className="w-full bg-brand-purple hover:bg-brand-purpleDark">
                Escolher Plano
              </Button>
            </CardFooter>
          </Card>

          {/* Plano Pro */}
          <Card className="relative overflow-hidden border-2 border-brand-purple shadow-lg">
            <div className="absolute top-0 right-0 bg-brand-purple text-white px-3 py-1 text-sm font-medium rounded-bl-lg">
              Mais Popular
            </div>
            <CardHeader className="pb-2">
              <CardTitle className="text-2xl">Plano Pro</CardTitle>
              <CardDescription>Para profissionais</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="mb-6">
                <span className="text-4xl font-bold">R$79</span>
                <span className="text-gray-500">/mês</span>
              </div>
              <ul className="space-y-3">
                <li className="flex items-center gap-2">
                  <CheckIcon className="h-5 w-5 text-green-500" />
                  <span>500 pesquisas por mês</span>
                </li>
                <li className="flex items-center gap-2">
                  <CheckIcon className="h-5 w-5 text-green-500" />
                  <span>Monitoramento de 10 concorrentes</span>
                </li>
                <li className="flex items-center gap-2">
                  <CheckIcon className="h-5 w-5 text-green-500" />
                  <span>Relatórios avançados</span>
                </li>
                <li className="flex items-center gap-2">
                  <CheckIcon className="h-5 w-5 text-green-500" />
                  <span>Suporte prioritário</span>
                </li>
              </ul>
            </CardContent>
            <CardFooter>
              <Button className="w-full bg-brand-purple hover:bg-brand-purpleDark">
                Escolher Plano
              </Button>
            </CardFooter>
          </Card>

          {/* Plano Enterprise */}
          <Card className="relative overflow-hidden border-2 hover:border-brand-purple hover:shadow-lg transition-all">
            <CardHeader className="pb-2">
              <CardTitle className="text-2xl">Enterprise</CardTitle>
              <CardDescription>Para grandes empresas</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="mb-6">
                <span className="text-4xl font-bold">R$199</span>
                <span className="text-gray-500">/mês</span>
              </div>
              <ul className="space-y-3">
                <li className="flex items-center gap-2">
                  <CheckIcon className="h-5 w-5 text-green-500" />
                  <span>Pesquisas ilimitadas</span>
                </li>
                <li className="flex items-center gap-2">
                  <CheckIcon className="h-5 w-5 text-green-500" />
                  <span>Monitoramento ilimitado</span>
                </li>
                <li className="flex items-center gap-2">
                  <CheckIcon className="h-5 w-5 text-green-500" />
                  <span>Relatórios personalizados</span>
                </li>
                <li className="flex items-center gap-2">
                  <CheckIcon className="h-5 w-5 text-green-500" />
                  <span>API acesso</span>
                </li>
                <li className="flex items-center gap-2">
                  <CheckIcon className="h-5 w-5 text-green-500" />
                  <span>Suporte 24/7</span>
                </li>
              </ul>
            </CardContent>
            <CardFooter>
              <Button className="w-full bg-brand-purple hover:bg-brand-purpleDark">
                Escolher Plano
              </Button>
            </CardFooter>
          </Card>
        </div>

        <div className="mt-12 text-center">
          <p className="mb-4 text-gray-600">
            Ainda não tem certeza? Fale com nossa equipe para encontrar o melhor plano para você.
          </p>
          <Link to="/login">
            <Button variant="outline" className="mx-auto">Voltar para o login</Button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Plans;
