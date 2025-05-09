import { Switch, Route } from "wouter";
import { queryClient } from "./lib/queryClient";
import { QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import NotFound from "@/pages/not-found";
import Home from "@/pages/Home";
import SelectSkip from "@/pages/SelectSkip";
import { BookingProvider } from "./contexts/BookingContext";

function Router() {
  return (
    <Switch>
      <Route path="/" component={Home} />
      <Route path="/select-skip" component={SelectSkip} />
      <Route component={NotFound} />
    </Switch>
  );
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <BookingProvider>
        <TooltipProvider>
          <Toaster />
          <Router />
        </TooltipProvider>
      </BookingProvider>
    </QueryClientProvider>
  );
}

export default App;
