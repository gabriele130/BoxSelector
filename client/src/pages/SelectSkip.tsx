import { useState, useEffect } from "react";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { ProgressStepper } from "@/components/ProgressStepper";
import { useBooking } from "@/contexts/BookingContext";
import { Button } from "@/components/ui/button";
import { ArrowLeft, ArrowRight, Info, Truck, AlertCircle } from "lucide-react";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { useToast } from "@/hooks/use-toast";

// API Skip type definition
interface ApiSkip {
  id: number;
  size: number;
  hire_period_days: number;
  transport_cost: number | null;
  per_tonne_cost: number | null;
  price_before_vat: number;
  vat: number;
  postcode: string;
  area: string;
  forbidden: boolean;
  created_at: string;
  updated_at: string;
  allowed_on_road: boolean;
  allows_heavy_waste: boolean;
}

// Local Skip type definition with additional display fields
interface SkipData {
  id: string;
  name: string;
  capacity: string;
  bestFor: string;
  description: string;
  restrictions: string | null;
  price: string;
  image: JSX.Element;
  allowsHeavyWaste: boolean;
  allowedOnRoad: boolean;
  apiData: ApiSkip;
}

// Function to get capacity based on skip size
const getCapacityForSize = (size: number): string => {
  const bagsPerYard = 10;
  const minBags = Math.floor(size * bagsPerYard * 0.9);
  const maxBags = Math.ceil(size * bagsPerYard * 1.1);
  return `${minBags}-${maxBags} bin bags`;
};

// Function to get best use description based on skip size
const getBestForDescription = (size: number): string => {
  if (size <= 4) return "Small garden or home clearance";
  if (size <= 8) return "Home renovation, medium projects";
  if (size <= 12) return "Large renovation, construction waste";
  if (size <= 16) return "Commercial projects, large volumes";
  return "Industrial projects, very large volumes";
};

