import { 
  users, 
  cryptocurrencies, 
  userAssets, 
  transactions, 
  orders,
  type User, 
  type InsertUser,
  type Cryptocurrency,
  type InsertCryptocurrency,
  type UserAsset,
  type InsertUserAsset,
  type Transaction,
  type InsertTransaction,
  type Order,
  type InsertOrder
} from "@shared/schema";

export interface IStorage {
  // User methods
  getUser(id: number): Promise<User | undefined>;
  getUserByUsername(username: string): Promise<User | undefined>;
  createUser(user: InsertUser): Promise<User>;
  updateUser(id: number, updates: Partial<User>): Promise<User | undefined>;

  // Cryptocurrency methods
  getAllCryptocurrencies(): Promise<Cryptocurrency[]>;
  getCryptocurrency(id: number): Promise<Cryptocurrency | undefined>;
  getCryptocurrencyBySymbol(symbol: string): Promise<Cryptocurrency | undefined>;
  createCryptocurrency(crypto: InsertCryptocurrency): Promise<Cryptocurrency>;
  updateCryptocurrency(id: number, updates: Partial<Cryptocurrency>): Promise<Cryptocurrency | undefined>;

  // User Asset methods
  getUserAssets(userId: number): Promise<UserAsset[]>;
  getUserAsset(userId: number, cryptoId: number): Promise<UserAsset | undefined>;
  createUserAsset(asset: InsertUserAsset): Promise<UserAsset>;
  updateUserAsset(id: number, updates: Partial<UserAsset>): Promise<UserAsset | undefined>;

  // Transaction methods
  getUserTransactions(userId: number): Promise<Transaction[]>;
  getTransaction(id: number): Promise<Transaction | undefined>;
  createTransaction(transaction: InsertTransaction): Promise<Transaction>;
  updateTransaction(id: number, updates: Partial<Transaction>): Promise<Transaction | undefined>;

  // Order methods
  getUserOrders(userId: number): Promise<Order[]>;
  getOrder(id: number): Promise<Order | undefined>;
  createOrder(order: InsertOrder): Promise<Order>;
  updateOrder(id: number, updates: Partial<Order>): Promise<Order | undefined>;
}

export class MemStorage implements IStorage {
  private users: Map<number, User>;
  private cryptocurrencies: Map<number, Cryptocurrency>;
  private userAssets: Map<number, UserAsset>;
  private transactions: Map<number, Transaction>;
  private orders: Map<number, Order>;
  private currentUserId: number;
  private currentCryptoId: number;
  private currentAssetId: number;
  private currentTransactionId: number;
  private currentOrderId: number;

  constructor() {
    this.users = new Map();
    this.cryptocurrencies = new Map();
    this.userAssets = new Map();
    this.transactions = new Map();
    this.orders = new Map();
    this.currentUserId = 1;
    this.currentCryptoId = 1;
    this.currentAssetId = 1;
    this.currentTransactionId = 1;
    this.currentOrderId = 1;

    this.initializeData();
  }

  private initializeData() {
    // Create sample cryptocurrencies
    const btc = this.createCryptocurrency({
      symbol: "BTC",
      name: "Bitcoin",
      icon: "https://images.unsplash.com/photo-1518546305927-5a555bb7020d?ixlib=rb-4.0.3&auto=format&fit=crop&w=100&h=100",
      price: "42350.00",
      change24h: "2.34",
      marketCap: "830000000000.00"
    });

    const eth = this.createCryptocurrency({
      symbol: "ETH",
      name: "Ethereum",
      icon: "https://images.unsplash.com/photo-1621761191319-c6fb62004040?ixlib=rb-4.0.3&auto=format&fit=crop&w=100&h=100",
      price: "2680.50",
      change24h: "-1.23",
      marketCap: "322000000000.00"
    });

    const ada = this.createCryptocurrency({
      symbol: "ADA",
      name: "Cardano",
      icon: "https://images.unsplash.com/photo-1639762681485-074b7f938ba0?ixlib=rb-4.0.3&auto=format&fit=crop&w=100&h=100",
      price: "0.48",
      change24h: "5.67",
      marketCap: "17000000000.00"
    });

    const sol = this.createCryptocurrency({
      symbol: "SOL",
      name: "Solana",
      icon: "https://images.unsplash.com/photo-1518546305927-5a555bb7020d?ixlib=rb-4.0.3&auto=format&fit=crop&w=100&h=100",
      price: "98.32",
      change24h: "3.45",
      marketCap: "42000000000.00"
    });

    // Create sample user
    const user = this.createUser({
      username: "alexchen",
      password: "password123",
      email: "alex.chen@gameexpert.com",
      firstName: "Alex",
      lastName: "Chen",
      avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&auto=format&fit=crop&w=100&h=100",
      totalBalance: "12450.67",
      availableBalance: "8250.30"
    });
  }

