import { Switch, Route } from "wouter";
import { queryClient } from "./lib/queryClient";
import { QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import { ThemeProvider } from "@/lib/theme";
import { I18nextProvider } from 'react-i18next';
import i18n from '@/lib/i18n';
import NotFound from "@/pages/not-found";
import Home from "@/pages/home";
import Trading from "@/pages/trading";
import Profile from "@/pages/profile";
import Scan from "@/pages/scan";
import Orders from "@/pages/orders";
import Header from "@/components/Header";
import BottomNavigation from "@/components/BottomNavigation";

function Router() {
  return (
    <Switch>
      <Route path="/" component={Home} />
      <Route path="/trading" component={Trading} />
      <Route path="/scan" component={Scan} />
      <Route path="/orders" component={Orders} />
      <Route path="/profile" component={Profile} />
      <Route component={NotFound} />
    </Switch>
  );
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <I18nextProvider i18n={i18n}>
        <ThemeProvider>
          <TooltipProvider>
            <div className="min-h-screen bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white transition-colors duration-300">
              <Header />
              <main className="pb-20 md:pb-6">
                <Router />
              </main>
              <BottomNavigation />
              <Toaster />
            </div>
          </TooltipProvider>
        </ThemeProvider>
      </I18nextProvider>
    </QueryClientProvider>
  );
}

export default App;
