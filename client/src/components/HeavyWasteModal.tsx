import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { AlertTriangle, Info, X } from "lucide-react";
import { useBooking, HeavyWasteType, HeavyWastePercentage } from "@/contexts/BookingContext";

interface HeavyWasteModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
}

export function HeavyWasteModal({ isOpen, onClose, onConfirm }: HeavyWasteModalProps) {
  const { bookingState, toggleHeavyWasteType, setHeavyWastePercentage } = useBooking();

  const heavyWasteTypes: HeavyWasteType[] = [
    "Soil", "Concrete", "Bricks", "Tiles", "Sand", "Gravel", "Rubble"
  ];

  const percentageOptions: HeavyWastePercentage[] = [
    "No heavy waste", "Up to 5%", "5-20%", "Over 20%"
  ];

  const handleHeavyWasteTypeToggle = (wasteType: HeavyWasteType) => {
    toggleHeavyWasteType(wasteType);
  };

  const handlePercentageSelect = (percentage: HeavyWastePercentage) => {
    setHeavyWastePercentage(percentage);
  };

  // Get summary text based on current selections
  const getSummaryText = () => {
    if (bookingState.heavyWastePercentage === "No heavy waste") {
      return "No heavy waste in your skip";
    }
    
    const heavyWasteCount = bookingState.heavyWasteTypes.length;
    const percentageText = bookingState.heavyWastePercentage;
    
    if (heavyWasteCount === 0) {
      return `${percentageText} heavy waste selected`;
    }
    
    const typesList = bookingState.heavyWasteTypes.join(", ");
    return `${percentageText} ${typesList} in your skip`;
  };

  return (
    <Dialog open={isOpen} onOpenChange={(open) => !open && onClose()}>
      <DialogContent className="bg-gray-900 border-gray-800 sm:max-w-2xl">
        <DialogHeader>
          <div className="flex justify-between items-center">
            <DialogTitle className="text-xl font-bold">Heavy Waste Types</DialogTitle>
            <Button variant="ghost" size="icon" onClick={onClose}>
              <X className="h-5 w-5 text-gray-400 hover:text-white" />
            </Button>
          </div>
        </DialogHeader>
        
        {/* Warning Notice */}
        <div className="bg-amber-900/30 border-l-4 border-amber-500 p-4 mb-6 rounded">
          <div className="flex">
            <div className="flex-shrink-0">
              <AlertTriangle className="h-5 w-5 text-amber-500" />
            </div>
            <div className="ml-3">
              <p className="text-sm text-amber-200">
                Heavy waste types have specific requirements and restrictions. Some skip sizes may not be available for heavy waste disposal.
              </p>
            </div>
          </div>
        </div>
        
        {/* Heavy Waste Type Selection */}
        <div className="mb-6">
          <label className="block text-sm font-medium mb-3">Select heavy waste types:</label>
          <div className="flex flex-wrap gap-2">
            {heavyWasteTypes.map((wasteType) => (
              <Button
                key={wasteType}
                variant={
                  bookingState.heavyWasteTypes.includes(wasteType)
                    ? "default"
                    : "outline"
                }
                className={`px-4 py-2 rounded-full text-sm ${
                  bookingState.heavyWasteTypes.includes(wasteType)
                    ? "bg-primary text-white"
                    : "bg-gray-800 hover:bg-gray-700 text-gray-300"
                }`}
                onClick={() => handleHeavyWasteTypeToggle(wasteType)}
              >
                {wasteType}
              </Button>
            ))}
          </div>
        </div>
        
        {/* Percentage Selection */}
        <div className="mb-6">
          <label className="block text-sm font-medium mb-3">Approximate percentage of heavy waste:</label>
          <div className="flex flex-wrap gap-2">
            {percentageOptions.map((percentage) => (
              <Button
                key={percentage}
                variant={
                  bookingState.heavyWastePercentage === percentage
                    ? "default"
                    : "outline"
                }
                className={`px-4 py-2 rounded-full text-sm ${
                  bookingState.heavyWastePercentage === percentage
                    ? "bg-primary-700 text-white"
                    : "bg-gray-800 hover:bg-gray-700 text-gray-300"
                }`}
                onClick={() => handlePercentageSelect(percentage)}
              >
                {percentage}
              </Button>
            ))}
          </div>
        </div>
        
        {/* Info Notice */}
        <div className="bg-primary-900/30 border border-primary-800 rounded-lg p-4 mb-6">
          <div className="flex">
            <div className="flex-shrink-0">
              <Info className="h-5 w-5 text-primary-400" />
            </div>
            <div className="ml-3">
              <p className="text-sm text-gray-300">Skip Size Restrictions</p>
              <p className="text-xs text-gray-400 mt-1">
                For safety reasons, heavy waste can only be disposed of in skips up to 8 yards. Larger skips will not be available if heavy waste is selected.
              </p>
            </div>
          </div>
        </div>
        
        {/* Current Selection Status */}
        <div className="text-sm text-gray-400 mb-6">{getSummaryText()}</div>
        
        {/* Action Buttons */}
        <DialogFooter>
          <Button
            variant="outline"
            className="px-4 py-2 border border-gray-700 rounded-md text-gray-300 hover:bg-gray-800"
            onClick={onClose}
          >
            Cancel
          </Button>
          <Button
            className="px-4 py-2 bg-primary-600 rounded-md text-white hover:bg-primary-500"
            onClick={onConfirm}
          >
            Confirm Selection
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
