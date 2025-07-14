import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { insertCryptocurrencySchema, insertUserAssetSchema, insertTransactionSchema, insertOrderSchema } from "@shared/schema";

export async function registerRoutes(app: Express): Promise<Server> {
  
  // Cryptocurrency routes
  app.get("/api/cryptocurrencies", async (req, res) => {
    try {
      const cryptocurrencies = await storage.getAllCryptocurrencies();
      res.json(cryptocurrencies);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch cryptocurrencies" });
    }
  });

  app.get("/api/cryptocurrencies/:id", async (req, res) => {
    try {
      const id = parseInt(req.params.id);
      const cryptocurrency = await storage.getCryptocurrency(id);
      
      if (!cryptocurrency) {
        return res.status(404).json({ message: "Cryptocurrency not found" });
      }
      
      res.json(cryptocurrency);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch cryptocurrency" });
    }
  });

  // User routes (simplified for demo)
  app.get("/api/users/1", async (req, res) => {
    try {
      const user = await storage.getUser(1);
      if (!user) {
        return res.status(404).json({ message: "User not found" });
      }
      res.json(user);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch user" });
    }
  });

  // User asset routes
  app.get("/api/users/:userId/assets", async (req, res) => {
    try {
      const userId = parseInt(req.params.userId);
      const assets = await storage.getUserAssets(userId);
      res.json(assets);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch user assets" });
    }
  });

  // Transaction routes
  app.get("/api/users/:userId/transactions", async (req, res) => {
    try {
      const userId = parseInt(req.params.userId);
      const transactions = await storage.getUserTransactions(userId);
      res.json(transactions);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch transactions" });
    }
  });

  app.post("/api/transactions", async (req, res) => {
    try {
      const validatedData = insertTransactionSchema.parse(req.body);
      const transaction = await storage.createTransaction(validatedData);
      res.status(201).json(transaction);
    } catch (error) {
      res.status(400).json({ message: "Invalid transaction data" });
    }
  });

  // Order routes
  app.get("/api/users/:userId/orders", async (req, res) => {
    try {
      const userId = parseInt(req.params.userId);
      const orders = await storage.getUserOrders(userId);
      res.json(orders);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch orders" });
    }
  });

  app.post("/api/orders", async (req, res) => {
    try {
      const validatedData = insertOrderSchema.parse(req.body);
      const order = await storage.createOrder(validatedData);
      res.status(201).json(order);
    } catch (error) {
      res.status(400).json({ message: "Invalid order data" });
    }
  });

  // Trading routes
  app.post("/api/swap", async (req, res) => {
    try {
      const { fromCryptoId, toCryptoId, amount, userId } = req.body;
      
      // Create a swap transaction
      const transaction = await storage.createTransaction({
        userId,
        type: "swap",
        cryptoId: fromCryptoId,
        amount: amount.toString(),
        status: "completed"
      });
      
      res.json({ success: true, transaction });
    } catch (error) {
      res.status(500).json({ message: "Swap failed" });
    }
  });

  const httpServer = createServer(app);
  return httpServer;
}
