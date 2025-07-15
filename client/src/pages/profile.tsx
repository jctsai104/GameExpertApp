import {
  AlertTriangle,
  Bell,
  ChevronRight,
  Copy,
  Edit,
  FileText,
  Globe,
  Lock,
  MessageCircle,
  Moon,
  Share2,
  Shield,
  ShieldCheck,
  Sun,
  UserCheck,
  Wallet,
} from 'lucide-react';
import { useTranslation } from 'react-i18next';
import {
  Cell,
  Legend,
  Pie,
  PieChart,
  ResponsiveContainer,
} from 'recharts';

import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
} from '@/components/ui/card';
import { useTheme } from '@/lib/theme';
import type { User as UserType } from '@shared/schema';
import { useQuery } from '@tanstack/react-query';

// Mock data for pie chart until we have real asset distribution
const assetData = [
  { name: 'Available', value: 60, color: '#22c55e' },
  { name: 'Pending', value: 25, color: '#f59e0b' },
  { name: 'Locked', value: 15, color: '#6b7280' }
];

// Mock cryptocurrency data
const cryptoAssets = [
  { symbol: 'EB', name: 'EB Token', balance: '0.00', value: '≈¥0.00', icon: '🔷' },
  { symbol: 'USDT', name: 'Tether', balance: '0.000000', value: '≈¥0.00', icon: '₮' },
  { symbol: 'BTC', name: 'Bitcoin', balance: '0.00000000', value: '≈¥0.00', icon: '₿' },
  { symbol: 'ETH', name: 'Ethereum', balance: '0.00000000', value: '≈¥0.00', icon: 'Ξ' },
  { symbol: 'TRX', name: 'TRON', balance: '0.000000', value: '≈¥0.00', icon: '🟥' }
];

