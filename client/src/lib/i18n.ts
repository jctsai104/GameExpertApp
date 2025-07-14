import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

i18n
  .use(initReactI18next)
  .init({
    resources: {
      en: {
        translation: {
          // Header
          "game_expert": "GAME EXPERT",
          "notifications": "Notifications",
          "language": "Language",
          "qr_scanner": "QR Scanner",
          "theme_toggle": "Theme Toggle",
          
          // Quick Actions
          "quick_actions": "Quick Actions",
          "buy": "Buy",
          "transfer": "Transfer",
          "sell": "Sell",
          "support": "Support",
          
          // Coin Trends
          "daily_coin_trends": "Daily Coin Trends",
          "view_all": "View All",
          
          // Trading Features
          "trading_features": "Trading Features",
          "instant_swap": "Instant Swap",
          "instant_swap_desc": "Trade cryptocurrencies instantly",
          "c2c_trading": "C2C Trading",
          "c2c_trading_desc": "Peer-to-peer cryptocurrency trading",
          "market_analysis": "Market Analysis",
          "market_analysis_desc": "Real-time market insights",
          
          // Portfolio
          "your_portfolio": "Your Portfolio",
          "view_profile": "View Profile",
          "total_balance": "Total Balance",
          "available": "Available",
          "ready_to_trade": "Ready to trade",
          "receive": "Receive",
          
          // Announcements
          "announcement": "🔥 New Feature: Instant BTC/ETH swaps now available! • 💰 Earn up to 12% APY on staking • 🎮 Gaming tokens now supported • 📈 Market rally continues...",
          
          // Navigation
          "home": "Home",
          "trading": "Trading",
          "wallet": "Wallet",
          "profile": "Profile",
          "scan": "Scan",
          "orders": "Orders",
          
          // Trading Page
          "deposit": "Deposit",
          "withdraw": "Withdraw",
          "swap": "Swap",
          "from": "From",
          "to": "To",
          "amount": "Amount",
          "balance": "Balance",
          "swap_now": "Swap Now",
          "recent_orders": "Recent Orders",
          "order_history": "Order History",
          "price": "Price",
          "status": "Status",
          "date": "Date",
          
          // Profile Page
          "assets": "Assets",
          "asset_overview": "Asset Overview",
          "transactions": "Transactions",
          "settings": "Settings",
          "kyc_verification": "KYC Verification",
          "security": "Security",
          "billing": "Billing",
          "complaints": "Complaints",
          "token_swap": "Token Swap",
          "total_value": "Total Value",
          "profit_loss": "Profit/Loss",
          
          // Scan Page
          "scan_qr_description": "Point your camera at a QR code to scan",
          "camera": "Camera",
          "upload_image": "Upload Image",
          "recent_scans": "Recent Scans",
          "no_recent_scans": "No recent scans",
          
          // Orders Page
          "filter": "Filter",
          "all": "All",
          "pending": "Pending",
          "completed": "Completed",
          "cancelled": "Cancelled",
          "cancel_order": "Cancel Order",
          
          // Header
          "verified_user": "Verified User"
        }
      },
      "zh-TW": {
        translation: {
          // Header
          "game_expert": "遊戲專家",
          "notifications": "通知",
          "language": "語言",
          "qr_scanner": "二維碼掃描",
          "theme_toggle": "主題切換",
          
          // Quick Actions
          "quick_actions": "快速操作",
          "buy": "購買",
          "transfer": "轉帳",
          "sell": "出售",
          "support": "客服",
          
          // Coin Trends
          "daily_coin_trends": "每日幣種走勢",
          "view_all": "查看全部",
          
          // Trading Features
          "trading_features": "交易功能",
          "instant_swap": "即時兌換",
          "instant_swap_desc": "即時交易加密貨幣",
          "c2c_trading": "C2C交易",
          "c2c_trading_desc": "點對點加密貨幣交易",
          "market_analysis": "市場分析",
          "market_analysis_desc": "即時市場洞察",
          
          // Portfolio
          "your_portfolio": "您的投資組合",
          "view_profile": "查看個人資料",
          "total_balance": "總餘額",
          "available": "可用餘額",
          "ready_to_trade": "可交易",
          "receive": "接收",
          
          // Announcements
          "announcement": "🔥 新功能：BTC/ETH即時兌換現已可用！• 💰 質押最高可獲得12%年收益 • 🎮 現已支持遊戲代幣 • 📈 市場持續上漲...",
          
          // Navigation
          "home": "首頁",
          "trading": "交易",
          "wallet": "錢包",
          "profile": "個人資料",
          "scan": "掃描",
          "orders": "訂單",
          
          // Trading Page
          "deposit": "存款",
          "withdraw": "提款",
          "swap": "兌換",
          "from": "從",
          "to": "到",
          "amount": "金額",
          "balance": "餘額",
          "swap_now": "立即兌換",
          "recent_orders": "最近訂單",
          "order_history": "訂單歷史",
          "price": "價格",
          "status": "狀態",
          "date": "日期",
          
          // Profile Page
          "assets": "資產",
          "asset_overview": "資產概覽",
          "transactions": "交易記錄",
          "settings": "設置",
          "kyc_verification": "KYC驗證",
          "security": "安全",
          "billing": "賬單",
          "complaints": "投訴",
          "token_swap": "代幣兌換",
          "total_value": "總價值",
          "profit_loss": "盈虧",
          
          // Scan Page
          "scan_qr_description": "將相機對準二維碼進行掃描",
          "camera": "相機",
          "upload_image": "上傳圖片",
          "recent_scans": "最近掃描",
          "no_recent_scans": "沒有最近掃描記錄",
          
          // Orders Page
          "filter": "篩選",
          "all": "全部",
          "pending": "待處理",
          "completed": "已完成",
          "cancelled": "已取消",
          "cancel_order": "取消訂單",
          
          // Header
          "verified_user": "已驗證用戶"
        }
      }
    },
    lng: 'en',
    fallbackLng: 'en',
    interpolation: {
      escapeValue: false
    }
  });

export default i18n;
