import {
  Bell,
  Gamepad2,
  QrCode,
  Shield,
} from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { Link } from 'wouter';

import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';

import LanguageSwitcher from './LanguageSwitcher';
import ThemeToggle from './ThemeToggle';

export default function Header() {
  const { t } = useTranslation();

  return (
    <header className="sticky top-0 z-50 bg-white/90 dark:bg-slate-900/90 backdrop-blur-lg border-b border-slate-200 dark:border-slate-700">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link href="/" className="flex items-center space-x-2">
            <div className="w-8 h-8 bg-gradient-to-r from-sky-400 to-violet-600 rounded-lg flex items-center justify-center shadow-lg">
              <Gamepad2 className="w-4 h-4 text-white" />
            </div>
            <span className="text-lg font-bold bg-gradient-to-r from-sky-400 to-violet-600 bg-clip-text text-transparent">
              GAME EXPERT
            </span>
          </Link>

          {/* Center - UID and Badge (Desktop Only) */}
          <div className="hidden md:flex items-center space-x-2">
            <div className="text-sm text-slate-600 dark:text-slate-400">
              UID: 123456789
            </div>
            <Badge variant="secondary" className="bg-gaming-neon/10 text-gaming-neon border-gaming-neon/20">
              <Shield className="w-3 h-3 mr-1" />
              {t('verified_user')}
            </Badge>
          </div>

          {/* Navigation Icons */}
          <div className="flex items-center space-x-2">
            {/* Notifications */}
            <Button variant="ghost" size="icon" className="relative">
              <Bell className="w-5 h-5 text-slate-600 dark:text-slate-300" />
              <span className="absolute -top-1 -right-1 w-3 h-3 bg-red-500 rounded-full"></span>
            </Button>

            {/* Language Switcher */}
            <LanguageSwitcher />

            {/* QR Scanner */}
            <Button variant="ghost" size="icon">
              <QrCode className="w-5 h-5 text-slate-600 dark:text-slate-300" />
            </Button>

            {/* Theme Toggle */}
            <ThemeToggle />
          </div>
        </div>
      </div>
    </header>
  );
}
