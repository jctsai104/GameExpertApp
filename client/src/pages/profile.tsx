import { useTranslation } from 'react-i18next';
import { useQuery } from '@tanstack/react-query';
import { User, Settings, Shield, CreditCard, MessageCircle, RefreshCw, Wallet, TrendingUp, Eye, EyeOff } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Skeleton } from '@/components/ui/skeleton';
import { useState } from 'react';
import type { User as UserType, UserAsset, Transaction } from '@shared/schema';

export default function Profile() {
  const { t } = useTranslation();
  const [showBalance, setShowBalance] = useState(true);

  const { data: user, isLoading: userLoading } = useQuery<UserType>({
    queryKey: ['/api/users/1'],
  });

  const { data: assets, isLoading: assetsLoading } = useQuery<UserAsset[]>({
    queryKey: ['/api/users/1/assets'],
  });

  const { data: transactions, isLoading: transactionsLoading } = useQuery<Transaction[]>({
    queryKey: ['/api/users/1/transactions'],
  });

  const profileActions = [
    { 
      id: 'kyc_verification', 
      icon: Shield, 
      color: 'text-green-500',
      description: 'Verify your identity to unlock all features'
    },
    { 
      id: 'security', 
      icon: Settings, 
      color: 'text-blue-500',
      description: 'Manage your account security settings'
    },
    { 
      id: 'billing', 
      icon: CreditCard, 
      color: 'text-purple-500',
      description: 'View your billing and payment history'
    },
    { 
      id: 'complaints', 
      icon: MessageCircle, 
      color: 'text-orange-500',
      description: 'Submit and track support tickets'
    },
    { 
      id: 'token_swap', 
      icon: RefreshCw, 
      color: 'text-gaming-neon',
      description: 'Swap between different cryptocurrencies'
    }
  ];

  if (userLoading) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <Card className="mb-6">
          <CardContent className="p-6">
            <div className="flex items-center space-x-4">
              <Skeleton className="w-16 h-16 rounded-full" />
              <div className="space-y-2">
                <Skeleton className="h-6 w-32" />
                <Skeleton className="h-4 w-24" />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
      {/* Profile Header */}
      <Card className="mb-6">
        <CardContent className="p-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <img 
                src={user?.avatar || "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&auto=format&fit=crop&w=100&h=100"}
                alt="User Avatar" 
                className="w-16 h-16 rounded-full border-2 border-gaming-neon"
              />
              <div>
                <h1 className="text-2xl font-bold text-slate-900 dark:text-white">
                  {user ? `${user.firstName} ${user.lastName}` : 'Alex Chen'}
                </h1>
                <p className="text-slate-500 dark:text-slate-400">
                  ID: {user?.id ? `GE${user.id.toString().padStart(7, '0')}` : 'GE2024001'}
                </p>
                <p className="text-sm text-slate-500 dark:text-slate-400">
                  {user?.email || 'alex.chen@gameexpert.com'}
                </p>
              </div>
            </div>
            <Button variant="outline" className="border-gaming-neon text-gaming-neon hover:bg-gaming-neon hover:text-white">
              <User className="w-4 h-4 mr-2" />
              Edit Profile
            </Button>
          </div>
        </CardContent>
      </Card>

      <Tabs defaultValue="assets" className="space-y-6">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="assets">{t('assets')}</TabsTrigger>
          <TabsTrigger value="transactions">{t('transactions')}</TabsTrigger>
          <TabsTrigger value="settings">{t('settings')}</TabsTrigger>
          <TabsTrigger value="overview">Overview</TabsTrigger>
        </TabsList>

        <TabsContent value="assets">
          {/* Asset Overview */}
          <Card className="mb-6">
            <CardHeader>
              <CardTitle className="flex items-center justify-between">
                <span>{t('asset_overview')}</span>
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => setShowBalance(!showBalance)}
                >
                  {showBalance ? <Eye className="w-4 h-4" /> : <EyeOff className="w-4 h-4" />}
                </Button>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
                <div className="bg-gradient-to-r from-gaming-neon/10 to-gaming-purple/10 rounded-lg p-4">
                  <p className="text-sm text-slate-600 dark:text-slate-400">{t('total_value')}</p>
                  <p className="text-2xl font-bold text-slate-900 dark:text-white">
                    {showBalance ? `$${user?.totalBalance || '12,450.67'}` : '••••••'}
                  </p>
                </div>
                <div className="bg-slate-50 dark:bg-dark-surface rounded-lg p-4">
                  <p className="text-sm text-slate-600 dark:text-slate-400">{t('available')}</p>
                  <p className="text-2xl font-bold text-slate-900 dark:text-white">
                    {showBalance ? `$${user?.availableBalance || '8,250.30'}` : '••••••'}
                  </p>
                </div>
                <div className="bg-slate-50 dark:bg-dark-surface rounded-lg p-4">
                  <p className="text-sm text-slate-600 dark:text-slate-400">{t('profit_loss')}</p>
                  <p className="text-2xl font-bold text-green-500">
                    {showBalance ? '+$230.45' : '••••••'}
                  </p>
                </div>
              </div>

              {/* Asset List */}
              <div className="space-y-4">
                {assetsLoading ? (
                  [...Array(3)].map((_, i) => (
                    <div key={i} className="flex items-center justify-between p-4 border border-slate-200 dark:border-slate-700 rounded-lg">
                      <div className="flex items-center space-x-3">
                        <Skeleton className="w-10 h-10 rounded-full" />
                        <div>
                          <Skeleton className="h-4 w-16 mb-1" />
                          <Skeleton className="h-3 w-12" />
                        </div>
                      </div>
                      <div className="text-right">
                        <Skeleton className="h-4 w-20 mb-1" />
                        <Skeleton className="h-3 w-16" />
                      </div>
                    </div>
                  ))
                ) : assets && assets.length > 0 ? (
                  assets.map((asset) => (
                    <div key={asset.id} className="flex items-center justify-between p-4 border border-slate-200 dark:border-slate-700 rounded-lg hover:bg-slate-50 dark:hover:bg-dark-surface transition-colors">
                      <div className="flex items-center space-x-3">
                        <Wallet className="w-10 h-10 text-gaming-neon" />
                        <div>
                          <p className="font-medium text-slate-900 dark:text-white">Asset #{asset.id}</p>
                          <p className="text-sm text-slate-500 dark:text-slate-400">Balance: {asset.balance}</p>
                        </div>
                      </div>
                      <div className="text-right">
                        <p className="font-medium text-slate-900 dark:text-white">
                          {showBalance ? asset.balance : '••••••'}
                        </p>
                        <p className="text-sm text-slate-500 dark:text-slate-400">
                          Locked: {showBalance ? asset.lockedBalance || '0' : '••••••'}
                        </p>
                      </div>
                    </div>
                  ))
                ) : (
                  <div className="text-center py-8">
                    <Wallet className="w-12 h-12 text-slate-400 mx-auto mb-4" />
                    <p className="text-slate-600 dark:text-slate-400">
                      No assets found. Start trading to build your portfolio.
                    </p>
                  </div>
                )}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="transactions">
          <Card>
            <CardHeader>
              <CardTitle>{t('transactions')}</CardTitle>
            </CardHeader>
            <CardContent>
              {transactionsLoading ? (
                <div className="space-y-4">
                  {[...Array(5)].map((_, i) => (
                    <div key={i} className="flex items-center justify-between p-4 border border-slate-200 dark:border-slate-700 rounded-lg">
                      <Skeleton className="h-4 w-20" />
                      <Skeleton className="h-4 w-16" />
                      <Skeleton className="h-4 w-24" />
                      <Skeleton className="h-4 w-12" />
                    </div>
                  ))}
                </div>
              ) : transactions && transactions.length > 0 ? (
                <div className="space-y-4">
                  {transactions.map((tx) => (
                    <div key={tx.id} className="flex items-center justify-between p-4 border border-slate-200 dark:border-slate-700 rounded-lg">
                      <div className="flex items-center space-x-3">
                        <div className={`w-10 h-10 rounded-full flex items-center justify-center ${
                          tx.type === 'buy' ? 'bg-green-100 text-green-600' :
                          tx.type === 'sell' ? 'bg-red-100 text-red-600' :
                          'bg-blue-100 text-blue-600'
                        }`}>
                          <TrendingUp className="w-5 h-5" />
                        </div>
                        <div>
                          <p className="font-medium text-slate-900 dark:text-white capitalize">{tx.type}</p>
                          <p className="text-sm text-slate-500 dark:text-slate-400">
                            {tx.createdAt ? new Date(tx.createdAt).toLocaleDateString() : 'N/A'}
                          </p>
                        </div>
                      </div>
                      <div className="text-right">
                        <p className="font-medium text-slate-900 dark:text-white">{tx.amount}</p>
                        <p className="text-sm text-slate-500 dark:text-slate-400">{tx.status}</p>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="text-center py-8">
                  <TrendingUp className="w-12 h-12 text-slate-400 mx-auto mb-4" />
                  <p className="text-slate-600 dark:text-slate-400">
                    No transactions found. Your transaction history will appear here.
                  </p>
                </div>
              )}
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="settings">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {profileActions.map((action) => {
              const IconComponent = action.icon;
              return (
                <Card key={action.id} className="hover:shadow-lg transition-shadow cursor-pointer">
                  <CardContent className="p-6">
                    <div className="flex items-start space-x-4">
                      <div className={`p-3 rounded-lg bg-slate-100 dark:bg-dark-surface ${action.color}`}>
                        <IconComponent className="w-6 h-6" />
                      </div>
                      <div className="flex-1">
                        <h3 className="font-semibold text-slate-900 dark:text-white mb-2">
                          {t(action.id)}
                        </h3>
                        <p className="text-sm text-slate-600 dark:text-slate-400">
                          {action.description}
                        </p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </TabsContent>

        <TabsContent value="overview">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Account Summary</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex justify-between">
                    <span className="text-slate-600 dark:text-slate-400">Member Since</span>
                    <span className="font-medium">January 2024</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-600 dark:text-slate-400">Account Type</span>
                    <span className="font-medium">Premium</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-600 dark:text-slate-400">KYC Status</span>
                    <span className="font-medium text-green-500">Verified</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-600 dark:text-slate-400">2FA Enabled</span>
                    <span className="font-medium text-green-500">Yes</span>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Quick Actions</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-2 gap-3">
                  <Button className="bg-gaming-neon hover:bg-gaming-neon/80 text-white">
                    {t('transfer')}
                  </Button>
                  <Button className="bg-gaming-purple hover:bg-gaming-purple/80 text-white">
                    {t('receive')}
                  </Button>
                  <Button variant="outline" className="border-gaming-neon text-gaming-neon hover:bg-gaming-neon hover:text-white">
                    {t('buy')}
                  </Button>
                  <Button variant="outline" className="border-gaming-purple text-gaming-purple hover:bg-gaming-purple hover:text-white">
                    {t('sell')}
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}
