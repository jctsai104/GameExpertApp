import {
  useEffect,
  useState,
} from 'react';

import {
  ArrowUpDown,
  ChevronDown,
  Clock,
  CreditCard,
  Download,
  Plus,
  RefreshCw,
  Smartphone,
  Upload,
  User,
} from 'lucide-react';
import { useTranslation } from 'react-i18next';
import {
  Line,
  LineChart,
  ResponsiveContainer,
  XAxis,
  YAxis,
} from 'recharts';

import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
} from '@/components/ui/select';
import { Skeleton } from '@/components/ui/skeleton';
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from '@/components/ui/tabs';
import { useToast } from '@/hooks/use-toast';
import { apiRequest } from '@/lib/queryClient';
import type {
  Cryptocurrency,
  Order,
} from '@shared/schema';
import {
  useMutation,
  useQuery,
  useQueryClient,
} from '@tanstack/react-query';

// Mock data for demo
const mockChartData = [
  { date: '06-13', price: 0.135 },
  { date: '06-14', price: 0.132 },
  { date: '06-15', price: 0.128 },
  { date: '06-16', price: 0.140 },
  { date: '06-17', price: 0.138 },
  { date: '06-18', price: 0.142 },
  { date: '06-19', price: 0.138 }
];

const mockMerchants = [
  { id: 1, name: '貨款-清香蓮', verified: true, price: '¥1.01', amount: 950, completion: 89, rating: 99 },
  { id: 2, name: '買我牛氣沖天', verified: true, price: '¥1.01', amount: 2000, completion: 87, rating: 99 },
  { id: 3, name: '多財神到$', verified: true, price: '¥1.01', amount: 150, completion: 100, rating: 99 },
  { id: 4, name: '吃貨羊駝_thuh', verified: false, price: '¥1.01', amount: 300, completion: 49, rating: 99 },
  { id: 5, name: '粉嘟嘟速度秒', verified: false, price: '¥1.01', amount: 300, completion: 100, rating: 99 },
  { id: 6, name: '打款秒發異富', verified: true, price: '¥1.01', amount: 854, completion: 64, rating: 99 }
];

const paymentMethods = [
  { id: 'bank', name: '銀行卡', icon: CreditCard, color: 'bg-orange-500' },
  { id: 'wechat', name: '微信', icon: Smartphone, color: 'bg-green-500' },
  { id: 'alipay', name: '支付寶', icon: CreditCard, color: 'bg-blue-500' },
  { id: 'ecny', name: 'E-CNY', icon: CreditCard, color: 'bg-red-500' }
];

const quickAmounts = [100, 200, 300, 400, 500];

