import {
  DollarSign,
  Headphones,
  List,
  Send,
  ShoppingCart,
} from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { Link } from 'wouter';

import { Button } from '@/components/ui/button';

const quickActions = [
  {
    id: 'buy',
    icon: ShoppingCart,
    gradient: 'from-pink-500 via-fuchsia-500 to-purple-600',
    path: '/trading'
  },
  {
    id: 'transfer',
    icon: Send,
    gradient: 'from-cyan-400 via-blue-500 to-indigo-600',
    path: '/transfer'
  },
  {
    id: 'sell',
    icon: DollarSign,
    gradient: 'from-yellow-400 via-amber-500 to-orange-500',
    path: '/trading'
  },
  {
    id: 'orders',
    icon: List,
    gradient: 'from-rose-400 via-pink-500 to-fuchsia-600',
    path: '/orders'
  },
  {
    id: 'support',
    icon: Headphones,
    gradient: 'from-sky-400 via-indigo-500 to-purple-600',
    path: '/support'
  }
];

export default function QuickActions() {
  const { t } = useTranslation();

  return (
    <section className="mb-8">
      <h3 className="text-lg font-semibold mb-4 text-slate-900 dark:text-white">
        {t('quick_actions')}
      </h3>
      <div className="flex overflow-x-auto md:overflow-visible gap-4 md:justify-between px-1 hide-scrollbar">
        {quickActions.map((action) => {
          const IconComponent = action.icon;
          return (
            <Link key={action.id} href={action.path}>
              <Button
                variant="outline"
                className="group flex flex-col items-center justify-center p-4 h-auto bg-white dark:bg-slate-800 border-slate-200 dark:border-slate-600 hover:border-gaming-neon dark:hover:border-gaming-neon transition-all duration-300 hover:shadow-lg hover:shadow-gaming-neon/20"
              >
                <div className={`w-12 h-12 bg-gradient-to-r ${action.gradient} rounded-xl flex items-center justify-center mb-2 group-hover:animate-glow`}>
                  <IconComponent className="w-6 h-6 text-white" />
                </div>
                <span className="text-sm font-medium text-slate-700 dark:text-slate-300">
                  {t(action.id)}
                </span>
              </Button>
            </Link>
          );
        })}
      </div>
    </section>
  );
}
