import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { ArrowUpDown, TrendingUp, TrendingDown, Download, Upload } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Skeleton } from '@/components/ui/skeleton';
import { useToast } from '@/hooks/use-toast';
import { apiRequest } from '@/lib/queryClient';
import type { Cryptocurrency, Order } from '@shared/schema';

export default function Trading() {
  const { t } = useTranslation();
  const { toast } = useToast();
  const queryClient = useQueryClient();
  
  const [fromCurrency, setFromCurrency] = useState('');
  const [toCurrency, setToCurrency] = useState('');
  const [amount, setAmount] = useState('');

  const { data: cryptocurrencies, isLoading: cryptosLoading } = useQuery<Cryptocurrency[]>({
    queryKey: ['/api/cryptocurrencies'],
  });

  const { data: orders, isLoading: ordersLoading } = useQuery<Order[]>({
    queryKey: ['/api/users/1/orders'],
  });

  const swapMutation = useMutation({
    mutationFn: async (data: { fromCryptoId: number; toCryptoId: number; amount: string; userId: number }) => {
      const response = await apiRequest('POST', '/api/swap', data);
      return response.json();
    },
    onSuccess: () => {
      toast({
        title: "Swap Successful",
        description: "Your cryptocurrency swap has been completed.",
      });
      queryClient.invalidateQueries({ queryKey: ['/api/users/1/orders'] });
      setAmount('');
    },
    onError: () => {
      toast({
        title: "Swap Failed",
        description: "There was an error processing your swap.",
        variant: "destructive",
      });
    },
  });

  const handleSwap = () => {
    if (!fromCurrency || !toCurrency || !amount) {
      toast({
        title: "Missing Information",
        description: "Please fill in all required fields.",
        variant: "destructive",
      });
      return;
    }

    const fromCrypto = cryptocurrencies?.find(c => c.id.toString() === fromCurrency);
    const toCrypto = cryptocurrencies?.find(c => c.id.toString() === toCurrency);

    if (!fromCrypto || !toCrypto) return;

    swapMutation.mutate({
      fromCryptoId: fromCrypto.id,
      toCryptoId: toCrypto.id,
      amount,
      userId: 1
    });
  };

  if (cryptosLoading) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <Card>
            <CardHeader>
              <Skeleton className="h-6 w-32" />
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <Skeleton className="h-10 w-full" />
                <Skeleton className="h-10 w-full" />
                <Skeleton className="h-10 w-full" />
                <Skeleton className="h-10 w-full" />
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-slate-900 dark:text-white mb-2">
          {t('trading')}
        </h1>
        <p className="text-slate-600 dark:text-slate-400">
          Trade cryptocurrencies instantly with competitive rates
        </p>
      </div>

      <Tabs defaultValue="swap" className="space-y-6">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="swap">{t('swap')}</TabsTrigger>
          <TabsTrigger value="deposit">{t('deposit')}</TabsTrigger>
          <TabsTrigger value="withdraw">{t('withdraw')}</TabsTrigger>
          <TabsTrigger value="orders">{t('orders')}</TabsTrigger>
        </TabsList>

        <TabsContent value="swap">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Swap Interface */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <ArrowUpDown className="w-5 h-5 text-gaming-neon" />
                  <span>{t('instant_swap')}</span>
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-4">
                  <div>
                    <Label htmlFor="from-currency">{t('from')}</Label>
                    <Select value={fromCurrency} onValueChange={setFromCurrency}>
                      <SelectTrigger>
                        <SelectValue placeholder="Select cryptocurrency" />
                      </SelectTrigger>
                      <SelectContent>
                        {cryptocurrencies?.map((crypto) => (
                          <SelectItem key={crypto.id} value={crypto.id.toString()}>
                            <div className="flex items-center space-x-2">
                              <img src={crypto.icon || ""} alt={crypto.name} className="w-4 h-4 rounded-full" />
                              <span>{crypto.symbol} - {crypto.name}</span>
                            </div>
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>

                  <div>
                    <Label htmlFor="to-currency">{t('to')}</Label>
                    <Select value={toCurrency} onValueChange={setToCurrency}>
                      <SelectTrigger>
                        <SelectValue placeholder="Select cryptocurrency" />
                      </SelectTrigger>
                      <SelectContent>
                        {cryptocurrencies?.map((crypto) => (
                          <SelectItem key={crypto.id} value={crypto.id.toString()}>
                            <div className="flex items-center space-x-2">
                              <img src={crypto.icon || ""} alt={crypto.name} className="w-4 h-4 rounded-full" />
                              <span>{crypto.symbol} - {crypto.name}</span>
                            </div>
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>

                  <div>
                    <Label htmlFor="amount">{t('amount')}</Label>
                    <Input
                      id="amount"
                      type="number"
                      placeholder="0.00"
                      value={amount}
                      onChange={(e) => setAmount(e.target.value)}
                    />
                    <p className="text-sm text-slate-500 dark:text-slate-400 mt-1">
                      {t('balance')}: 0.00
                    </p>
                  </div>
                </div>

                <Button 
                  onClick={handleSwap}
                  disabled={swapMutation.isPending}
                  className="w-full bg-gaming-neon hover:bg-gaming-neon/80 text-white"
                >
                  {swapMutation.isPending ? "Processing..." : t('swap_now')}
                </Button>
              </CardContent>
            </Card>

            {/* Market Overview */}
            <Card>
              <CardHeader>
                <CardTitle>{t('market_analysis')}</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {cryptocurrencies?.slice(0, 4).map((crypto) => {
                    const isPositive = parseFloat(crypto.change24h) > 0;
                    return (
                      <div key={crypto.id} className="flex items-center justify-between p-3 bg-slate-50 dark:bg-dark-surface rounded-lg">
                        <div className="flex items-center space-x-3">
                          <img src={crypto.icon || ""} alt={crypto.name} className="w-8 h-8 rounded-full" />
                          <div>
                            <p className="font-medium text-slate-900 dark:text-white">{crypto.symbol}</p>
                            <p className="text-sm text-slate-500 dark:text-slate-400">${crypto.price}</p>
                          </div>
                        </div>
                        <div className={`flex items-center space-x-1 ${isPositive ? 'text-green-500' : 'text-red-500'}`}>
                          {isPositive ? <TrendingUp className="w-4 h-4" /> : <TrendingDown className="w-4 h-4" />}
                          <span className="text-sm font-medium">{isPositive ? '+' : ''}{crypto.change24h}%</span>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="deposit">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Download className="w-5 h-5 text-green-500" />
                <span>{t('deposit')}</span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-slate-600 dark:text-slate-400">
                Deposit functionality will be implemented here.
              </p>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="withdraw">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Upload className="w-5 h-5 text-red-500" />
                <span>{t('withdraw')}</span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-slate-600 dark:text-slate-400">
                Withdraw functionality will be implemented here.
              </p>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="orders">
          <Card>
            <CardHeader>
              <CardTitle>{t('recent_orders')}</CardTitle>
            </CardHeader>
            <CardContent>
              {ordersLoading ? (
                <div className="space-y-4">
                  {[...Array(3)].map((_, i) => (
                    <div key={i} className="flex items-center justify-between p-4 border border-slate-200 dark:border-slate-700 rounded-lg">
                      <Skeleton className="h-4 w-24" />
                      <Skeleton className="h-4 w-16" />
                      <Skeleton className="h-4 w-20" />
                    </div>
                  ))}
                </div>
              ) : orders && orders.length > 0 ? (
                <div className="space-y-4">
                  {orders.map((order) => (
                    <div key={order.id} className="flex items-center justify-between p-4 border border-slate-200 dark:border-slate-700 rounded-lg">
                      <div>
                        <p className="font-medium text-slate-900 dark:text-white">{order.type.toUpperCase()}</p>
                        <p className="text-sm text-slate-500 dark:text-slate-400">{order.amount}</p>
                      </div>
                      <div>
                        <p className="font-medium text-slate-900 dark:text-white">${order.price}</p>
                        <p className="text-sm text-slate-500 dark:text-slate-400">{order.status}</p>
                      </div>
                      <div className="text-sm text-slate-500 dark:text-slate-400">
                        {order.createdAt ? new Date(order.createdAt).toLocaleDateString() : 'N/A'}
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <p className="text-slate-600 dark:text-slate-400 text-center py-8">
                  No orders found. Start trading to see your order history.
                </p>
              )}
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
