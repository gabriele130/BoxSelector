import { Button } from "@/components/ui/button";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { useBooking } from "@/contexts/BookingContext";

interface FooterProps {
  onBack?: () => void;
  onContinue?: () => void;
  disableContinue?: boolean;
}

export function Footer({ onBack, onContinue, disableContinue = false }: FooterProps) {
  const { bookingState } = useBooking();
  
  // Determina quali tipi di rifiuti sono selezionati e crea il testo di riepilogo
  const getSelectedWasteText = () => {
    const { selectedWasteTypes } = bookingState;
    
    if (selectedWasteTypes.length === 0) {
      return "No waste types selected";
    }
    
    const wasteTypeNames = {
      household: "Household Waste",
      construction: "Construction Waste",
      garden: "Garden Waste",
      commercial: "Commercial Waste"
    };
    
    const firstTypes = selectedWasteTypes.slice(0, 2).map(type => wasteTypeNames[type as keyof typeof wasteTypeNames]);
    const moreCount = Math.max(0, selectedWasteTypes.length - 2);
    
    let text = firstTypes.join(", ");
    if (moreCount > 0) {
      text += ` and ${moreCount} more`;
    }
    
    return text;
  };
  
  return (
    <div className="fixed bottom-0 left-0 right-0 bg-black border-t border-gray-800 py-4 px-4">
      <div className="container mx-auto max-w-6xl">
        <div className="flex justify-between items-center">
          <div>
            <h2 className="text-white font-semibold text-lg">Selected Waste Types</h2>
            <p className="text-gray-400 text-sm">{getSelectedWasteText()}</p>
          </div>
          <div className="flex gap-2">
            {onBack && (
              <Button
                variant="outline"
                className="bg-transparent text-white border-gray-700 hover:bg-gray-800"
                onClick={onBack}
              >
                Back
              </Button>
            )}
            
            {onContinue && (
              <Button 
                className="bg-blue-600 hover:bg-blue-700 flex items-center"
                onClick={onContinue}
                disabled={disableContinue}
              >
                Continue <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
