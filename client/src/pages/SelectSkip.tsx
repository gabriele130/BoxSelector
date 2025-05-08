import { useState } from "react";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { ProgressStepper } from "@/components/ProgressStepper";
import { useBooking } from "@/contexts/BookingContext";
import { Button } from "@/components/ui/button";
import { ArrowLeft, ArrowRight, Info, Truck } from "lucide-react";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";

// Skip size data
const skipSizes = [
  {
    id: "2yard",
    name: "2 Yard Skip",
    capacity: "20-25 bin bags",
    bestFor: "Small garden or home clearance",
    description: "Our smallest skip, perfect for minor garden work or small home renovations.",
    restrictions: null,
    price: "£120",
    image: <Truck className="h-16 w-16" />,
  },
  {
    id: "4yard",
    name: "4 Yard Skip",
    capacity: "40-45 bin bags",
    bestFor: "Garden clearance, small home renovations",
    description: "Medium-sized skip, suitable for a bathroom renovation or garden waste.",
    restrictions: null,
    price: "£160",
    image: <Truck className="h-16 w-16" />,
  },
  {
    id: "6yard",
    name: "6 Yard Skip",
    capacity: "60-65 bin bags",
    bestFor: "Home renovation, medium projects",
    description: "Popular choice for home improvement projects and larger clearances.",
    restrictions: null,
    price: "£190",
    image: <Truck className="h-16 w-16" />,
  },
  {
    id: "8yard",
    name: "8 Yard Skip",
    capacity: "80-85 bin bags",
    bestFor: "Large renovation, construction waste",
    description: "Ideal for larger construction jobs or complete home renovations.",
    restrictions: null,
    price: "£220",
    image: <Truck className="h-16 w-16" />,
  },
  {
    id: "12yard",
    name: "12 Yard Skip",
    capacity: "120-130 bin bags",
    bestFor: "Large commercial waste, big projects",
    description: "Our larger skip, perfect for significant construction or commercial waste.",
    restrictions: "Not suitable for heavy waste",
    price: "£280",
    image: <Truck className="h-16 w-16" />,
  },
  {
    id: "16yard",
    name: "16 Yard Skip",
    capacity: "160-170 bin bags",
    bestFor: "Commercial projects, large volumes",
    description: "Our largest skip, designed for substantial waste volumes and commercial usage.",
    restrictions: "Not suitable for heavy waste",
    price: "£340",
    image: <Truck className="h-16 w-16" />,
  },
];

export default function SelectSkip() {
  const { bookingState, setSkipSize, setCurrentStep } = useBooking();
  const [selectedSkip, setSelectedSkip] = useState<string | null>(bookingState.skipSize);
  
  // Check if heavy waste is selected
  const hasHeavyWaste = 
    bookingState.heavyWastePercentage !== "No heavy waste" && 
    bookingState.heavyWasteTypes.length > 0;
  
  // Filter skips based on heavy waste restrictions
  const availableSkips = hasHeavyWaste
    ? skipSizes.filter(skip => !skip.restrictions || !skip.restrictions.includes("heavy waste"))
    : skipSizes;

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
            
            {/* Skip Size Selection */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-8">
              {availableSkips.map((skip) => (
                <Card 
                  key={skip.id}
                  className={`cursor-pointer transition-all border-2 ${
                    selectedSkip === skip.id
                      ? "border-primary bg-black"
                      : "border-gray-700 bg-black"
                  } hover:border-primary/70`}
                  onClick={() => handleSkipSelect(skip.id)}
                >
                  <CardHeader className="pb-2">
                    <div className="flex justify-between items-start">
                      <CardTitle className="text-lg font-semibold text-white">{skip.name}</CardTitle>
                      <div className="text-xl font-bold text-primary">{skip.price}</div>
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
                      className={`w-full ${selectedSkip === skip.id ? "bg-primary text-white" : "text-white"}`}
                      onClick={() => handleSkipSelect(skip.id)}
                    >
                      {selectedSkip === skip.id ? "Selected" : "Select"}
                    </Button>
                  </CardFooter>
                </Card>
              ))}
            </div>
            
            {/* Action Buttons */}
            <div className="flex justify-between mt-12">
              <Button
                variant="outline"
                className="px-6 py-6 rounded-md text-gray-300 hover:bg-gray-800 transition-colors"
                onClick={handleGoBack}
              >
                <ArrowLeft className="mr-2 h-4 w-4" /> Back
              </Button>
              
              <Button
                variant="default"
                className="px-6 py-6 rounded-md bg-primary hover:bg-primary/90 text-white font-medium transition-colors"
                onClick={handleContinue}
                disabled={!selectedSkip}
              >
                Continue <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </div>
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
}