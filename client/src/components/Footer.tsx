import { useTranslation } from 'react-i18next';
import { Gamepad2, Heart, Globe, Shield, Mail, Phone } from 'lucide-react';
import { Link } from 'wouter';

export default function Footer() {
  const { t } = useTranslation();

  return (
    <footer className="bg-white dark:bg-slate-900 border-t border-slate-200 dark:border-slate-700 mt-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Logo and Company Info */}
          <div className="col-span-1 md:col-span-2">
            <div className="flex items-center space-x-3 mb-4">
              <div className="w-10 h-10 bg-gradient-to-r from-gaming-neon to-gaming-purple rounded-xl flex items-center justify-center">
                <Gamepad2 className="w-5 h-5 text-white" />
              </div>
              <div>
                <span className="text-lg font-bold bg-gradient-to-r from-gaming-neon to-gaming-purple bg-clip-text text-transparent">
                  GAME EXPERT
                </span>
                <p className="text-xs text-slate-500 dark:text-slate-400">
                  Gaming-Themed Crypto Wallet
                </p>
              </div>
            </div>
            <p className="text-sm text-slate-600 dark:text-slate-400 mb-4 max-w-md">
              Experience the future of cryptocurrency trading with our gaming-inspired platform. 
              Secure, fast, and designed for the next generation of digital asset management.
            </p>
            <div className="flex items-center space-x-4">
              <div className="flex items-center space-x-2 text-sm text-slate-600 dark:text-slate-400">
                <Shield className="w-4 h-4 text-green-500" />
                <span>Secure & Licensed</span>
              </div>
              <div className="flex items-center space-x-2 text-sm text-slate-600 dark:text-slate-400">
                <Globe className="w-4 h-4 text-blue-500" />
                <span>Global Access</span>
              </div>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-sm font-semibold text-slate-900 dark:text-white mb-4">
              Quick Links
            </h3>
            <ul className="space-y-3">
              <li>
                <Link href="/trading">
                  <span className="text-sm text-slate-600 dark:text-slate-400 hover:text-gaming-neon transition-colors cursor-pointer">
                    {t('trading')}
                  </span>
                </Link>
              </li>
              <li>
                <Link href="/profile">
                  <span className="text-sm text-slate-600 dark:text-slate-400 hover:text-gaming-neon transition-colors cursor-pointer">
                    {t('profile')}
                  </span>
                </Link>
              </li>
              <li>
                <span className="text-sm text-slate-600 dark:text-slate-400 hover:text-gaming-neon transition-colors cursor-pointer">
                  Security
                </span>
              </li>
              <li>
                <span className="text-sm text-slate-600 dark:text-slate-400 hover:text-gaming-neon transition-colors cursor-pointer">
                  API Documentation
                </span>
              </li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="text-sm font-semibold text-slate-900 dark:text-white mb-4">
              Contact Us
            </h3>
            <ul className="space-y-3">
              <li className="flex items-center space-x-2">
                <Mail className="w-4 h-4 text-gaming-neon" />
                <span className="text-sm text-slate-600 dark:text-slate-400">
                  support@gameexpert.com
                </span>
              </li>
              <li className="flex items-center space-x-2">
                <Phone className="w-4 h-4 text-gaming-purple" />
                <span className="text-sm text-slate-600 dark:text-slate-400">
                  +1 (555) 123-4567
                </span>
              </li>
              <li>
                <span className="text-sm text-slate-600 dark:text-slate-400">
                  24/7 Customer Support
                </span>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Section */}
        <div className="border-t border-slate-200 dark:border-slate-700 mt-8 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="flex items-center space-x-2 text-sm text-slate-600 dark:text-slate-400">
              <span>© 2024 Game Expert.</span>
              <span>Made with</span>
              <Heart className="w-4 h-4 text-red-500" />
              <span>for gamers and crypto enthusiasts.</span>
            </div>
            <div className="flex items-center space-x-6 mt-4 md:mt-0">
              <span className="text-sm text-slate-600 dark:text-slate-400 hover:text-gaming-neon transition-colors cursor-pointer">
                Privacy Policy
              </span>
              <span className="text-sm text-slate-600 dark:text-slate-400 hover:text-gaming-neon transition-colors cursor-pointer">
                Terms of Service
              </span>
              <span className="text-sm text-slate-600 dark:text-slate-400 hover:text-gaming-neon transition-colors cursor-pointer">
                Cookie Policy
              </span>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}