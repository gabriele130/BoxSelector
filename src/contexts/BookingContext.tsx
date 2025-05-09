import { createContext, useContext, ReactNode, useState, useCallback } from "react";

/**
 * Type definitions for waste-related data
 */
export type HeavyWasteType = "Soil" | "Concrete" | "Bricks" | "Tiles" | "Sand" | "Gravel" | "Rubble";
export type PlasterboardPercentage = "No plasterboard" | "Up to 5%" | "5-20%" | "more than 20%" | "I will dispose of it myself";
export type HeavyWastePercentage = "No heavy waste" | "Up to 5%" | "5-20%" | "Over 20%";
export type WasteType = "household" | "construction" | "garden" | "commercial";

/**
 * The complete state structure for the booking process
 */
interface BookingState {
  /** Current step in the booking wizard (1: postcode, 2: waste type, 3: skip selection, etc.) */
  currentStep: number;
  
  /** User's postcode for delivery location */
  postcode: string;
  
  /** Array of selected waste types */
  selectedWasteTypes: WasteType[];
  
  /** Array of selected heavy waste types */
  heavyWasteTypes: HeavyWasteType[];
  
  /** Selected percentage of heavy waste in the load */
  heavyWastePercentage: HeavyWastePercentage;
  
  /** Selected percentage of plasterboard in the load */
  plasterboardPercentage: PlasterboardPercentage;
  
  /** Selected skip size ID */
  skipSize: string | null;
  
  /** Whether a permit is required for the skip placement */
  permitRequired: boolean;
  
  /** Selected delivery date */
  deliveryDate: Date | null;
  
  /** Customer contact information */
  contact: {
    name: string;
    email: string;
    phone: string;
  };
  
  /** Payment completion status */
  paymentDetails: {
    completed: boolean;
  };
}

/**
 * The context interface with all state manipulation methods
 */
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

/**
 * Initial state for the booking process
 */
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

// Create the context with undefined default value
const BookingContext = createContext<BookingContextType | undefined>(undefined);

/**
 * Provider component that wraps the application and provides booking state
 * @param children - Child components that will have access to the context
 */
export function BookingProvider({ children }: { children: ReactNode }) {
  const [bookingState, setBookingState] = useState<BookingState>(initialState);
  
  /**
   * Updates the current step in the booking wizard
   * @param step - The new step number
   */
  const setCurrentStep = useCallback((step: number) => {
    setBookingState(prev => ({ ...prev, currentStep: step }));
  }, []);
  
  /**
   * Updates the postcode for delivery
   * @param postcode - The new postcode value
   */
  const setPostcode = useCallback((postcode: string) => {
    setBookingState(prev => ({ ...prev, postcode }));
  }, []);
  
  /**
   * Toggles a waste type selection (adds if not present, removes if present)
   * @param wasteType - The waste type to toggle
   */
  const toggleWasteType = useCallback((wasteType: WasteType) => {
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
  }, []);
  
  /**
   * Toggles a heavy waste type selection (adds if not present, removes if present)
   * @param wasteType - The heavy waste type to toggle
   */
  const toggleHeavyWasteType = useCallback((wasteType: HeavyWasteType) => {
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
  }, []);
  
  /**
   * Sets the percentage of heavy waste in the load
   * @param percentage - The new heavy waste percentage
   */
  const setHeavyWastePercentage = useCallback((percentage: HeavyWastePercentage) => {
    setBookingState(prev => ({ ...prev, heavyWastePercentage: percentage }));
  }, []);
  
  /**
   * Sets the percentage of plasterboard in the load
   * @param percentage - The new plasterboard percentage
   */
  const setPlasterboardPercentage = useCallback((percentage: PlasterboardPercentage) => {
    setBookingState(prev => ({ ...prev, plasterboardPercentage: percentage }));
  }, []);
  
  /**
   * Sets the selected skip size
   * @param size - The ID of the selected skip size
   */
  const setSkipSize = useCallback((size: string) => {
    setBookingState(prev => ({ ...prev, skipSize: size }));
  }, []);
  
  /**
   * Sets whether a permit is required for skip placement
   * @param required - Whether a permit is required
   */
  const setPermitRequired = useCallback((required: boolean) => {
    setBookingState(prev => ({ ...prev, permitRequired: required }));
  }, []);
  
  /**
   * Sets the delivery date
   * @param date - The selected delivery date
   */
  const setDeliveryDate = useCallback((date: Date) => {
    setBookingState(prev => ({ ...prev, deliveryDate: date }));
  }, []);
  
  /**
   * Updates the contact information
   * @param contact - The new contact information object
   */
  const setContact = useCallback((contact: BookingState["contact"]) => {
    setBookingState(prev => ({ ...prev, contact }));
  }, []);
  
  /**
   * Sets the payment completion status
   * @param completed - Whether payment has been completed
   */
  const setPaymentCompleted = useCallback((completed: boolean) => {
    setBookingState(prev => ({
      ...prev,
      paymentDetails: { ...prev.paymentDetails, completed }
    }));
  }, []);
  
  // Create the context value object with memoized methods for better performance
  const contextValue = {
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
  };
  
  return (
    <BookingContext.Provider value={contextValue}>
      {children}
    </BookingContext.Provider>
  );
}

/**
 * Custom hook to access the booking context
 * @throws Error if used outside of a BookingProvider
 * @returns The booking context with state and methods
 */
export function useBooking() {
  const context = useContext(BookingContext);
  if (context === undefined) {
    throw new Error("useBooking must be used within a BookingProvider");
  }
  return context;
}