export default function Profile() {
  const { t, i18n } = useTranslation();
  const { theme, toggleTheme } = useTheme();

  const { data: user } = useQuery<UserType>({
    queryKey: ['/api/users/1'],
  });

  const toggleLanguage = () => {
    const newLang = i18n.language === 'en' ? 'zh-TW' : 'en';
    i18n.changeLanguage(newLang);
  };

  // Quick actions items
  const quickActions = [
    { id: 'orders', icon: FileText, label: t('orders') },
    { id: 'applications', icon: FileText, label: i18n.language === 'zh-TW' ? '我的申請' : 'My Applications' },
    { id: 'collect_payments', icon: Wallet, label: i18n.language === 'zh-TW' ? '收付款' : 'Payments' },
    { id: 'kyc_verification', icon: UserCheck, label: t('kyc_verification') }
  ];

  // System settings items  
  const systemSettings = [
    { 
      id: 'merchant_verification', 
      icon: ShieldCheck, 
      label: i18n.language === 'zh-TW' ? '認證商家' : 'Merchant Verification', 
      color: 'text-blue-500' 
    },
    { 
      id: 'payment_password', 
      icon: Lock, 
      label: i18n.language === 'zh-TW' ? '支付密碼' : 'Payment Password', 
      color: 'text-orange-500' 
    },
    { 
      id: 'my_complaints', 
      icon: AlertTriangle, 
      label: i18n.language === 'zh-TW' ? '我的舉報' : 'My Reports', 
      color: 'text-red-500' 
    },
    { 
      id: 'security_center', 
      icon: Shield, 
      label: i18n.language === 'zh-TW' ? '安全中心' : 'Security Center', 
      color: 'text-green-500' 
    },
    { 
      id: 'notification_center', 
      icon: Bell, 
      label: i18n.language === 'zh-TW' ? '通知中心' : 'Notification Center', 
      color: 'text-red-500' 
    },
    {
      id: 'language_toggle',
      icon: Globe,
      label: i18n.language === 'zh-TW' ? '切換語言 (English)' : 'Switch Language (中文)',
      color: 'text-purple-500',
      action: toggleLanguage
    },
    {
      id: 'theme_toggle',
      icon: theme === 'dark' ? Sun : Moon,
      label: i18n.language === 'zh-TW' 
        ? (theme === 'dark' ? '切換亮色模式' : '切換深色模式')
        : (theme === 'dark' ? 'Switch to Light Mode' : 'Switch to Dark Mode'),
      color: 'text-indigo-500',
      action: toggleTheme
    }
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
      <div className="max-w-sm mx-auto px-3 sm:max-w-none sm:px-4 py-4 sm:py-6 space-y-3 sm:space-y-4">
        {/* Avatar + UID Card */}
        <Card className="bg-gradient-to-r from-blue-500 to-blue-600 text-white shadow-lg">
          <CardContent className="p-4 sm:p-6">
          <div className="flex items-center justify-between mb-3 sm:mb-4">
            <div className="flex items-center space-x-2 sm:space-x-3">
              <div className="w-10 h-10 sm:w-12 sm:h-12 bg-white/20 rounded-full flex items-center justify-center">
                <span className="text-base sm:text-lg">👤</span>
              </div>
              <div>
                <h2 className="font-semibold text-sm sm:text-base">
                  {user ? `${user.firstName || ''} ${user.lastName || ''}`.trim() || 'BT機器貓 djoa' : 'BT機器貓 djoa'}
                </h2>
                <p className="text-xs sm:text-sm opacity-90">
                  {i18n.language === 'zh-TW' ? 'ID: ' : 'UID: '}{user?.id ? user.id.toString().padStart(8, '0') : '25844722'}
                </p>
              </div>
            </div>
            <Button 
              variant="ghost" 
              size="sm" 
              className="text-white hover:bg-white/20"
            >
              <Edit className="w-4 h-4" />
            </Button>
          </div>
          
          <div className="bg-white/10 rounded-lg p-3 sm:p-4">
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-2 space-y-1 sm:space-y-0">
              <span className="text-xs sm:text-sm font-medium">
                {i18n.language === 'zh-TW' ? '錢包資產' : 'Wallet Assets'}
              </span>
              <div className="flex flex-wrap items-center gap-1 sm:gap-2 text-xs">
                <span className="text-orange-300">
                  ✓ {i18n.language === 'zh-TW' ? '信用中等' : 'Medium Credit'}
                </span>
                <span className="text-gray-300">
                  ⚫ {i18n.language === 'zh-TW' ? '暫未實名' : 'Not Verified'}
                </span>
                <span className="text-gray-300 hidden sm:inline">
                  ⚫ {i18n.language === 'zh-TW' ? '暫未綁定' : 'Not Linked'}
                </span>
              </div>
            </div>
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between space-y-2 sm:space-y-0">
              <div>
                <p className="text-xl sm:text-2xl font-bold">0.00</p>
                <p className="text-xs sm:text-sm opacity-90">≈ 0.00 CNY</p>
              </div>
              <div className="flex items-center space-x-1 sm:space-x-2">
                <span className="text-xs bg-white/20 px-2 py-1 rounded truncate max-w-[120px] sm:max-w-none">
                  B8b2044f0a5668eeb924919251ab21571
                </span>
                <Button variant="ghost" size="sm" className="text-white p-1 flex-shrink-0">
                  <Copy className="w-3 h-3 sm:w-4 sm:h-4" />
                </Button>
              </div>
            </div>
          </div>
          </CardContent>
        </Card>

        {/* Asset Distribution Pie Chart */}
        <Card className="shadow-sm">
          <CardContent className="p-3 sm:p-4">
          <div className="flex items-center justify-between mb-3 sm:mb-4">
            <h3 className="font-semibold text-sm sm:text-base text-slate-900 dark:text-white">
              {i18n.language === 'zh-TW' ? '資產分布' : 'Asset Distribution'}
            </h3>
          </div>
          <div className="h-40 sm:h-48">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={assetData}
                  cx="50%"
                  cy="50%"
                  innerRadius={30}
                  outerRadius={60}
                  paddingAngle={5}
                  dataKey="value"
                >
                  {assetData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Legend />
              </PieChart>
            </ResponsiveContainer>
          </div>
          <div className="flex justify-between text-xs sm:text-sm mt-3 sm:mt-4">
            <div className="text-center">
              <p className="text-green-500 font-semibold">
                {i18n.language === 'zh-TW' ? '可用' : 'Available'}
              </p>
              <p className="text-slate-600 dark:text-slate-400">≈¥0.00</p>
            </div>
            <div className="text-center">
              <p className="text-orange-500 font-semibold">
                {i18n.language === 'zh-TW' ? '待結算' : 'Pending'}
              </p>
              <p className="text-slate-600 dark:text-slate-400">≈¥0.00</p>
            </div>
          </div>
          </CardContent>
        </Card>

        {/* Cryptocurrency List */}
        <Card className="shadow-sm">
          <CardContent className="p-3 sm:p-4">
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-3 sm:mb-4 space-y-1 sm:space-y-0">
              <h3 className="font-semibold text-sm sm:text-base text-slate-900 dark:text-white">
                {i18n.language === 'zh-TW' ? '資產列表' : 'Asset List'}
              </h3>
              <span className="text-xs sm:text-sm text-slate-500">
                {i18n.language === 'zh-TW' ? '隱藏零持有的資產' : 'Hide zero balance assets'}
              </span>
            </div>
            <div className="space-y-2 sm:space-y-3">
              {cryptoAssets.map((crypto) => (
                <div key={crypto.symbol} className="flex items-center justify-between p-2 sm:p-3 bg-slate-50 dark:bg-slate-800 rounded-lg">
                  <div className="flex items-center space-x-2 sm:space-x-3">
                    <div className="w-6 h-6 sm:w-8 sm:h-8 flex items-center justify-center text-base sm:text-lg">
                      {crypto.icon}
                    </div>
                    <div>
                      <p className="font-medium text-xs sm:text-sm text-slate-900 dark:text-white">{crypto.symbol}</p>
                      <p className="text-xs text-slate-500">{crypto.name}</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="font-medium text-xs sm:text-sm text-slate-900 dark:text-white">{crypto.balance}</p>
                    <p className="text-xs text-slate-500">{crypto.value}</p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Quick Actions */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 sm:gap-4">
          {quickActions.map((action) => {
            const IconComponent = action.icon;
            return (
              <Button
                key={action.id}
                variant="ghost"
                className="flex flex-col items-center p-3 sm:p-4 h-auto bg-slate-50 dark:bg-slate-800 hover:bg-slate-100 dark:hover:bg-slate-700"
              >
                <IconComponent className="w-5 h-5 sm:w-6 sm:h-6 mb-1 sm:mb-2 text-slate-600 dark:text-slate-400" />
                <span className="text-xs text-slate-600 dark:text-slate-400 text-center leading-tight">
                  {action.label}
                </span>
              </Button>
            );
          })}
        </div>

        {/* System Settings */}
        <Card className="shadow-sm">
          <CardContent className="p-0">
          <div className="divide-y divide-slate-200 dark:divide-slate-700">
            {systemSettings.map((setting) => {
              const IconComponent = setting.icon;
              return (
                <button
                  key={setting.id}
                  onClick={setting.action || (() => {})}
                  className="w-full flex items-center justify-between p-3 sm:p-4 hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors"
                >
                  <div className="flex items-center space-x-2 sm:space-x-3">
                    <IconComponent className={`w-4 h-4 sm:w-5 sm:h-5 ${setting.color}`} />
                    <span className="text-sm sm:text-base text-slate-900 dark:text-white">{setting.label}</span>
                  </div>
                  <ChevronRight className="w-4 h-4 sm:w-5 sm:h-5 text-slate-400" />
                </button>
              );
            })}
          </div>
          </CardContent>
        </Card>

        {/* Contact Support / Share App */}
        <div className="grid grid-cols-2 gap-3 sm:gap-4">
          <Button 
            variant="ghost" 
            className="flex flex-col sm:flex-row items-center space-y-1 sm:space-y-0 sm:space-x-2 p-3 sm:p-4 bg-slate-50 dark:bg-slate-800 hover:bg-slate-100 dark:hover:bg-slate-700"
          >
            <Share2 className="w-4 h-4 sm:w-5 sm:h-5 text-blue-500" />
            <span className="text-xs sm:text-sm text-center">{i18n.language === 'zh-TW' ? '分享錢包' : 'Share Wallet'}</span>
          </Button>
          <Button 
            variant="ghost" 
            className="flex flex-col sm:flex-row items-center space-y-1 sm:space-y-0 sm:space-x-2 p-3 sm:p-4 bg-slate-50 dark:bg-slate-800 hover:bg-slate-100 dark:hover:bg-slate-700"
          >
            <MessageCircle className="w-4 h-4 sm:w-5 sm:h-5 text-orange-500" />
            <span className="text-xs sm:text-sm text-center">{i18n.language === 'zh-TW' ? '聯繫客服' : 'Contact Support'}</span>
          </Button>
        </div>
      </div>
    </div>
  );
}