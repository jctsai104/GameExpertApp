import { useTranslation } from 'react-i18next';
import { useQuery } from '@tanstack/react-query';
import { ArrowUp, ArrowDown } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Skeleton } from '@/components/ui/skeleton';
import type { Cryptocurrency } from '@shared/schema';

export default function CoinTrends() {
  const { t } = useTranslation();

  const { data: cryptocurrencies, isLoading } = useQuery<Cryptocurrency[]>({
    queryKey: ['/api/cryptocurrencies'],
  });

  if (isLoading) {
    return (
      <section className="mb-8">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-semibold text-slate-900 dark:text-white">
            {t('daily_coin_trends')}
          </h3>
          <Button variant="link" className="text-gaming-neon hover:text-gaming-neon/80 text-sm font-medium">
            {t('view_all')}
          </Button>
        </div>
        <Card className="bg-white dark:bg-slate-800 border-slate-200 dark:border-slate-600">
          <CardContent className="p-0">
            {[...Array(4)].map((_, i) => (
              <div key={i} className="flex items-center justify-between p-4 border-b border-slate-200 dark:border-slate-600 last:border-b-0">
                <div className="flex items-center space-x-3">
                  <Skeleton className="w-10 h-10 rounded-full" />
                  <div>
                    <Skeleton className="h-4 w-16 mb-1" />
                    <Skeleton className="h-3 w-8" />
                  </div>
                </div>
                <div className="text-right">
                  <Skeleton className="h-4 w-20 mb-1" />
                  <Skeleton className="h-3 w-12" />
                </div>
              </div>
            ))}
          </CardContent>
        </Card>
      </section>
    );
  }

  return (
    <section className="mb-8">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-semibold text-slate-900 dark:text-white">
          {t('daily_coin_trends')}
        </h3>
        <Button variant="link" className="text-gaming-neon hover:text-gaming-neon/80 text-sm font-medium">
          {t('view_all')}
        </Button>
      </div>
      
      <Card className="bg-white dark:bg-slate-800 border-slate-200 dark:border-slate-600">
        <CardContent className="p-0">
          {cryptocurrencies?.map((coin) => {
            const isPositive = parseFloat(coin.change24h) > 0;
            const ArrowIcon = isPositive ? ArrowUp : ArrowDown;
            const colorClass = isPositive ? 'text-green-500' : 'text-red-500';
            
            return (
              <div key={coin.id} className="flex items-center justify-between p-4 border-b border-slate-200 dark:border-slate-600 last:border-b-0 hover:bg-slate-50 dark:hover:bg-slate-700 transition-colors">
                <div className="flex items-center space-x-3">
                  <img 
                    src={coin.icon || "https://images.unsplash.com/photo-1518546305927-5a555bb7020d?ixlib=rb-4.0.3&auto=format&fit=crop&w=100&h=100"} 
                    alt={coin.name} 
                    className="w-10 h-10 rounded-full"
                  />
                  <div>
                    <div className="font-medium text-slate-900 dark:text-white">{coin.name}</div>
                    <div className="text-sm text-slate-500 dark:text-slate-400">{coin.symbol}</div>
                  </div>
                </div>
                <div className="text-right">
                  <div className="font-semibold text-slate-900 dark:text-white">${coin.price}</div>
                  <div className={`text-sm ${colorClass} flex items-center justify-end`}>
                    <ArrowIcon className="w-3 h-3 mr-1" />
                    <span>{isPositive ? '+' : ''}{coin.change24h}%</span>
                  </div>
                </div>
              </div>
            );
          })}
        </CardContent>
      </Card>
    </section>
  );
}
