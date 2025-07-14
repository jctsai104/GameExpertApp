import { useTranslation } from 'react-i18next';
import { Bell, Gamepad2 } from 'lucide-react';
import LanguageSwitcher from './LanguageSwitcher';
import ThemeToggle from './ThemeToggle';
import { Button } from '@/components/ui/button';

export default function Header() {
  const { t } = useTranslation();

  return (
    <header className="sticky top-0 z-50 bg-white/90 dark:bg-slate-900/90 backdrop-blur-lg border-b border-slate-200 dark:border-slate-700">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-gradient-to-r from-gaming-neon to-gaming-purple rounded-xl flex items-center justify-center shadow-lg">
              <Gamepad2 className="w-5 h-5 text-white" />
            </div>
            <div className="flex flex-col">
              <span className="text-lg font-bold bg-gradient-to-r from-gaming-neon to-gaming-purple bg-clip-text text-transparent leading-tight">
                GAME EXPERT
              </span>
              <span className="text-xs text-slate-500 dark:text-slate-400 leading-tight">
                Crypto Wallet
              </span>
            </div>
          </div>

          {/* Navigation Icons */}
          <div className="flex items-center space-x-4">
            {/* Notifications */}
            <Button variant="ghost" size="icon" className="relative">
              <Bell className="w-5 h-5 text-slate-600 dark:text-slate-300" />
              <span className="absolute -top-1 -right-1 w-3 h-3 bg-red-500 rounded-full"></span>
            </Button>

            {/* Language Switcher */}
            <LanguageSwitcher />

            {/* QR Scanner */}
            <Button variant="ghost" size="icon">
              <svg className="w-5 h-5 text-slate-600 dark:text-slate-300" fill="currentColor" viewBox="0 0 24 24">
                <path d="M3 11h8V3H3v8zm2-6h4v4H5V5zM3 21h8v-8H3v8zm2-6h4v4H5v-4zM13 3v8h8V3h-8zm6 6h-4V5h4v4zM19 13h2v2h-2v-2zM13 13h2v2h-2v-2zM15 15h2v2h-2v-2zM13 17h2v2h-2v-2zM15 19h2v2h-2v-2zM17 17h2v2h-2v-2zM17 13h2v2h-2v-2zM19 15h2v2h-2v-2z"/>
              </svg>
            </Button>

            {/* Theme Toggle */}
            <ThemeToggle />
          </div>
        </div>
      </div>
    </header>
  );
}
