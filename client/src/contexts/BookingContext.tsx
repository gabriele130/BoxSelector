import { createContext, useContext, useState, ReactNode } from "react";

export type HeavyWasteType = "Soil" | "Concrete" | "Bricks" | "Tiles" | "Sand" | "Gravel" | "Rubble";
export type HeavyWastePercentage = "No heavy waste" | "Up to 5%" | "5-20%" | "Over 20%";
export type WasteType = "household" | "construction" | "garden" | "commercial";

interface BookingState {
  currentStep: number;
  postcode: string;
  selectedWasteTypes: WasteType[];
  heavyWasteTypes: HeavyWasteType[];
  heavyWastePercentage: HeavyWastePercentage;
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
  setSkipSize: (size: string) => void;
  setPermitRequired: (required: boolean) => void;
  setDeliveryDate: (date: Date) => void;
  setContact: (contact: BookingState["contact"]) => void;
  setPaymentCompleted: (completed: boolean) => void;
}

const initialState: BookingState = {
  currentStep: 2, // Starting at waste type selection step
  postcode: "",
  selectedWasteTypes: ["garden"], // Initialize with garden selected as per design
  heavyWasteTypes: [],
  heavyWastePercentage: "No heavy waste",
  skipSize: null,
  permitRequired: false,
  deliveryDate: null,
  contact: {
    name: "",
    email: "",
    phone: "",
  },
  paymentDetails: {
    completed: false,
  },
};

const BookingContext = createContext<BookingContextType | undefined>(undefined);

export function BookingProvider({ children }: { children: ReactNode }) {
  const [bookingState, setBookingState] = useState<BookingState>(initialState);

  const setCurrentStep = (step: number) => {
    setBookingState((prev) => ({ ...prev, currentStep: step }));
  };

  const setPostcode = (postcode: string) => {
    setBookingState((prev) => ({ ...prev, postcode }));
  };

  const toggleWasteType = (wasteType: WasteType) => {
    setBookingState((prev) => {
      const isSelected = prev.selectedWasteTypes.includes(wasteType);
      const updatedTypes = isSelected
        ? prev.selectedWasteTypes.filter((type) => type !== wasteType)
        : [...prev.selectedWasteTypes, wasteType];
      return { ...prev, selectedWasteTypes: updatedTypes };
    });
  };

  const toggleHeavyWasteType = (wasteType: HeavyWasteType) => {
    setBookingState((prev) => {
      const isSelected = prev.heavyWasteTypes.includes(wasteType);
      const updatedTypes = isSelected
        ? prev.heavyWasteTypes.filter((type) => type !== wasteType)
        : [...prev.heavyWasteTypes, wasteType];
      return { ...prev, heavyWasteTypes: updatedTypes };
    });
  };

  const setHeavyWastePercentage = (percentage: HeavyWastePercentage) => {
    setBookingState((prev) => ({ ...prev, heavyWastePercentage: percentage }));
  };

  const setSkipSize = (size: string) => {
    setBookingState((prev) => ({ ...prev, skipSize: size }));
  };

  const setPermitRequired = (required: boolean) => {
    setBookingState((prev) => ({ ...prev, permitRequired: required }));
  };

  const setDeliveryDate = (date: Date) => {
    setBookingState((prev) => ({ ...prev, deliveryDate: date }));
  };

  const setContact = (contact: BookingState["contact"]) => {
    setBookingState((prev) => ({ ...prev, contact }));
  };

  const setPaymentCompleted = (completed: boolean) => {
    setBookingState((prev) => ({
      ...prev,
      paymentDetails: { ...prev.paymentDetails, completed },
    }));
  };

  const value = {
    bookingState,
    setCurrentStep,
    setPostcode,
    toggleWasteType,
    toggleHeavyWasteType,
    setHeavyWastePercentage,
    setSkipSize,
    setPermitRequired,
    setDeliveryDate,
    setContact,
    setPaymentCompleted,
  };

  return <BookingContext.Provider value={value}>{children}</BookingContext.Provider>;
}

export function useBooking() {
  const context = useContext(BookingContext);
  if (context === undefined) {
    throw new Error("useBooking must be used within a BookingProvider");
  }
  return context;
}
