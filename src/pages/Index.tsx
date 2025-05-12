
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

const Index = () => {
  return (
    <div className="min-h-screen flex flex-col">
      {/* Hero section */}
      <header className="bg-brand-dark text-white">
        <div className="container mx-auto px-4 py-16 lg:py-24">
          <div className="max-w-3xl mx-auto text-center">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6">
              MKRanker
            </h1>
            <p className="text-xl lg:text-2xl mb-8">
              Plataforma completa para marketing de conteúdo e SEO
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button asChild size="lg" className="bg-brand-purple hover:bg-brand-purpleDark">
                <Link to="/register">Começar Agora</Link>
              </Button>
              <Button asChild size="lg" variant="outline" className="text-white border-white hover:bg-white/10">
                <Link to="/login">Login</Link>
              </Button>
            </div>
          </div>
        </div>
      </header>

      {/* Features section */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12">
            Tudo o que você precisa para sua estratégia de conteúdo
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <Card>
              <CardHeader>
                <CardTitle>Mercado e Público Alvo</CardTitle>
                <CardDescription>
                  Defina com precisão o seu público ideal
                </CardDescription>
              </CardHeader>
              <CardContent>
                <p>
                  Obtenha insights detalhados sobre o seu mercado e público-alvo
                  para criar estratégias mais eficientes.
                </p>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader>
                <CardTitle>Palavras-Chave</CardTitle>
                <CardDescription>
                  Encontre as melhores palavras-chave para seu negócio
                </CardDescription>
              </CardHeader>
              <CardContent>
                <p>
                  Pesquise e descubra palavras-chave relevantes para melhorar o
                  posicionamento do seu site nos buscadores.
                </p>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader>
                <CardTitle>Textos Otimizados</CardTitle>
                <CardDescription>
                  Crie conteúdo otimizado para SEO
                </CardDescription>
              </CardHeader>
              <CardContent>
                <p>
                  Gere textos para landing pages, produtos e blogs que convertem
                  e são otimizados para os mecanismos de busca.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Plans section */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-6">
            Nossos Planos
          </h2>
          <p className="text-center text-lg mb-12 max-w-2xl mx-auto">
            Escolha o plano ideal para o seu negócio e comece a criar conteúdos
            otimizados que atraem mais clientes.
          </p>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            {/* Solo Plan */}
            <div className="bg-white rounded-lg shadow-md overflow-hidden">
              <div className="p-6">
                <h3 className="text-xl font-bold mb-2">Solo</h3>
                <p className="text-gray-500 mb-4">
                  Plano para profissionais individuais
                </p>
                <div className="flex items-end mb-6">
                  <span className="text-3xl font-bold">R$ 97</span>
                  <span className="text-gray-500 ml-1">/mês</span>
                </div>
                <Button asChild className="w-full">
                  <Link to="/register">Começar Agora</Link>
                </Button>
              </div>
            </div>
            
            {/* Discovery Plan */}
            <div className="bg-white rounded-lg shadow-md overflow-hidden border-2 border-brand-purple transform scale-105">
              <div className="bg-brand-purple text-white text-center py-1">
                Mais Popular
              </div>
              <div className="p-6">
                <h3 className="text-xl font-bold mb-2">Discovery</h3>
                <p className="text-gray-500 mb-4">
                  Plano para pequenas empresas
                </p>
                <div className="flex items-end mb-6">
                  <span className="text-3xl font-bold">R$ 297</span>
                  <span className="text-gray-500 ml-1">/mês</span>
                </div>
                <Button asChild className="w-full">
                  <Link to="/register">Começar Agora</Link>
                </Button>
              </div>
            </div>
            
            {/* Escala Plan */}
            <div className="bg-white rounded-lg shadow-md overflow-hidden">
              <div className="p-6">
                <h3 className="text-xl font-bold mb-2">Escala</h3>
                <p className="text-gray-500 mb-4">
                  Plano para empresas em crescimento
                </p>
                <div className="flex items-end mb-6">
                  <span className="text-3xl font-bold">R$ 997</span>
                  <span className="text-gray-500 ml-1">/mês</span>
                </div>
                <Button asChild className="w-full">
                  <Link to="/register">Começar Agora</Link>
                </Button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA section */}
      <section className="bg-brand-purple py-16 text-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-6">
            Pronto para impulsionar seu marketing de conteúdo?
          </h2>
          <p className="text-xl mb-8 max-w-2xl mx-auto">
            Comece agora e veja como nossa plataforma pode ajudar seu negócio a
            atrair mais clientes.
          </p>
          <Button asChild size="lg" variant="outline" className="bg-white text-brand-purple hover:bg-gray-100 border-white">
            <Link to="/register">Criar Minha Conta</Link>
          </Button>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-8">
        <div className="container mx-auto px-4">
          <div className="text-center">
            <h3 className="text-xl font-bold mb-4">MKRanker</h3>
            <p className="text-gray-400">
              © {new Date().getFullYear()} MKRanker. Todos os direitos reservados.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;
