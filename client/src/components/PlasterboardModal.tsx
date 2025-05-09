import { ArrowRight, Info } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { useBooking } from "../contexts/BookingContext";
import { useState } from "react";

// Import image paths for plasterboard visual representations
import plasterboardImage from "@assets/heavywaste-up-to-5.png";

interface PlasterboardModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
}

export function PlasterboardModal({ isOpen, onClose, onConfirm }: PlasterboardModalProps) {
  const { bookingState, setPlasterboardPercentage } = useBooking();
  
  // Define percentage options
  const percentageOptions = [
    "No plasterboard",
    "Up to 5%",
    "5-20%",
    "more than 20%",
    "I will dispose of it myself"
  ] as const;
  
  // Handle percentage selection
  const handlePercentageSelect = (percentage: typeof percentageOptions[number]) => {
    setPlasterboardPercentage(percentage);
  };
  
  return (
    <Dialog open={isOpen} onOpenChange={(open) => !open && onClose()}>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto sm:max-w-[600px] bg-black text-white border border-gray-800">
        <DialogHeader className="border-b border-gray-800 pb-4">
          <DialogTitle className="text-xl font-semibold text-white">Plasterboard Disposal</DialogTitle>
          <DialogDescription className="text-gray-400">
            Select the plasterboard percentage in your waste
          </DialogDescription>
        </DialogHeader>
        
        <div className="py-4">
          {/* Important Notice */}
          <div className="bg-amber-900/30 border border-amber-600 rounded-lg p-4 mb-6">
            <div className="flex">
              <div className="flex-shrink-0">
                <Info className="h-5 w-5 text-amber-500" />
              </div>
              <div className="ml-3">
                <p className="text-sm font-medium text-white">Important Notice</p>
                <p className="text-sm text-white mt-1">
                  Plasterboard must be disposed of separately from general waste due to environmental regulations. Please indicate the approximate percentage of plasterboard in your waste.
                </p>
              </div>
            </div>
          </div>
          
          {/* Percentage Selection */}
          <div className="flex flex-wrap gap-2 mb-6">
            {percentageOptions.map((option) => (
              <Button
                key={option}
                variant={bookingState.plasterboardPercentage === option ? "default" : "outline"}
                className={`
                  ${bookingState.plasterboardPercentage === option 
                    ? "bg-blue-600 hover:bg-blue-700 text-white" 
                    : "bg-transparent border-gray-700 text-white hover:bg-gray-800"}
                `}
                onClick={() => handlePercentageSelect(option)}
              >
                {option}
              </Button>
            ))}
          </div>
          
          {/* Additional Information - Tonnage bag */}
          {bookingState.plasterboardPercentage !== "No plasterboard" && 
           bookingState.plasterboardPercentage !== "I will dispose of it myself" && (
            <div className="text-sm text-gray-400 mb-6">
              Includes 1 Tonne Bag (£30)
            </div>
          )}
          
          {/* Visual representation */}
          {bookingState.plasterboardPercentage !== "No plasterboard" && 
           bookingState.plasterboardPercentage !== "I will dispose of it myself" && (
            <div className="mb-6">
              <label className="block text-sm font-medium mb-3 text-white">Visual representation:</label>
              <div className="bg-white rounded-lg overflow-hidden">
                <div className="relative py-4">
                  <img 
                    src={plasterboardImage}
                    alt={`Skip with ${bookingState.plasterboardPercentage} plasterboard`}
                    className="max-w-[250px] h-auto mx-auto"
                  />
                  <div className="absolute top-2 right-2 bg-blue-600 text-white text-xs px-2 py-1 rounded-full">
                    {bookingState.plasterboardPercentage}
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
        
        {/* Fixed footer with buttons */}
        <div className="sticky bottom-0 flex justify-end gap-2 items-center p-4 bg-black border-t border-gray-800">
          <Button 
            variant="outline" 
            className="bg-transparent text-white border-gray-700 hover:bg-gray-800"
            onClick={onClose}
          >
            Back
          </Button>
          <Button 
            className="bg-blue-600 hover:bg-blue-700 flex items-center"
            onClick={onConfirm}
          >
            Continue <ArrowRight className="ml-2 h-4 w-4" />
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}