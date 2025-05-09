import { users, type User, type InsertUser, type Booking, type InsertBooking, bookings } from "@shared/schema";

// Storage interface for CRUD operations
export interface IStorage {
  // User operations
  getUser(id: number): Promise<User | undefined>;
  getUserByUsername(username: string): Promise<User | undefined>;
  createUser(user: InsertUser): Promise<User>;
  
  // Booking operations
  getAllBookings(): Promise<Booking[]>;
  getBookingById(id: number): Promise<Booking | undefined>;
  createBooking(booking: InsertBooking): Promise<Booking>;
  updateBooking(id: number, data: Partial<InsertBooking>): Promise<Booking>;
  deleteBooking(id: number): Promise<void>;
}

// Memory storage implementation
export class MemStorage implements IStorage {
  private users: Map<number, User>;
  private bookings: Map<number, Booking>;
  private userCurrentId: number;
  private bookingCurrentId: number;

  constructor() {
    this.users = new Map();
    this.bookings = new Map();
    this.userCurrentId = 1;
    this.bookingCurrentId = 1;
  }

  // User operations
  async getUser(id: number): Promise<User | undefined> {
    return this.users.get(id);
  }

  async getUserByUsername(username: string): Promise<User | undefined> {
    return Array.from(this.users.values()).find(
      (user) => user.username === username,
    );
  }

  async createUser(insertUser: InsertUser): Promise<User> {
    const id = this.userCurrentId++;
    const user: User = { ...insertUser, id };
    this.users.set(id, user);
    return user;
  }

  // Booking operations
  async getAllBookings(): Promise<Booking[]> {
    return Array.from(this.bookings.values());
  }

  async getBookingById(id: number): Promise<Booking | undefined> {
    return this.bookings.get(id);
  }

  async createBooking(insertBooking: InsertBooking): Promise<Booking> {
    const id = this.bookingCurrentId++;
    const now = new Date();
    
    const booking: Booking = {
      ...insertBooking,
      id,
      createdAt: now,
    };
    
    this.bookings.set(id, booking);
    return booking;
  }

  async updateBooking(id: number, data: Partial<InsertBooking>): Promise<Booking> {
    const existingBooking = this.bookings.get(id);
    
    if (!existingBooking) {
      throw new Error(`Booking with id ${id} not found`);
    }
    
    const updatedBooking: Booking = {
      ...existingBooking,
      ...data,
    };
    
    this.bookings.set(id, updatedBooking);
    return updatedBooking;
  }

  async deleteBooking(id: number): Promise<void> {
    this.bookings.delete(id);
  }
}

export const storage = new MemStorage();
