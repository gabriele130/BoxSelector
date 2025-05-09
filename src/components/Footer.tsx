import { Button } from "@/components/ui/button";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { useBooking } from "@/contexts/BookingContext";
import { useMemo } from "react";

/**
 * Props for the Footer component
 * @property onBack - Optional callback for back button
 * @property onContinue - Optional callback for continue button
 * @property disableContinue - Whether to disable the continue button
 */
interface FooterProps {
  onBack?: () => void;
  onContinue?: () => void;
  disableContinue?: boolean;
}

/**
 * Footer component that displays navigation buttons and selected waste types
 * Appears fixed at the bottom of each page in the booking flow
 * 
 * @param onBack - Callback for the back button
 * @param onContinue - Callback for the continue button
 * @param disableContinue - Whether to disable the continue button (default: false)
 */
export function Footer({ onBack, onContinue, disableContinue = false }: FooterProps) {
  const { bookingState } = useBooking();
  
  /**
   * Generates a summary text of selected waste types
   * Shows up to 2 types directly, then summarizes additional types
   * Uses memoization to prevent recalculation on every render
   */
  const selectedWasteText = useMemo(() => {
    const { selectedWasteTypes } = bookingState;
    
    if (selectedWasteTypes.length === 0) {
      return "No waste types selected";
    }
    
    // Map waste type IDs to display names
    const wasteTypeNames = {
      household: "Household Waste",
      construction: "Construction Waste",
      garden: "Garden Waste",
      commercial: "Commercial Waste"
    };
    
    // Display only first 2 types directly
    const firstTypes = selectedWasteTypes.slice(0, 2).map(
      type => wasteTypeNames[type as keyof typeof wasteTypeNames]
    );
    const moreCount = Math.max(0, selectedWasteTypes.length - 2);
    
    let text = firstTypes.join(", ");
    if (moreCount > 0) {
      text += ` and ${moreCount} more`;
    }
    
    return text;
  }, [bookingState.selectedWasteTypes]);
  
  return (
    <div className="fixed bottom-0 left-0 right-0 bg-black border-t border-gray-800 py-4 px-4 z-10">
      <div className="container mx-auto max-w-6xl">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
          {/* Selected waste types summary */}
          <div>
            <h2 className="text-white font-semibold text-lg">Selected Waste Types</h2>
            <p className="text-gray-400 text-sm">{selectedWasteText}</p>
          </div>
          
          {/* Navigation buttons */}
          <div className="flex gap-2 self-end sm:self-auto">
            {onBack && (
              <Button
                variant="outline"
                className="bg-transparent text-white border-gray-700 hover:bg-gray-800 transition-colors"
                onClick={onBack}
                aria-label="Go back to previous step"
              >
                <ArrowLeft className="mr-2 h-4 w-4 sm:hidden" />
                <span>Back</span>
              </Button>
            )}
            
            {onContinue && (
              <Button 
                className="bg-blue-600 hover:bg-blue-700 flex items-center transition-colors"
                onClick={onContinue}
                disabled={disableContinue}
                aria-label="Continue to next step"
                aria-disabled={disableContinue}
              >
                <span>Continue</span>
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