export default function Trading() {
  const { t, i18n } = useTranslation();
  const { toast } = useToast();
  const queryClient = useQueryClient();
  
  const [fromCurrency, setFromCurrency] = useState('EB');
  const [toCurrency, setToCurrency] = useState('USDT');
  const [amount, setAmount] = useState('');
  const [swapDirection, setSwapDirection] = useState<'buy' | 'sell'>('buy');
  const [selectedPayment, setSelectedPayment] = useState('bank');
  const [countdown, setCountdown] = useState(10);
  const [buySellTab, setBuySellTab] = useState<'buy' | 'sell'>('buy');
  const [selectedAmount, setSelectedAmount] = useState<number | null>(null);

  const { data: cryptocurrencies, isLoading: cryptosLoading } = useQuery<Cryptocurrency[]>({
    queryKey: ['/api/cryptocurrencies'],
  });

  const { data: orders, isLoading: ordersLoading } = useQuery<Order[]>({
    queryKey: ['/api/users/1/orders'],
  });

  // Countdown timer for refresh
  useEffect(() => {
    const timer = setInterval(() => {
      setCountdown((prev) => (prev > 0 ? prev - 1 : 29));
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  const swapMutation = useMutation({
    mutationFn: async (data: { fromCryptoId: number; toCryptoId: number; amount: string; userId: number }) => {
      const response = await apiRequest('POST', '/api/swap', data);
      return response.json();
    },
    onSuccess: () => {
      toast({
        title: i18n.language === 'zh-TW' ? "閃兌成功" : "Swap Successful",
        description: i18n.language === 'zh-TW' ? "您的加密貨幣閃兌已完成" : "Your cryptocurrency swap has been completed.",
      });
      queryClient.invalidateQueries({ queryKey: ['/api/users/1/orders'] });
      setAmount('');
    },
    onError: () => {
      toast({
        title: i18n.language === 'zh-TW' ? "閃兌失敗" : "Swap Failed",
        description: i18n.language === 'zh-TW' ? "處理您的閃兌時發生錯誤" : "There was an error processing your swap.",
        variant: "destructive",
      });
    },
  });

  const toggleSwapDirection = () => {
    const temp = fromCurrency;
    setFromCurrency(toCurrency);
    setToCurrency(temp);
  };

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
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 min-h-screen">
      <div className="max-w-sm mx-auto px-3 sm:max-w-none sm:px-4 py-4 sm:py-6">
        
        <Tabs defaultValue="swap" className="space-y-4">
          <TabsList className="grid w-full grid-cols-4 bg-white dark:bg-slate-700 p-1 rounded-lg shadow-sm">
            <TabsTrigger value="swap" className="text-xs sm:text-sm">
              {i18n.language === 'zh-TW' ? '閃兌' : 'Swap'}
            </TabsTrigger>
            <TabsTrigger value="buysell" className="text-xs sm:text-sm">
              {i18n.language === 'zh-TW' ? '買賣' : 'Buy/Sell'}
            </TabsTrigger>
            <TabsTrigger value="merchants" className="text-xs sm:text-sm">
              {i18n.language === 'zh-TW' ? '商家' : 'Merchants'}
            </TabsTrigger>
            <TabsTrigger value="assets" className="text-xs sm:text-sm">
              {i18n.language === 'zh-TW' ? '資產' : 'Assets'}
            </TabsTrigger>
          </TabsList>

          {/* Swap Tab */}
          <TabsContent value="swap" className="space-y-4">
            <Card className="shadow-sm">
              <CardContent className="p-4">
                {/* Payment Amount Section */}
                <div className="mb-4">
                  <div className="flex items-center justify-between mb-2">
                    <Label className="text-sm font-medium">
                      {i18n.language === 'zh-TW' ? '支付數量' : 'Payment Amount'}
                    </Label>
                    <span className="text-xs text-slate-500">
                      {i18n.language === 'zh-TW' ? '可用' : 'Available'}: 0.00
                    </span>
                  </div>
                  <div className="relative">
                    <Select value={fromCurrency} onValueChange={setFromCurrency}>
                      <SelectTrigger className="bg-slate-50 dark:bg-slate-800 border-0 h-12">
                        <div className="flex items-center space-x-2">
                          <div className="w-6 h-6 bg-blue-500 rounded-full flex items-center justify-center text-white text-xs font-bold">
                            {fromCurrency}
                          </div>
                          <span className="font-medium">{fromCurrency}</span>
                          <ChevronDown className="w-4 h-4" />
                        </div>
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="EB">
                          <div className="flex items-center space-x-2">
                            <div className="w-4 h-4 bg-blue-500 rounded-full"></div>
                            <span>EB</span>
                          </div>
                        </SelectItem>
                        <SelectItem value="USDT">
                          <div className="flex items-center space-x-2">
                            <div className="w-4 h-4 bg-green-500 rounded-full"></div>
                            <span>USDT</span>
                          </div>
                        </SelectItem>
                      </SelectContent>
                    </Select>
                    <div className="text-right mt-1 text-xs text-slate-500">
                      {i18n.language === 'zh-TW' ? '未達到最小兌換金額10.00EB 全部' : 'Min amount 10.00EB - All'}
                    </div>
                  </div>
                </div>

                {/* Swap Direction Button */}
                <div className="flex justify-center my-4">
                  <Button
                    variant="outline"
                    size="icon"
                    onClick={toggleSwapDirection}
                    className="rounded-full bg-blue-500 hover:bg-blue-600 text-white border-0 shadow-lg"
                  >
                    <ArrowUpDown className="w-4 h-4" />
                  </Button>
                </div>

                {/* Receive Amount Section */}
                <div className="mb-4">
                  <div className="flex items-center justify-between mb-2">
                    <Label className="text-sm font-medium">
                      {i18n.language === 'zh-TW' ? '獲得數量' : 'Receive Amount'}
                    </Label>
                    <span className="text-xs text-slate-500">
                      {i18n.language === 'zh-TW' ? '餘額' : 'Balance'}: 0.000000
                    </span>
                  </div>
                  <div className="relative">
                    <Select value={toCurrency} onValueChange={setToCurrency}>
                      <SelectTrigger className="bg-slate-50 dark:bg-slate-800 border-0 h-12">
                        <div className="flex items-center space-x-2">
                          <div className="w-6 h-6 bg-green-500 rounded-full flex items-center justify-center text-white text-xs font-bold">
                            {toCurrency}
                          </div>
                          <span className="font-medium">{toCurrency}</span>
                          <ChevronDown className="w-4 h-4" />
                        </div>
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="USDT">
                          <div className="flex items-center space-x-2">
                            <div className="w-4 h-4 bg-green-500 rounded-full"></div>
                            <span>USDT</span>
                          </div>
                        </SelectItem>
                        <SelectItem value="EB">
                          <div className="flex items-center space-x-2">
                            <div className="w-4 h-4 bg-blue-500 rounded-full"></div>
                            <span>EB</span>
                          </div>
                        </SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                {/* Exchange Rate */}
                <div className="flex items-center justify-between text-sm text-slate-600 dark:text-slate-400 mb-4">
                  <span>{i18n.language === 'zh-TW' ? '匯率' : 'Rate'}:</span>
                  <div className="flex items-center space-x-1">
                    <span>1EB ≈ 0.138312USDT</span>
                    <RefreshCw className="w-3 h-3" />
                  </div>
                </div>

                {/* Swap Button */}
                <Button 
                  onClick={handleSwap}
                  disabled={swapMutation.isPending}
                  className="w-full bg-blue-500 hover:bg-blue-600 text-white h-12 rounded-lg font-medium"
                >
                  <Clock className="w-4 h-4 mr-2" />
                  {i18n.language === 'zh-TW' ? `閃兌 ${countdown}s` : `Flash Swap ${countdown}s`}
                </Button>
              </CardContent>
            </Card>

            {/* Price Chart */}
            <Card className="shadow-sm">
              <CardHeader className="pb-2">
                <CardTitle className="text-base">
                  {i18n.language === 'zh-TW' ? '近7日價格走勢' : '7-Day Price Trend'}
                </CardTitle>
              </CardHeader>
              <CardContent className="pt-2">
                <div className="h-32">
                  <ResponsiveContainer width="100%" height="100%">
                    <LineChart data={mockChartData}>
                      <XAxis dataKey="date" axisLine={false} tickLine={false} tick={false} />
                      <YAxis hide />
                      <Line 
                        type="monotone" 
                        dataKey="price" 
                        stroke="#3b82f6" 
                        strokeWidth={2}
                        dot={false}
                        fill="url(#gradient)"
                      />
                    </LineChart>
                  </ResponsiveContainer>
                </div>
              </CardContent>
            </Card>
          </TabsContent>



          {/* Buy/Sell Tab */}
          <TabsContent value="buysell" className="space-y-4">
            {/* Toggle Buttons */}
            <div className="flex bg-white dark:bg-slate-800 rounded-lg p-1 shadow-sm">
              <Button
                variant={buySellTab === 'buy' ? 'default' : 'ghost'}
                onClick={() => setBuySellTab('buy')}
                className={`flex-1 ${buySellTab === 'buy' ? 'bg-blue-500 hover:bg-blue-600 text-white' : 'text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-700'}`}
              >
                {i18n.language === 'zh-TW' ? '買入' : 'Buy'}
              </Button>
              <Button
                variant={buySellTab === 'sell' ? 'default' : 'ghost'}
                onClick={() => setBuySellTab('sell')}
                className={`flex-1 ${buySellTab === 'sell' ? 'bg-blue-500 hover:bg-blue-600 text-white' : 'text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-700'}`}
              >
                {i18n.language === 'zh-TW' ? '賣出' : 'Sell'}
              </Button>
            </div>

            <Card className="shadow-sm">
              <CardContent className="p-4">
                {/* Token Selection */}
                <div className="mb-4">
                  <Label className="text-sm font-medium mb-2 block">
                    {i18n.language === 'zh-TW' ? '選擇幣種' : 'Select Token'}
                  </Label>
                  <div className="grid grid-cols-2 gap-3">
                    <Button variant="outline" className={`h-12 justify-start ${fromCurrency === 'EB' ? 'bg-blue-50 dark:bg-blue-900/30 border-blue-200 dark:border-blue-700' : 'hover:bg-slate-50 dark:hover:bg-slate-800'}`}>
                      <div className="w-6 h-6 bg-blue-500 rounded-full mr-2"></div>
                      EB
                    </Button>
                    <Button variant="outline" className={`h-12 justify-start ${toCurrency === 'USDT' ? 'bg-green-50 dark:bg-green-900/30 border-green-200 dark:border-green-700' : 'hover:bg-slate-50 dark:hover:bg-slate-800'}`}>
                      <div className="w-6 h-6 bg-green-500 rounded-full mr-2"></div>
                      USDT
                    </Button>
                  </div>
                </div>

                {/* Payment Methods */}
                <div className="mb-4">
                  <div className="flex items-center justify-between mb-2">
                    <Label className="text-sm font-medium">
                      {i18n.language === 'zh-TW' ? '選擇收款方式' : 'Payment Method'}
                    </Label>
                    <div className="flex items-center text-xs text-slate-500">
                      <span className="bg-yellow-100 text-yellow-800 px-2 py-1 rounded">
                        {i18n.language === 'zh-TW' ? '貨幣提示' : 'Currency Alert'}
                      </span>
                      <span className="ml-2">{countdown}s</span>
                      <RefreshCw className="w-3 h-3 ml-1" />
                    </div>
                  </div>
                  <div className="grid grid-cols-2 gap-3">
                    {paymentMethods.map((method) => {
                      const IconComponent = method.icon;
                      return (
                        <Button
                          key={method.id}
                          variant="outline"
                          onClick={() => setSelectedPayment(method.id)}
                          className={`h-16 flex-col ${selectedPayment === method.id ? 'bg-blue-50 dark:bg-blue-900/30 border-blue-200 dark:border-blue-700' : 'hover:bg-slate-50 dark:hover:bg-slate-800'}`}
                        >
                          <div className={`w-8 h-8 ${method.color} rounded-lg flex items-center justify-center mb-1`}>
                            <IconComponent className="w-4 h-4 text-white" />
                          </div>
                          <span className="text-xs">{method.name}</span>
                        </Button>
                      );
                    })}
                  </div>
                  <div className="mt-3 p-3 bg-slate-50 dark:bg-slate-800 rounded-lg">
                    <div className="flex items-center text-sm text-slate-600 dark:text-slate-400">
                      <span>{i18n.language === 'zh-TW' ? '您沒有收款方式，點擊添加' : 'No payment method, click to add'}</span>
                      <ChevronDown className="w-4 h-4 ml-auto" />
                    </div>
                  </div>
                </div>

                {/* Quick Amount Buttons */}
                <div className="mb-4">
                  <Label className="text-sm font-medium mb-2 block">
                    {i18n.language === 'zh-TW' ? '快捷金額' : 'Quick Amount'}
                  </Label>
                  <div className="text-right text-xs text-slate-500 mb-2">
                    {i18n.language === 'zh-TW' ? '可用金額' : 'Available'}: 0.00 ¥
                  </div>
                  <div className="grid grid-cols-5 gap-2">
                    {quickAmounts.map((amt) => (
                      <Button
                        key={amt}
                        variant="outline"
                        size="sm"
                        onClick={() => setSelectedAmount(amt)}
                        className={`h-8 text-xs ${selectedAmount === amt ? 'bg-blue-50 dark:bg-blue-900/30 border-blue-200 dark:border-blue-700' : 'hover:bg-slate-50 dark:hover:bg-slate-800'}`}
                      >
                        ¥{amt}
                      </Button>
                    ))}
                  </div>
                </div>

                {/* Action Buttons */}
                {buySellTab === 'sell' && (
                  <div className="grid grid-cols-2 gap-3 mb-4">
                    <Button variant="outline" className="bg-cyan-50 dark:bg-cyan-900/30 text-cyan-700 dark:text-cyan-300 border-cyan-200 dark:border-cyan-700 hover:bg-cyan-100 dark:hover:bg-cyan-900/50">
                      {i18n.language === 'zh-TW' ? '預約出售' : 'Scheduled Sale'}
                    </Button>
                    <Button className="bg-blue-500 hover:bg-blue-600 text-white">
                      {i18n.language === 'zh-TW' ? '普通出售' : 'Regular Sale'}
                    </Button>
                  </div>
                )}
              </CardContent>
            </Card>
          </TabsContent>

          {/* Merchants Tab */}
          <TabsContent value="merchants" className="space-y-4">
            <Card className="shadow-sm">
              <CardHeader className="pb-2">
                <div className="flex items-center justify-between">
                  <CardTitle className="text-base">
                    {i18n.language === 'zh-TW' ? '我要買' : 'I Want to Buy'}
                  </CardTitle>
                  <div className="flex space-x-1">
                    <Button size="sm" className="bg-blue-500 text-white text-xs">
                      {i18n.language === 'zh-TW' ? '自選區' : 'Free Zone'}
                    </Button>
                    <Button size="sm" variant="outline" className="text-xs">
                      {i18n.language === 'zh-TW' ? '快捷區' : 'Quick Zone'}
                    </Button>
                  </div>
                </div>
                <div className="flex items-center justify-between text-xs text-slate-500 mt-2">
                  <div className="flex space-x-4">
                    <span>{i18n.language === 'zh-TW' ? '數量' : 'Amount'}</span>
                    <span>{i18n.language === 'zh-TW' ? '單價' : 'Price'}</span>
                    <span>{i18n.language === 'zh-TW' ? '在線' : 'Online'}</span>
                    <span>{i18n.language === 'zh-TW' ? '商家' : 'Merchant'}</span>
                  </div>
                  <div className="flex items-center space-x-1">
                    <span>{i18n.language === 'zh-TW' ? '篩選' : 'Filter'}</span>
                    <ChevronDown className="w-3 h-3" />
                  </div>
                </div>
              </CardHeader>
              <CardContent className="pt-0">
                <div className="space-y-3">
                  {mockMerchants.map((merchant) => (
                    <div key={merchant.id} className="flex items-center justify-between p-3 bg-slate-50 dark:bg-slate-800 rounded-lg">
                      <div className="flex items-center space-x-3">
                        <div className="w-8 h-8 bg-gradient-to-br from-blue-400 to-purple-400 rounded-full flex items-center justify-center">
                          <User className="w-4 h-4 text-white" />
                        </div>
                        <div>
                          <div className="flex items-center space-x-1">
                            <span className="text-sm font-medium">{merchant.name}</span>
                            {merchant.verified && (
                              <Badge className="bg-green-100 text-green-800 text-xs px-1 py-0">
                                {i18n.language === 'zh-TW' ? '優秀' : 'Verified'}
                              </Badge>
                            )}
                          </div>
                          <div className="flex items-center space-x-2 text-xs text-slate-500">
                            <span>{i18n.language === 'zh-TW' ? '成單率' : 'Success'} {merchant.completion}%</span>
                            <span>{merchant.rating}%</span>
                          </div>
                        </div>
                      </div>
                      <div className="flex flex-col md:flex-row md:items-center items-start space-x-2">
                        <div className="flex flex-col">
                          <div className="text-xs md:text-sm font-medium">{merchant.amount} BOB</div>
                          <div className="text-[10px] md:text-xs text-slate-500">{merchant.price} {i18n.language === 'zh-TW' ? '單價' : 'per unit'}</div>
                        </div>
                        <Button size="sm" className="bg-blue-500 text-white text-xs">
                        {i18n.language === 'zh-TW' ? '購買' : 'Buy'}
                      </Button>
                      </div>

                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Assets Tab */}
          <TabsContent value="assets" className="space-y-4">
            <Card className="shadow-sm">
              <CardHeader className="pb-2">
                <div className="flex items-center justify-between">
                  <CardTitle className="text-base">
                    {i18n.language === 'zh-TW' ? '資產' : 'Assets'}
                  </CardTitle>
                  <Button size="icon" variant="ghost">
                    <Plus className="w-4 h-4" />
                  </Button>
                </div>
              </CardHeader>
              <CardContent className="pt-0">
                {/* Operating Functions */}
                <div className="mb-4">
                  <Label className="text-sm font-medium mb-2 block">
                    {i18n.language === 'zh-TW' ? '操作功能' : 'Operations'}
                  </Label>
                  <div className="grid grid-cols-4 gap-3">
                    <Button variant="ghost" className="flex flex-col items-center p-3 h-auto bg-slate-50 dark:bg-slate-800">
                      <div className="w-8 h-8 bg-purple-500 rounded-lg flex items-center justify-center mb-1">
                        <ArrowUpDown className="w-4 h-4 text-white" />
                      </div>
                      <span className="text-xs">{i18n.language === 'zh-TW' ? '閃兌' : 'Swap'}</span>
                    </Button>
                    <Button variant="ghost" className="flex flex-col items-center p-3 h-auto bg-slate-50 dark:bg-slate-800">
                      <div className="w-8 h-8 bg-blue-500 rounded-lg flex items-center justify-center mb-1">
                        <Download className="w-4 h-4 text-white" />
                      </div>
                      <span className="text-xs">{i18n.language === 'zh-TW' ? '充幣' : 'Deposit'}</span>
                    </Button>
                    <Button variant="ghost" className="flex flex-col items-center p-3 h-auto bg-slate-50 dark:bg-slate-800">
                      <div className="w-8 h-8 bg-orange-500 rounded-lg flex items-center justify-center mb-1">
                        <Upload className="w-4 h-4 text-white" />
                      </div>
                      <span className="text-xs">{i18n.language === 'zh-TW' ? '提幣' : 'Withdraw'}</span>
                    </Button>
                    <Button variant="ghost" className="flex flex-col items-center p-3 h-auto bg-slate-50 dark:bg-slate-800">
                      <div className="w-8 h-8 bg-green-500 rounded-lg flex items-center justify-center mb-1">
                        <Clock className="w-4 h-4 text-white" />
                      </div>
                      <span className="text-xs">{i18n.language === 'zh-TW' ? '記錄' : 'Records'}</span>
                    </Button>
                  </div>
                </div>

                {/* Asset List */}
                <div>
                  <Label className="text-sm font-medium mb-2 block">
                    {i18n.language === 'zh-TW' ? '資產列表' : 'Asset List'}
                  </Label>
                  <div className="space-y-3">
                    <div className="flex items-center justify-between p-3 bg-slate-50 dark:bg-slate-800 rounded-lg">
                      <div className="flex items-center space-x-3">
                        <div className="w-8 h-8 bg-gradient-to-br from-purple-400 to-pink-400 rounded-lg flex items-center justify-center">
                          <span className="text-white text-xs font-bold">988</span>
                        </div>
                        <div>
                          <div className="font-medium text-sm">988幣</div>
                          <div className="text-xs text-slate-500">988 Coin</div>
                        </div>
                      </div>
                      <div className="text-right">
                        <div className="font-medium text-sm">0.0</div>
                        <div className="text-xs text-slate-500">
                          {i18n.language === 'zh-TW' ? '暫不可用' : 'Not Available'} 0.0
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>

  );
}
