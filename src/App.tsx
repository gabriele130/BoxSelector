import { Route, Switch } from "wouter";
import Home from "./pages/Home";
import SelectSkip from "./pages/SelectSkip";
import { BookingProvider } from "./contexts/BookingContext";
import { Toaster } from "./components/ui/toaster";
import { QueryClientProvider } from "@tanstack/react-query";
import { queryClient } from "./lib/queryClient";
import NotFound from "./pages/not-found";

/**
 * Router component that handles application routing
 * Uses wouter for lightweight routing without React Router dependencies
 * Defines the main routes of the application:
 * - Home (waste selection page)
 * - Skip Selection page
 * - NotFound fallback for undefined routes
 */
function Router() {
  return (
    <Switch>
      <Route path="/" component={Home} />
      <Route path="/select-skip" component={SelectSkip} />
      <Route component={NotFound} />
    </Switch>
  );
}

/**
 * Main application component
 * Provides global context providers and base styling
 * 
 * Structure:
 * - QueryClientProvider: Handles API requests and caching
 * - BookingProvider: Manages booking state throughout the application
 * - Base container: Applies global styling with dark theme
 * - Router: Handles page routing
 * - Toaster: UI component for displaying notifications
 */
function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <BookingProvider>
        <div className="min-h-screen bg-black text-white">
          <Router />
          <Toaster />
        </div>
      </BookingProvider>
    </QueryClientProvider>
  );
}

export default App;