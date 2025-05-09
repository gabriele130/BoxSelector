import { createContext, useContext, ReactNode, useState } from "react";

export type HeavyWasteType = "Soil" | "Concrete" | "Bricks" | "Tiles" | "Sand" | "Gravel" | "Rubble";
export type PlasterboardPercentage = "No plasterboard" | "Up to 5%" | "5-20%" | "more than 20%" | "I will dispose of it myself";
export type HeavyWastePercentage = "No heavy waste" | "Up to 5%" | "5-20%" | "Over 20%";
export type WasteType = "household" | "construction" | "garden" | "commercial";

interface BookingState {
  currentStep: number;
  postcode: string;
  selectedWasteTypes: WasteType[];
  heavyWasteTypes: HeavyWasteType[];
  heavyWastePercentage: HeavyWastePercentage;
  plasterboardPercentage: PlasterboardPercentage;
  skipSize: string | null;
  permitRequired: boolean;
  deliveryDate: Date | null;
  contact: {
    name: string;
    email: string;
    phone: string;
  };
  paymentDetails: {
    completed: boolean;
  };
}

interface BookingContextType {
  bookingState: BookingState;
  setCurrentStep: (step: number) => void;
  setPostcode: (postcode: string) => void;
  toggleWasteType: (wasteType: WasteType) => void;
  toggleHeavyWasteType: (wasteType: HeavyWasteType) => void;
  setHeavyWastePercentage: (percentage: HeavyWastePercentage) => void;
  setPlasterboardPercentage: (percentage: PlasterboardPercentage) => void;
  setSkipSize: (size: string) => void;
  setPermitRequired: (required: boolean) => void;
  setDeliveryDate: (date: Date) => void;
  setContact: (contact: BookingState["contact"]) => void;
  setPaymentCompleted: (completed: boolean) => void;
}

const initialState: BookingState = {
  currentStep: 2, // Start at waste type selection
  postcode: "SW1A 1AA", // Default for testing
  selectedWasteTypes: [],
  heavyWasteTypes: [],
  heavyWastePercentage: "No heavy waste",
  plasterboardPercentage: "No plasterboard",
  skipSize: null,
  permitRequired: false,
  deliveryDate: null,
  contact: {
    name: "",
    email: "",
    phone: ""
  },
  paymentDetails: {
    completed: false
  }
};

const BookingContext = createContext<BookingContextType | undefined>(undefined);

export function BookingProvider({ children }: { children: ReactNode }) {
  const [bookingState, setBookingState] = useState<BookingState>(initialState);
  
  const setCurrentStep = (step: number) => {
    setBookingState(prev => ({ ...prev, currentStep: step }));
  };
  
  const setPostcode = (postcode: string) => {
    setBookingState(prev => ({ ...prev, postcode }));
  };
  
  const toggleWasteType = (wasteType: WasteType) => {
    setBookingState(prev => {
      const exists = prev.selectedWasteTypes.includes(wasteType);
      const selectedWasteTypes = exists
        ? prev.selectedWasteTypes.filter(type => type !== wasteType)
        : [...prev.selectedWasteTypes, wasteType];
      
      return {
        ...prev,
        selectedWasteTypes
      };
    });
  };
  
  const toggleHeavyWasteType = (wasteType: HeavyWasteType) => {
    setBookingState(prev => {
      const exists = prev.heavyWasteTypes.includes(wasteType);
      const heavyWasteTypes = exists
        ? prev.heavyWasteTypes.filter(type => type !== wasteType)
        : [...prev.heavyWasteTypes, wasteType];
      
      return {
        ...prev,
        heavyWasteTypes
      };
    });
  };
  
  const setHeavyWastePercentage = (percentage: HeavyWastePercentage) => {
    setBookingState(prev => ({ ...prev, heavyWastePercentage: percentage }));
  };
  
  const setPlasterboardPercentage = (percentage: PlasterboardPercentage) => {
    setBookingState(prev => ({ ...prev, plasterboardPercentage: percentage }));
  };
  
  const setSkipSize = (size: string) => {
    setBookingState(prev => ({ ...prev, skipSize: size }));
  };
  
  const setPermitRequired = (required: boolean) => {
    setBookingState(prev => ({ ...prev, permitRequired: required }));
  };
  
  const setDeliveryDate = (date: Date) => {
    setBookingState(prev => ({ ...prev, deliveryDate: date }));
  };
  
  const setContact = (contact: BookingState["contact"]) => {
    setBookingState(prev => ({ ...prev, contact }));
  };
  
  const setPaymentCompleted = (completed: boolean) => {
    setBookingState(prev => ({
      ...prev,
      paymentDetails: { ...prev.paymentDetails, completed }
    }));
  };
  
  return (
    <BookingContext.Provider value={{
      bookingState,
      setCurrentStep,
      setPostcode,
      toggleWasteType,
      toggleHeavyWasteType,
      setHeavyWastePercentage,
      setPlasterboardPercentage,
      setSkipSize,
      setPermitRequired,
      setDeliveryDate,
      setContact,
      setPaymentCompleted
    }}>
      {children}
    </BookingContext.Provider>
  );
}

export function useBooking() {
  const context = useContext(BookingContext);
  if (context === undefined) {
    throw new Error("useBooking must be used within a BookingProvider");
  }
  return context;
}