export default function SelectSkip() {
  const { bookingState, setSkipSize, setCurrentStep } = useBooking();
  const [selectedSkip, setSelectedSkip] = useState<string | null>(bookingState.skipSize);
  const [skipData, setSkipData] = useState<SkipData[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const { toast } = useToast();
  
  // Check if heavy waste is selected
  const hasHeavyWaste = 
    bookingState.heavyWastePercentage !== "No heavy waste" && 
    bookingState.heavyWasteTypes.length > 0;
  
  // Fetch skips data from API
  useEffect(() => {
    const fetchSkips = async () => {
      try {
        setIsLoading(true);
        const response = await fetch("https://app.wewantwaste.co.uk/api/skips/by-location?postcode=NR32&area=Lowestoft");
        
        if (!response.ok) {
          throw new Error(`API error: ${response.status}`);
        }
        
        const apiSkips: ApiSkip[] = await response.json();
        
        // Convert API data to our format
        const formattedSkips: SkipData[] = apiSkips.map(skip => {
          const skipDescription = (size: number): string => {
            if (size <= 4) return "Perfect for small household clearances and garden waste.";
            if (size <= 8) return "Ideal for medium-sized renovation projects and larger garden clearances.";
            if (size <= 12) return "Great choice for larger renovation projects and significant waste disposal.";
            if (size <= 20) return "Suitable for large construction projects and substantial waste disposal needs.";
            return "Industrial-sized skip for major construction and demolition projects.";
          };
          
          // Calculate price including VAT
          const vatAmount = skip.price_before_vat * (skip.vat / 100);
          const totalPrice = skip.price_before_vat + vatAmount;
          
          return {
            id: skip.id.toString(),
            name: `${skip.size} Yard Skip`,
            capacity: getCapacityForSize(skip.size),
            bestFor: getBestForDescription(skip.size),
            description: skipDescription(skip.size),
            restrictions: skip.allows_heavy_waste ? null : "Not suitable for heavy waste",
            price: `£${totalPrice.toFixed(0)}`,
            image: <Truck className="h-16 w-16" />,
            allowsHeavyWaste: skip.allows_heavy_waste,
            allowedOnRoad: skip.allowed_on_road,
            apiData: skip
          };
        });
        
        setSkipData(formattedSkips);
        setError(null);
      } catch (err) {
        console.error("Error fetching skip data:", err);
        setError("Failed to load skip options. Please try again.");
        toast({
          title: "Error",
          description: "Failed to load skip options. Please try again.",
          variant: "destructive"
        });
      } finally {
        setIsLoading(false);
      }
    };
    
    fetchSkips();
  }, [toast]);
  
  // Filter skips based on heavy waste restrictions
  const availableSkips = skipData.filter((skip: SkipData) => 
    !hasHeavyWaste || (hasHeavyWaste && skip.allowsHeavyWaste)
  );

  const handleSkipSelect = (skipId: string) => {
    setSelectedSkip(skipId);
  };

  const handleContinue = () => {
    if (selectedSkip) {
      setSkipSize(selectedSkip);
      setCurrentStep(4); // Move to permit check step
    }
  };

  const handleGoBack = () => {
    setCurrentStep(2); // Go back to waste type step
  };

  return (
    <div className="min-h-screen flex flex-col bg-black">
      <Header />
      
      <main className="flex-grow">
        <div className="container mx-auto px-4 py-6 max-w-6xl">
          <ProgressStepper currentStep={bookingState.currentStep} />
          
          <div className="mt-12">
            <h2 className="text-2xl font-semibold text-center mb-6 text-white">
              Select the skip size you need
            </h2>
            
            {/* Information Panel */}
            {hasHeavyWaste && (
              <div className="bg-amber-900/30 border-l-4 border-amber-500 p-4 mb-8 rounded">
                <div className="flex">
                  <div className="flex-shrink-0 mt-0.5">
                    <Info className="h-5 w-5 text-amber-500" />
                  </div>
                  <div className="ml-3">
                    <p className="text-sm text-white">
                      Due to heavy waste selection, only skips up to 8 yards are available.
                      Larger skips cannot be used for heavy waste disposal for safety reasons.
                    </p>
                  </div>
                </div>
              </div>
            )}
            
            {/* Loading state */}
            {isLoading && (
              <div className="flex flex-col items-center justify-center py-12">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500"></div>
                <p className="mt-4 text-lg text-white">Loading skip options...</p>
              </div>
            )}
            
            {/* Error state */}
            {error && !isLoading && (
              <div className="bg-red-900/30 border-l-4 border-red-500 p-4 mb-8 rounded">
                <div className="flex">
                  <div className="flex-shrink-0 mt-0.5">
                    <AlertCircle className="h-5 w-5 text-red-500" />
                  </div>
                  <div className="ml-3">
                    <p className="text-sm text-white">
                      {error}
                    </p>
                    <Button 
                      variant="outline" 
                      className="mt-2 text-white border-red-700 hover:bg-red-900/50"
                      onClick={() => window.location.reload()}
                    >
                      Try Again
                    </Button>
                  </div>
                </div>
              </div>
            )}
            
            {/* No skips available state */}
            {!isLoading && !error && availableSkips.length === 0 && (
              <div className="bg-blue-900/30 border-l-4 border-blue-500 p-4 mb-8 rounded">
                <div className="flex">
                  <div className="flex-shrink-0 mt-0.5">
                    <Info className="h-5 w-5 text-blue-500" />
                  </div>
                  <div className="ml-3">
                    <p className="text-sm text-white">
                      No skips are currently available for your selection.
                      Please try changing your waste type or contact customer support.
                    </p>
                  </div>
                </div>
              </div>
            )}
            
            {/* Skip Size Selection */}
            {!isLoading && !error && availableSkips.length > 0 && (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-8">
                {availableSkips.map((skip) => (
                  <Card 
                    key={skip.id}
                    className={`cursor-pointer transition-all border-2 ${
                      selectedSkip === skip.id
                        ? "border-blue-600 bg-black"
                        : "border-gray-700 bg-black"
                    } hover:border-blue-600/70`}
                    onClick={() => handleSkipSelect(skip.id)}
                  >
                    <CardHeader className="pb-2">
                      <div className="flex justify-between items-start">
                        <CardTitle className="text-lg font-semibold text-white">{skip.name}</CardTitle>
                        <div className="text-xl font-bold text-blue-500">{skip.price}</div>
                      </div>
                      <CardDescription className="text-gray-300">{skip.bestFor}</CardDescription>
                    </CardHeader>
                    <CardContent className="pb-4">
                      <div className="flex items-center justify-between mb-4">
                        <div className="text-white">{skip.image}</div>
                        <div className="text-sm">
                          <div className="mb-1"><span className="text-gray-400">Capacity:</span> <span className="text-white">{skip.capacity}</span></div>
                        </div>
                      </div>
                      <p className="text-sm text-white">{skip.description}</p>
                      {skip.restrictions && (
                        <p className="mt-2 text-xs text-amber-300 font-medium">{skip.restrictions}</p>
                      )}
                    </CardContent>
                    <CardFooter className="pt-0">
                      <Button 
                        variant={selectedSkip === skip.id ? "default" : "outline"} 
                        className={`w-full ${selectedSkip === skip.id ? "bg-blue-600 text-white" : "text-white"}`}
                        onClick={() => handleSkipSelect(skip.id)}
                      >
                        {selectedSkip === skip.id ? "Selected" : "Select"}
                      </Button>
                    </CardFooter>
                  </Card>
                ))}
              </div>
            )}
            
            {/* Spazio vuoto al posto dei bottoni che sono stati spostati nel footer */}
            <div className="mt-12 pb-24"></div>
          </div>
        </div>
      </main>
      
      <Footer 
        onBack={handleGoBack}
        onContinue={handleContinue}
        disableContinue={!selectedSkip}
      />
    </div>
  );
}