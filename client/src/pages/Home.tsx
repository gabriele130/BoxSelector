import { useState } from "react";
import { useLocation } from "wouter";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { ProgressStepper } from "@/components/ProgressStepper";
import { WasteTypeCard } from "@/components/WasteTypeCard";
import { HeavyWasteModal } from "@/components/HeavyWasteModal";
import { useBooking } from "@/contexts/BookingContext";
import { Button } from "@/components/ui/button";
import { Info, ArrowLeft, ArrowRight } from "lucide-react";

export default function Home() {
  const { bookingState, toggleWasteType, setCurrentStep } = useBooking();
  const [isHeavyWasteModalOpen, setIsHeavyWasteModalOpen] = useState(false);
  const [, setLocation] = useLocation();

  const handleContinue = () => {
    if (bookingState.selectedWasteTypes.includes("construction") || 
        bookingState.selectedWasteTypes.includes("garden")) {
      setIsHeavyWasteModalOpen(true);
    } else {
      // Set current step and navigate to skip selection
      setCurrentStep(3);
      setLocation("/select-skip");
    }
  };

  const handleModalClose = () => {
    setIsHeavyWasteModalOpen(false);
  };

  const handleModalConfirm = () => {
    setIsHeavyWasteModalOpen(false);
    // Set current step and navigate to skip selection
    setCurrentStep(3);
    setLocation("/select-skip");
  };

  const handleGoBack = () => {
    setCurrentStep(1); // Go back to postcode step
  };

  return (
    <div className="min-h-screen flex flex-col bg-black">
      <Header />
      
      <main className="flex-grow">
        <div className="container mx-auto px-4 py-6 max-w-6xl">
          <ProgressStepper currentStep={bookingState.currentStep} />
          
          <div className="mt-12">
            <h2 className="text-2xl font-semibold text-center mb-6 text-white">
              Which type of waste best describes what you are disposing of?
            </h2>
            
            {/* Information Panel */}
            <div className="bg-gray-900 border border-gray-700 rounded-lg p-4 mb-8">
              <div className="flex items-start">
                <div className="flex-shrink-0 mt-0.5">
                  <Info className="h-5 w-5 text-primary" />
                </div>
                <div className="ml-3">
                  <p className="text-sm text-white">
                    You can select multiple waste types. Some items may require special handling:
                  </p>
                  <ul className="mt-2 text-sm text-white list-disc list-inside space-y-1">
                    <li>Plasterboard and drywall materials</li>
                    <li>Heavy construction materials (soil, concrete, etc.)</li>
                  </ul>
                </div>
              </div>
            </div>
            
            {/* Waste Type Selection Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
              <WasteTypeCard
                type="household"
                title="Household Waste"
                description="General household items and furniture"
                icon="home"
                examples={[
                  "Furniture",
                  "Appliances",
                  "Garden waste",
                  "General household items"
                ]}
                isSelected={bookingState.selectedWasteTypes.includes("household")}
                onToggle={() => toggleWasteType("household")}
              />
              
              <WasteTypeCard
                type="construction"
                title="Construction Waste"
                description="Building materials and renovation debris"
                icon="building"
                examples={[
                  "Bricks",
                  "Concrete",
                  "Timber",
                  "Plasterboard"
                ]}
                isSelected={bookingState.selectedWasteTypes.includes("construction")}
                onToggle={() => toggleWasteType("construction")}
              />
              
              <WasteTypeCard
                type="garden"
                title="Garden Waste"
                description="Green waste and landscaping materials"
                icon="plant"
                examples={[
                  "Soil",
                  "Plants",
                  "Branches",
                  "Grass cuttings"
                ]}
                isSelected={bookingState.selectedWasteTypes.includes("garden")}
                onToggle={() => toggleWasteType("garden")}
              />
              
              <WasteTypeCard
                type="commercial"
                title="Commercial Waste"
                description="Business and office clearance"
                icon="store"
                examples={[
                  "Office furniture",
                  "Equipment",
                  "Shop fittings",
                  "Commercial debris"
                ]}
                isSelected={bookingState.selectedWasteTypes.includes("commercial")}
                onToggle={() => toggleWasteType("commercial")}
              />
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
              >
                Continue <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </div>
          </div>
        </div>
      </main>
      
      <HeavyWasteModal
        isOpen={isHeavyWasteModalOpen}
        onClose={handleModalClose}
        onConfirm={handleModalConfirm}
      />
      
      <Footer />
    </div>
  );
}
