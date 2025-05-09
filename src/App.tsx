import { Route, Switch } from "wouter";
import Home from "./pages/Home";
import SelectSkip from "./pages/SelectSkip";
import { BookingProvider } from "./contexts/BookingContext";
import { Toaster } from "./components/ui/toaster";
import { QueryClientProvider } from "@tanstack/react-query";
import { queryClient } from "./lib/queryClient";
import NotFound from "./pages/not-found";

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
        <div className="min-h-screen bg-black text-white">
          <Router />
          <Toaster />
        </div>
      </BookingProvider>
    </QueryClientProvider>
  );
}

export default App;