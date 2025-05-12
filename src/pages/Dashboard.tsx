import { useEffect } from "react";
import { useAuth } from "../contexts/auth";
import { useSubscription } from "../contexts/SubscriptionContext";
import MainLayout from "../components/Layout/MainLayout";
import ToolCard from "../components/Tools/ToolCard";
import UsageLimit from "../components/Subscription/UsageLimit";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import {
  BarChart,
  LayoutDashboard,
  Search,
  KeyRound,
  FileText,
  ClipboardList,
  Database,
  PackageOpen,
  BookOpen,
  User2,
  Calendar,
  AlertCircle,
  ArrowUpCircle,
} from "lucide-react";

const Dashboard = () => {
  const { user } = useAuth();
  const { subscription, usage, planLimits, loading } = useSubscription();

  // Format date
  const formatDate = (date: Date | undefined) => {
    if (!date) return "N/A";
    return new Intl.DateTimeFormat("pt-BR", {
      year: "numeric",
      month: "long",
      day: "numeric",
    }).format(date);
  };

  // Get plan label
  const getPlanLabel = () => {
    if (!subscription) return "Sem plano";
    switch (subscription.planType) {
      case "solo":
        return "Solo";
      case "discovery":
        return "Discovery";
      case "escala":
        return "Escala";
      default:
        return "Desconhecido";
    }
  };

  return (
    <MainLayout>
      <div className="space-y-6">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between">
          <h1 className="text-3xl font-bold">Painel de Controle</h1>
          <p className="text-gray-500">
            Bem-vindo ao seu dashboard personalizado
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2">
            <Card>
              <CardHeader className="pb-2">
                <CardTitle>Visão Geral</CardTitle>
                <CardDescription>
                  Resumo do seu plano e utilização
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  {/* Plan Card */}
                  <Card>
                    <CardHeader className="py-3">
                      <CardTitle className="text-sm font-medium">
                        Plano Atual
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="text-2xl font-bold text-brand-purple">
                        {getPlanLabel()}
                      </div>
                      <p className="text-xs text-gray-500 mt-1">
                        Renovação em{" "}
                        {formatDate(subscription?.currentPeriodEnd)}
                      </p>
                    </CardContent>
                  </Card>

                  {/* Current Period Card */}
                  <Card>
                    <CardHeader className="py-3">
                      <CardTitle className="text-sm font-medium">
                        Vencimento
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="flex items-center gap-2">
                      <Calendar className="h-4 w-4 text-brand-purple" />
                      <div className="font-semibold">
                        {formatDate(subscription?.currentPeriodEnd)}
                      </div>
                    </CardContent>
                  </Card>

                  {/* Upgrade Card */}
                  <Card>
                    <CardHeader className="py-3">
                      <CardTitle className="text-sm font-medium">
                        Gerenciar Plano
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <Button
                        asChild
                        className="w-full"
                        variant="outline"
                        size="sm"
                      >
                        <Link to="/financeiro">
                          <ArrowUpCircle className="h-4 w-4 mr-2" />
                          Alterar Plano
                        </Link>
                      </Button>
                    </CardContent>
                  </Card>
                </div>

                <div className="mt-6">
                  <h3 className="text-lg font-semibold mb-3">
                    Limites de Uso Restante
                  </h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                    <UsageLimit
                      title="Mercado e Público Alvo"
                      used={usage.mercadoPublicoAlvo}
                      limit={planLimits.mercadoPublicoAlvo}
                    />
                    <UsageLimit
                      title="Funil de Busca"
                      used={usage.funilDeBusca}
                      limit={planLimits.funilDeBusca}
                    />
                    <UsageLimit
                      title="Palavras Chave"
                      used={usage.palavrasChave}
                      limit={planLimits.palavrasChave}
                    />
                    <UsageLimit
                      title="Texto SEO para LP"
                      used={usage.textoSeoLp}
                      limit={planLimits.textoSeoLp}
                    />
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          <Card>
            <CardHeader>
              <CardTitle>Status da Assinatura</CardTitle>
              <CardDescription>Detalhes do seu plano atual</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              {subscription?.status === "active" ? (
                <div className="flex items-center gap-2 text-green-500">
                  <CheckCircle className="h-5 w-5" />
                  <span className="font-medium">Assinatura Ativa</span>
                </div>
              ) : (
                <div className="flex items-center gap-2 text-amber-500">
                  <AlertCircle className="h-5 w-5" />
                  <span className="font-medium">Assinatura Inativa</span>
                </div>
              )}

              <div className="pt-4 border-t">
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span className="text-sm text-gray-500">Plano</span>
                    <span className="font-medium">{getPlanLabel()}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm text-gray-500">Status</span>
                    <span
                      className={
                        subscription?.status === "active"
                          ? "text-green-500 font-medium"
                          : "text-amber-500 font-medium"
                      }
                    >
                      {subscription?.status === "active"
                        ? "Ativo"
                        : "Inativo"}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm text-gray-500">
                      Data de vencimento
                    </span>
                    <span>
                      {formatDate(subscription?.currentPeriodEnd)}
                    </span>
                  </div>
                </div>

                <Button asChild className="w-full mt-6">
                  <Link to="/financeiro">
                    <ArrowUpCircle className="h-4 w-4 mr-2" />
                    Gerenciar Assinatura
                  </Link>
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>

        <div>
          <h2 className="text-2xl font-bold mb-6">Ferramentas Disponíveis</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            <ToolCard
              title="Mercado e Público Alvo"
              description="Defina seu público ideal com precisão"
              icon={<User2 className="h-6 w-6" />}
              link="/ferramentas/mercado-publico-alvo"
              resourceType="mercadoPublicoAlvo"
            />
            <ToolCard
              title="Funil de Busca"
              description="Crie funis de busca otimizados"
              icon={<Search className="h-6 w-6" />}
              link="/ferramentas/funil-de-busca"
              resourceType="funilDeBusca"
            />
            <ToolCard
              title="Palavras Chave"
              description="Encontre as melhores palavras-chave"
              icon={<KeyRound className="h-6 w-6" />}
              link="/ferramentas/palavras-chaves"
              resourceType="palavrasChave"
            />
            <ToolCard
              title="Texto SEO para LP"
              description="Crie landing pages otimizadas"
              icon={<FileText className="h-6 w-6" />}
              link="/ferramentas/texto-seo-lp"
              resourceType="textoSeoLp"
            />
            <ToolCard
              title="Texto SEO para Produto"
              description="Descrições de produtos otimizadas"
              icon={<PackageOpen className="h-6 w-6" />}
              link="/ferramentas/texto-seo-produto"
              resourceType="textoSeoProduto"
            />
            <ToolCard
              title="Texto SEO para Blog"
              description="Conteúdo para blogs otimizado"
              icon={<BookOpen className="h-6 w-6" />}
              link="/ferramentas/texto-seo-blog"
              resourceType="textoSeoBlog"
            />
            <ToolCard
              title="Pautas para Blog"
              description="Ideias de pautas para seu blog"
              icon={<ClipboardList className="h-6 w-6" />}
              link="/ferramentas/pautas-blog"
              resourceType="pautasBlog"
            />
            <ToolCard
              title="Meta Dados"
              description="Gere meta dados otimizados"
              icon={<Database className="h-6 w-6" />}
              link="/ferramentas/meta-dados"
              resourceType="metaDados"
            />
          </div>
        </div>
      </div>
    </MainLayout>
  );
};

export default Dashboard;

// Missing component that we need to define
const CheckCircle = ({ className }: { className?: string }) => {
  return (
    <div className={className}>
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="24"
        height="24"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" />
        <polyline points="22 4 12 14.01 9 11.01" />
      </svg>
    </div>
  );
};
