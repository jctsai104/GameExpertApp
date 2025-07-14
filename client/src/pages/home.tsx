import { useTranslation } from 'react-i18next';
import { useQuery } from '@tanstack/react-query';
import AdBanner from '@/components/AdBanner';
import AnnouncementMarquee from '@/components/AnnouncementMarquee';
import QuickActions from '@/components/QuickActions';
import CoinTrends from '@/components/CoinTrends';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ArrowRight, RefreshCw, Users, TrendingUp } from 'lucide-react';
import type { User } from '@shared/schema';

export default function Home() {
  const { t } = useTranslation();

  const { data: user } = useQuery<User>({
    queryKey: ['/api/users/1'],
  });

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
      <AdBanner />
      <AnnouncementMarquee />
      <QuickActions />
      <CoinTrends />

      {/* Trading Section Preview */}
      <section className="mb-8">
        <div className="bg-gradient-to-r from-gaming-neon/10 to-gaming-purple/10 border border-gaming-neon/30 rounded-xl p-6">
          <h3 className="text-lg font-semibold text-slate-900 dark:text-white mb-4">
            {t('trading_features')}
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="bg-white/50 dark:bg-dark-card/50 backdrop-blur-sm rounded-lg p-4 text-center">
              <RefreshCw className="w-8 h-8 text-gaming-neon mx-auto mb-2" />
              <h4 className="font-medium text-slate-900 dark:text-white">{t('instant_swap')}</h4>
              <p className="text-sm text-slate-600 dark:text-slate-400 mt-1">
                {t('instant_swap_desc')}
              </p>
            </div>
            <div className="bg-white/50 dark:bg-dark-card/50 backdrop-blur-sm rounded-lg p-4 text-center">
              <Users className="w-8 h-8 text-gaming-purple mx-auto mb-2" />
              <h4 className="font-medium text-slate-900 dark:text-white">{t('c2c_trading')}</h4>
              <p className="text-sm text-slate-600 dark:text-slate-400 mt-1">
                {t('c2c_trading_desc')}
              </p>
            </div>
            <div className="bg-white/50 dark:bg-dark-card/50 backdrop-blur-sm rounded-lg p-4 text-center">
              <TrendingUp className="w-8 h-8 text-gaming-amber mx-auto mb-2" />
              <h4 className="font-medium text-slate-900 dark:text-white">{t('market_analysis')}</h4>
              <p className="text-sm text-slate-600 dark:text-slate-400 mt-1">
                {t('market_analysis_desc')}
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Profile Section Preview */}
      <section className="mb-8">
        <h3 className="text-lg font-semibold text-slate-900 dark:text-white mb-4">
          {t('your_portfolio')}
        </h3>
        <Card className="bg-white dark:bg-dark-card border-slate-200 dark:border-slate-700">
          <CardContent className="p-6">
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center space-x-4">
                <img 
                  src={user?.avatar || "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&auto=format&fit=crop&w=100&h=100"}
                  alt="User Avatar" 
                  className="w-12 h-12 rounded-full border-2 border-gaming-neon"
                />
                <div>
                  <h4 className="font-semibold text-slate-900 dark:text-white">
                    {user ? `${user.firstName} ${user.lastName}` : 'Alex Chen'}
                  </h4>
                  <p className="text-sm text-slate-500 dark:text-slate-400">
                    ID: {user?.id ? `GE${user.id.toString().padStart(7, '0')}` : 'GE2024001'}
                  </p>
                </div>
              </div>
              <Button variant="link" className="text-gaming-neon hover:text-gaming-neon/80 text-sm font-medium">
                {t('view_profile')} <ArrowRight className="w-4 h-4 ml-1" />
              </Button>
            </div>
            
            <div className="grid grid-cols-2 gap-4">
              <div className="bg-slate-50 dark:bg-dark-surface rounded-lg p-4">
                <p className="text-sm text-slate-600 dark:text-slate-400">{t('total_balance')}</p>
                <p className="text-2xl font-bold text-slate-900 dark:text-white">
                  ${user?.totalBalance || '12,450.67'}
                </p>
                <p className="text-sm text-green-500">+$230.45 (24h)</p>
              </div>
              <div className="bg-slate-50 dark:bg-dark-surface rounded-lg p-4">
                <p className="text-sm text-slate-600 dark:text-slate-400">{t('available')}</p>
                <p className="text-2xl font-bold text-slate-900 dark:text-white">
                  ${user?.availableBalance || '8,250.30'}
                </p>
                <p className="text-sm text-slate-500 dark:text-slate-400">{t('ready_to_trade')}</p>
              </div>
            </div>

            <div className="mt-4 flex space-x-2">
              <Button className="flex-1 bg-gaming-neon hover:bg-gaming-neon/80 text-white">
                {t('transfer')}
              </Button>
              <Button className="flex-1 bg-gaming-purple hover:bg-gaming-purple/80 text-white">
                {t('receive')}
              </Button>
            </div>
          </CardContent>
        </Card>
      </section>
    </div>
  );
}
