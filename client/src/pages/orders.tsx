import { useTranslation } from 'react-i18next';
import { ShoppingCart, Clock, CheckCircle, XCircle, Filter } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

export default function Orders() {
  const { t } = useTranslation();

  const orders = [
    {
      id: '1',
      type: 'buy',
      asset: 'BTC',
      amount: '0.05',
      price: '45,000',
      status: 'completed',
      date: '2024-01-15',
    },
    {
      id: '2',
      type: 'sell',
      asset: 'ETH',
      amount: '2.5',
      price: '2,800',
      status: 'pending',
      date: '2024-01-14',
    },
    {
      id: '3',
      type: 'buy',
      asset: 'USDT',
      amount: '1000',
      price: '1.00',
      status: 'cancelled',
      date: '2024-01-13',
    },
  ];

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'completed':
        return <CheckCircle className="w-4 h-4 text-green-500" />;
      case 'pending':
        return <Clock className="w-4 h-4 text-yellow-500" />;
      case 'cancelled':
        return <XCircle className="w-4 h-4 text-red-500" />;
      default:
        return null;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'completed':
        return 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200';
      case 'pending':
        return 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200';
      case 'cancelled':
        return 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200';
      default:
        return 'bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-200';
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-800 px-4 py-6">
      <div className="max-w-4xl mx-auto">
        <div className="flex items-center justify-between mb-6">
          <h1 className="text-2xl font-bold text-slate-900 dark:text-white">
            {t('orders')}
          </h1>
          <Button variant="outline" size="sm">
            <Filter className="w-4 h-4 mr-2" />
            {t('filter')}
          </Button>
        </div>

        <Tabs defaultValue="all" className="w-full">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="all">{t('all')}</TabsTrigger>
            <TabsTrigger value="pending">{t('pending')}</TabsTrigger>
            <TabsTrigger value="completed">{t('completed')}</TabsTrigger>
            <TabsTrigger value="cancelled">{t('cancelled')}</TabsTrigger>
          </TabsList>

          <TabsContent value="all" className="mt-6">
            <div className="space-y-4">
              {orders.map((order) => (
                <Card key={order.id} className="hover:shadow-md transition-shadow">
                  <CardContent className="p-4">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-4">
                        <div className="w-10 h-10 bg-gradient-to-r from-gaming-neon to-gaming-purple rounded-full flex items-center justify-center">
                          <ShoppingCart className="w-5 h-5 text-white" />
                        </div>
                        <div>
                          <div className="flex items-center space-x-2">
                            <span className="font-semibold text-slate-900 dark:text-white">
                              {order.type.toUpperCase()} {order.asset}
                            </span>
                            <Badge className={getStatusColor(order.status)}>
                              {getStatusIcon(order.status)}
                              <span className="ml-1">{t(order.status)}</span>
                            </Badge>
                          </div>
                          <div className="text-sm text-slate-600 dark:text-slate-400">
                            {order.amount} {order.asset} @ ${order.price}
                          </div>
                          <div className="text-xs text-slate-500 dark:text-slate-500">
                            {order.date}
                          </div>
                        </div>
                      </div>
                      <div className="text-right">
                        <div className="text-lg font-semibold text-slate-900 dark:text-white">
                          ${(parseFloat(order.amount) * parseFloat(order.price.replace(',', ''))).toLocaleString()}
                        </div>
                        <div className={`text-sm ${order.type === 'buy' ? 'text-green-600' : 'text-red-600'}`}>
                          {order.type === 'buy' ? '+' : '-'}{order.amount} {order.asset}
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="pending" className="mt-6">
            <div className="space-y-4">
              {orders.filter(order => order.status === 'pending').map((order) => (
                <Card key={order.id} className="hover:shadow-md transition-shadow">
                  <CardContent className="p-4">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-4">
                        <div className="w-10 h-10 bg-gradient-to-r from-gaming-neon to-gaming-purple rounded-full flex items-center justify-center">
                          <ShoppingCart className="w-5 h-5 text-white" />
                        </div>
                        <div>
                          <div className="flex items-center space-x-2">
                            <span className="font-semibold text-slate-900 dark:text-white">
                              {order.type.toUpperCase()} {order.asset}
                            </span>
                            <Badge className={getStatusColor(order.status)}>
                              {getStatusIcon(order.status)}
                              <span className="ml-1">{t(order.status)}</span>
                            </Badge>
                          </div>
                          <div className="text-sm text-slate-600 dark:text-slate-400">
                            {order.amount} {order.asset} @ ${order.price}
                          </div>
                          <div className="text-xs text-slate-500 dark:text-slate-500">
                            {order.date}
                          </div>
                        </div>
                      </div>
                      <Button variant="outline" size="sm">
                        {t('cancel_order')}
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="completed" className="mt-6">
            <div className="space-y-4">
              {orders.filter(order => order.status === 'completed').map((order) => (
                <Card key={order.id} className="hover:shadow-md transition-shadow">
                  <CardContent className="p-4">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-4">
                        <div className="w-10 h-10 bg-gradient-to-r from-gaming-neon to-gaming-purple rounded-full flex items-center justify-center">
                          <ShoppingCart className="w-5 h-5 text-white" />
                        </div>
                        <div>
                          <div className="flex items-center space-x-2">
                            <span className="font-semibold text-slate-900 dark:text-white">
                              {order.type.toUpperCase()} {order.asset}
                            </span>
                            <Badge className={getStatusColor(order.status)}>
                              {getStatusIcon(order.status)}
                              <span className="ml-1">{t(order.status)}</span>
                            </Badge>
                          </div>
                          <div className="text-sm text-slate-600 dark:text-slate-400">
                            {order.amount} {order.asset} @ ${order.price}
                          </div>
                          <div className="text-xs text-slate-500 dark:text-slate-500">
                            {order.date}
                          </div>
                        </div>
                      </div>
                      <div className="text-right">
                        <div className="text-lg font-semibold text-slate-900 dark:text-white">
                          ${(parseFloat(order.amount) * parseFloat(order.price.replace(',', ''))).toLocaleString()}
                        </div>
                        <div className={`text-sm ${order.type === 'buy' ? 'text-green-600' : 'text-red-600'}`}>
                          {order.type === 'buy' ? '+' : '-'}{order.amount} {order.asset}
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="cancelled" className="mt-6">
            <div className="space-y-4">
              {orders.filter(order => order.status === 'cancelled').map((order) => (
                <Card key={order.id} className="hover:shadow-md transition-shadow">
                  <CardContent className="p-4">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-4">
                        <div className="w-10 h-10 bg-gradient-to-r from-gaming-neon to-gaming-purple rounded-full flex items-center justify-center">
                          <ShoppingCart className="w-5 h-5 text-white" />
                        </div>
                        <div>
                          <div className="flex items-center space-x-2">
                            <span className="font-semibold text-slate-900 dark:text-white">
                              {order.type.toUpperCase()} {order.asset}
                            </span>
                            <Badge className={getStatusColor(order.status)}>
                              {getStatusIcon(order.status)}
                              <span className="ml-1">{t(order.status)}</span>
                            </Badge>
                          </div>
                          <div className="text-sm text-slate-600 dark:text-slate-400">
                            {order.amount} {order.asset} @ ${order.price}
                          </div>
                          <div className="text-xs text-slate-500 dark:text-slate-500">
                            {order.date}
                          </div>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}