import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter, DialogDescription } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { AlertTriangle, Info, X } from "lucide-react";
import { useBooking, HeavyWasteType, HeavyWastePercentage } from "@/contexts/BookingContext";
import { useState } from "react";
import { getSkipImageForPercentage } from "@/assets/skip-images";

interface HeavyWasteModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
}

// Descrizioni dettagliate dei tipi di rifiuti pesanti
const heavyWasteDescriptions: Record<HeavyWasteType, string> = {
  "Soil": "Including topsoil and subsoil",
  "Concrete": "Blocks, slabs, and foundations",
  "Bricks": "Whole or broken bricks",
  "Tiles": "Ceramic, porcelain, or stone tiles",
  "Sand": "Building or garden sand",
  "Gravel": "Stone and aggregate",
  "Rubble": "Mixed building debris"
};

// Descrizioni per le percentuali
const percentageDescriptions: Record<HeavyWastePercentage, string> = {
  "No heavy waste": "No heavy waste in your skip",
  "Up to 5%": "A small amount of heavy waste",
  "5-20%": "A moderate amount of heavy waste",
  "Over 20%": "A large amount of heavy waste"
};

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
      <DialogContent className="bg-black border-gray-800 sm:max-w-2xl">
        <DialogHeader>
          <div className="flex justify-between items-center">
            <div>
              <DialogTitle className="text-xl font-bold text-white">Heavy Waste Types</DialogTitle>
              <DialogDescription className="text-sm text-gray-400">
                Specify the types and amount of heavy waste in your skip
              </DialogDescription>
            </div>
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
              <p className="text-sm text-white">
                Heavy waste types have specific requirements and restrictions. Some skip sizes may not be available for heavy waste disposal.
              </p>
            </div>
          </div>
        </div>
        
        {/* Heavy Waste Type Selection */}
        <div className="mb-6">
          <label className="block text-sm font-medium mb-3 text-white">Select heavy waste types:</label>
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
                    : "bg-gray-800 hover:bg-gray-700 text-white"
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
          <label className="block text-sm font-medium mb-3 text-white">Approximate percentage of heavy waste:</label>
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
                    : "bg-gray-800 hover:bg-gray-700 text-white"
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
              <Info className="h-5 w-5 text-white" />
            </div>
            <div className="ml-3">
              <p className="text-sm text-white">Skip Size Restrictions</p>
              <p className="text-xs text-white mt-1">
                For safety reasons, heavy waste can only be disposed of in skips up to 8 yards. Larger skips will not be available if heavy waste is selected.
              </p>
            </div>
          </div>
        </div>
        
        {/* Percentage description */}
        {bookingState.heavyWastePercentage !== "No heavy waste" && (
          <div className="text-sm text-white mb-2">
            {percentageDescriptions[bookingState.heavyWastePercentage]}
          </div>
        )}
        
        {/* Visual representation */}
        {bookingState.heavyWastePercentage !== "No heavy waste" && (
          <div className="mb-6">
            <label className="block text-sm font-medium mb-3 text-white">Visual representation:</label>
            <div className="bg-gray-900 rounded-lg overflow-hidden">
              <div className="relative">
                <img 
                  src={getSkipImageForPercentage(bookingState.heavyWastePercentage)}
                  alt={`Skip with ${bookingState.heavyWastePercentage} heavy waste`}
                  className="w-full h-auto"
                />
                <div className="absolute top-2 right-2 bg-primary text-white text-xs px-2 py-1 rounded-full">
                  {bookingState.heavyWastePercentage}
                </div>
              </div>
            </div>
          </div>
        )}
        
        {/* Selected heavy waste types */}
        {bookingState.heavyWasteTypes.length > 0 && (
          <div className="mb-6">
            <label className="block text-sm font-medium mb-3 text-white">Selected heavy waste types:</label>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
              {bookingState.heavyWasteTypes.map(wasteType => (
                <div key={wasteType} className="bg-gray-900 rounded-lg p-3">
                  <div className="font-medium text-white">{wasteType}</div>
                  <div className="text-xs text-gray-400">{heavyWasteDescriptions[wasteType]}</div>
                </div>
              ))}
            </div>
          </div>
        )}
        
        {/* Next Step Note */}
        <div className="mb-6 bg-gray-900 p-4 rounded-lg">
          <p className="text-sm text-white">
            In the next step, you'll be able to select a skip size based on your waste type and heavy waste specifications.
          </p>
          <ul className="mt-2 text-xs text-gray-400 space-y-1 list-disc pl-4">
            <li>Skips up to 8 yards can hold heavy waste</li>
            <li>Prices vary based on skip size and waste type</li>
            <li>Skip availability depends on your location</li>
          </ul>
        </div>
        
        {/* Current Selection Status */}
        <div className="text-sm text-white mb-6">{getSummaryText()}</div>
        
        {/* Action Buttons */}
        <DialogFooter>
          <Button
            variant="outline"
            className="px-4 py-2 border border-gray-700 rounded-md text-white hover:bg-gray-800"
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