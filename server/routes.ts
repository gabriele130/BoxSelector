import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { insertBookingSchema } from "@shared/schema";
import { ZodError } from "zod";
import { fromZodError } from "zod-validation-error";
import path from "path";

export async function registerRoutes(app: Express): Promise<Server> {
  // Aggiungiamo una pagina di debug per StackBlitz
  app.get("/debug-stackblitz", (req, res) => {
    res.sendFile(path.resolve(process.cwd(), "stackblitz-debug.html"));
  });

  // Aggiungiamo una pagina standalone che non richiede React
  app.get("/standalone", (req, res) => {
    res.sendFile(path.resolve(process.cwd(), "standalone.html"));
  });
  
  // Get all bookings
  app.get("/api/bookings", async (req, res) => {
    try {
      const bookings = await storage.getAllBookings();
      res.json(bookings);
    } catch (error) {
      console.error("Error fetching bookings:", error);
      res.status(500).json({ error: "Failed to fetch bookings" });
    }
  });

  // Get booking by ID
  app.get("/api/bookings/:id", async (req, res) => {
    try {
      const id = parseInt(req.params.id);
      const booking = await storage.getBookingById(id);
      
      if (!booking) {
        return res.status(404).json({ error: "Booking not found" });
      }
      
      res.json(booking);
    } catch (error) {
      console.error("Error fetching booking:", error);
      res.status(500).json({ error: "Failed to fetch booking" });
    }
  });

  // Create a new booking
  app.post("/api/bookings", async (req, res) => {
    try {
      // Validate request body against schema
      const validatedData = insertBookingSchema.parse(req.body);
      
      // Create booking in storage
      const newBooking = await storage.createBooking(validatedData);
      
      res.status(201).json(newBooking);
    } catch (error) {
      if (error instanceof ZodError) {
        const validationError = fromZodError(error);
        return res.status(400).json({ error: validationError.message });
      }
      
      console.error("Error creating booking:", error);
      res.status(500).json({ error: "Failed to create booking" });
    }
  });

  // Update an existing booking
  app.patch("/api/bookings/:id", async (req, res) => {
    try {
      const id = parseInt(req.params.id);
      
      // First check if booking exists
      const existingBooking = await storage.getBookingById(id);
      if (!existingBooking) {
        return res.status(404).json({ error: "Booking not found" });
      }
      
      // Update booking in storage
      const updatedBooking = await storage.updateBooking(id, req.body);
      
      res.json(updatedBooking);
    } catch (error) {
      console.error("Error updating booking:", error);
      res.status(500).json({ error: "Failed to update booking" });
    }
  });

  // Delete a booking
  app.delete("/api/bookings/:id", async (req, res) => {
    try {
      const id = parseInt(req.params.id);
      
      // First check if booking exists
      const existingBooking = await storage.getBookingById(id);
      if (!existingBooking) {
        return res.status(404).json({ error: "Booking not found" });
      }
      
      // Delete booking from storage
      await storage.deleteBooking(id);
      
      res.status(204).send();
    } catch (error) {
      console.error("Error deleting booking:", error);
      res.status(500).json({ error: "Failed to delete booking" });
    }
  });

  const httpServer = createServer(app);

  return httpServer;
}