  // User methods
  async getUser(id: number): Promise<User | undefined> {
    return this.users.get(id);
  }

  async getUserByUsername(username: string): Promise<User | undefined> {
    return Array.from(this.users.values()).find(user => user.username === username);
  }

  async createUser(insertUser: InsertUser): Promise<User> {
    const id = this.currentUserId++;
    const user: User = { 
      ...insertUser, 
      id,
      createdAt: new Date()
    };
    this.users.set(id, user);
    return user;
  }

  async updateUser(id: number, updates: Partial<User>): Promise<User | undefined> {
    const user = this.users.get(id);
    if (!user) return undefined;
    
    const updatedUser = { ...user, ...updates };
    this.users.set(id, updatedUser);
    return updatedUser;
  }

  // Cryptocurrency methods
  async getAllCryptocurrencies(): Promise<Cryptocurrency[]> {
    return Array.from(this.cryptocurrencies.values());
  }

  async getCryptocurrency(id: number): Promise<Cryptocurrency | undefined> {
    return this.cryptocurrencies.get(id);
  }

  async getCryptocurrencyBySymbol(symbol: string): Promise<Cryptocurrency | undefined> {
    return Array.from(this.cryptocurrencies.values()).find(crypto => crypto.symbol === symbol);
  }

  async createCryptocurrency(insertCrypto: InsertCryptocurrency): Promise<Cryptocurrency> {
    const id = this.currentCryptoId++;
    const crypto: Cryptocurrency = { 
      ...insertCrypto, 
      id,
      updatedAt: new Date()
    };
    this.cryptocurrencies.set(id, crypto);
    return crypto;
  }

  async updateCryptocurrency(id: number, updates: Partial<Cryptocurrency>): Promise<Cryptocurrency | undefined> {
    const crypto = this.cryptocurrencies.get(id);
    if (!crypto) return undefined;
    
    const updatedCrypto = { ...crypto, ...updates, updatedAt: new Date() };
    this.cryptocurrencies.set(id, updatedCrypto);
    return updatedCrypto;
  }

  // User Asset methods
  async getUserAssets(userId: number): Promise<UserAsset[]> {
    return Array.from(this.userAssets.values()).filter(asset => asset.userId === userId);
  }

  async getUserAsset(userId: number, cryptoId: number): Promise<UserAsset | undefined> {
    return Array.from(this.userAssets.values()).find(asset => 
      asset.userId === userId && asset.cryptoId === cryptoId
    );
  }

  async createUserAsset(insertAsset: InsertUserAsset): Promise<UserAsset> {
    const id = this.currentAssetId++;
    const asset: UserAsset = { ...insertAsset, id };
    this.userAssets.set(id, asset);
    return asset;
  }

  async updateUserAsset(id: number, updates: Partial<UserAsset>): Promise<UserAsset | undefined> {
    const asset = this.userAssets.get(id);
    if (!asset) return undefined;
    
    const updatedAsset = { ...asset, ...updates };
    this.userAssets.set(id, updatedAsset);
    return updatedAsset;
  }

  // Transaction methods
  async getUserTransactions(userId: number): Promise<Transaction[]> {
    return Array.from(this.transactions.values()).filter(tx => tx.userId === userId);
  }

  async getTransaction(id: number): Promise<Transaction | undefined> {
    return this.transactions.get(id);
  }

  async createTransaction(insertTransaction: InsertTransaction): Promise<Transaction> {
    const id = this.currentTransactionId++;
    const transaction: Transaction = { 
      ...insertTransaction, 
      id,
      createdAt: new Date()
    };
    this.transactions.set(id, transaction);
    return transaction;
  }

  async updateTransaction(id: number, updates: Partial<Transaction>): Promise<Transaction | undefined> {
    const transaction = this.transactions.get(id);
    if (!transaction) return undefined;
    
    const updatedTransaction = { ...transaction, ...updates };
    this.transactions.set(id, updatedTransaction);
    return updatedTransaction;
  }

  // Order methods
  async getUserOrders(userId: number): Promise<Order[]> {
    return Array.from(this.orders.values()).filter(order => order.userId === userId);
  }

  async getOrder(id: number): Promise<Order | undefined> {
    return this.orders.get(id);
  }

  async createOrder(insertOrder: InsertOrder): Promise<Order> {
    const id = this.currentOrderId++;
    const order: Order = { 
      ...insertOrder, 
      id,
      createdAt: new Date()
    };
    this.orders.set(id, order);
    return order;
  }

  async updateOrder(id: number, updates: Partial<Order>): Promise<Order | undefined> {
    const order = this.orders.get(id);
    if (!order) return undefined;
    
    const updatedOrder = { ...order, ...updates };
    this.orders.set(id, updatedOrder);
    return updatedOrder;
  }
}

export const storage = new MemStorage();
