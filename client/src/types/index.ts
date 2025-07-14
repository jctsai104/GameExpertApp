export interface QuickAction {
  id: string;
  label: string;
  icon: string;
  gradient: string;
}

export interface CoinData {
  id: number;
  symbol: string;
  name: string;
  icon: string;
  price: string;
  change24h: string;
  trend: 'up' | 'down';
}

export interface UserData {
  id: number;
  name: string;
  userId: string;
  avatar: string;
  totalBalance: string;
  availableBalance: string;
}

export interface AdBannerData {
  id: number;
  title: string;
  subtitle: string;
  image: string;
  buttonText: string;
  link: string;
}
