
import { Link, useLocation } from "react-router-dom";
import { useAuth } from "../../contexts/AuthContext";
import { useSubscription } from "../../contexts/SubscriptionContext";
import { cn } from "@/lib/utils";

// Icons
import {
  LayoutDashboard,
  Search,
  KeyRound,
  FileText,
  ClipboardList,
  Database,
  PackageOpen,
  BookOpen,
  User2,
  CreditCard,
  LogOut,
  MenuIcon,
  XIcon,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { useState } from "react";

const Sidebar = () => {
  const { signOut } = useAuth();
  const { subscription } = useSubscription();
  const location = useLocation();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const isActive = (path: string) => location.pathname.startsWith(path);

  const toggleMobileMenu = () => {
    setMobileMenuOpen(!mobileMenuOpen);
  };

  const planTypeLabel = {
    solo: "Solo",
    discovery: "Discovery",
    escala: "Escala",
  };

  const navItems = [
    {
      group: "GENERAL",
      items: [
        {
          label: "Dashboard",
          icon: <LayoutDashboard className="h-5 w-5" />,
          path: "/dashboard",
        },
      ],
    },
    {
      group: "APPS",
      items: [
        {
          label: "Mercado e Público Alvo",
          icon: <User2 className="h-5 w-5" />,
          path: "/ferramentas/mercado-publico-alvo",
        },
        {
          label: "Funil de Busca",
          icon: <Search className="h-5 w-5" />,
          path: "/ferramentas/funil-de-busca",
        },
        {
          label: "Palavras Chaves",
          icon: <KeyRound className="h-5 w-5" />,
          path: "/ferramentas/palavras-chaves",
        },
        {
          label: "Texto SEO para LP",
          icon: <FileText className="h-5 w-5" />,
          path: "/ferramentas/texto-seo-lp",
        },
        {
          label: "Texto SEO para Produto",
          icon: <PackageOpen className="h-5 w-5" />,
          path: "/ferramentas/texto-seo-produto",
        },
        {
          label: "Texto SEO para Blog",
          icon: <BookOpen className="h-5 w-5" />,
          path: "/ferramentas/texto-seo-blog",
        },
        {
          label: "Pautas para Blog",
          icon: <ClipboardList className="h-5 w-5" />,
          path: "/ferramentas/pautas-blog",
        },
        {
          label: "Meta Dados",
          icon: <Database className="h-5 w-5" />,
          path: "/ferramentas/meta-dados",
        },
      ],
    },
    {
      group: "CONTA",
      items: [
        {
          label: "Financeiro",
          icon: <CreditCard className="h-5 w-5" />,
          path: "/financeiro",
        },
      ],
    },
  ];

  return (
    <>
      <div className="lg:hidden flex items-center justify-between p-4 bg-white border-b">
        <div className="text-xl font-bold">MKRanker</div>
        <button
          onClick={toggleMobileMenu}
          className="text-gray-600 focus:outline-none"
        >
          {mobileMenuOpen ? (
            <XIcon className="h-6 w-6" />
          ) : (
            <MenuIcon className="h-6 w-6" />
          )}
        </button>
      </div>
      <div
        className={cn(
          "lg:block fixed lg:static top-[65px] left-0 w-64 h-[calc(100vh-65px)] lg:h-screen bg-white border-r transition-all duration-300 z-50 overflow-auto",
          mobileMenuOpen ? "block" : "hidden"
        )}
      >
        <div className="p-4 lg:p-6">
          <div className="flex items-center justify-center mb-8 lg:mb-10">
            <h1 className="text-2xl font-bold">MKRanker</h1>
          </div>

          {subscription && (
            <div className="mb-6 p-3 bg-brand-gray rounded-lg border border-brand-grayDarker">
              <div className="text-sm text-gray-500">Seu plano atual:</div>
              <div className="font-semibold text-brand-purpleDark">
                {planTypeLabel[subscription.planType] || "Nenhum plano"}
              </div>
            </div>
          )}

          <div className="space-y-8">
            {navItems.map((group) => (
              <div key={group.group}>
                <div className="text-xs font-semibold text-gray-400 mb-2">
                  {group.group}
                </div>
                <ul className="space-y-1">
                  {group.items.map((item) => (
                    <li key={item.path}>
                      <Link
                        to={item.path}
                        className={cn(
                          "flex items-center gap-3 px-3 py-2 rounded-md text-sm",
                          isActive(item.path)
                            ? "bg-brand-purple text-white"
                            : "hover:bg-gray-100"
                        )}
                        onClick={() => setMobileMenuOpen(false)}
                      >
                        {item.icon}
                        <span>{item.label}</span>
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>

          <div className="mt-10">
            <Button
              variant="outline"
              className="w-full flex items-center gap-2 justify-center"
              onClick={signOut}
            >
              <LogOut className="h-4 w-4" />
              <span>Sair</span>
            </Button>
          </div>
        </div>
      </div>
    </>
  );
};

export default Sidebar;
