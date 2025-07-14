import { useTranslation } from 'react-i18next';
import { Home, TrendingUp, User } from 'lucide-react';
import { Link, useLocation } from 'wouter';
import { Button } from '@/components/ui/button';

const navItems = [
  { id: 'home', icon: Home, path: '/' },
  { id: 'trading', icon: TrendingUp, path: '/trading' },
  { id: 'profile', icon: User, path: '/profile' }
];

export default function BottomNavigation() {
  const { t } = useTranslation();
  const [location] = useLocation();

  return (
    <nav className="fixed bottom-0 left-0 right-0 bg-white/95 dark:bg-slate-900/95 backdrop-blur-lg border-t border-slate-200 dark:border-slate-700 z-50">
      <div className="grid grid-cols-3 h-16">
        {navItems.map((item) => {
          const IconComponent = item.icon;
          const isActive = location === item.path;
          
          return (
            <Link key={item.id} href={item.path}>
              <Button
                variant="ghost"
                className={`flex flex-col items-center justify-center space-y-1 h-full rounded-none ${
                  isActive 
                    ? 'text-gaming-neon' 
                    : 'text-slate-500 dark:text-slate-400'
                }`}
              >
                <IconComponent className="w-5 h-5" />
                <span className="text-xs">{t(item.id)}</span>
              </Button>
            </Link>
          );
        })}
      </div>
    </nav>
  );
}
