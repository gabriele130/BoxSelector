import { HeavyWastePercentage } from "@/contexts/BookingContext";

// Mappings for skip images by percentage
export const skipImagesBase64: Record<Exclude<HeavyWastePercentage, 'No heavy waste'>, string> = {
  "Up to 5%": "heavywaste-up-to-5.png",
  "5-20%": "heavywaste-5-to-20.png",
  "Over 20%": "heavywaste-over20.png"
};

// Function to get skip image based on heavy waste percentage
export const getSkipImageForPercentage = (percentage: HeavyWastePercentage): string => {
  if (percentage === 'No heavy waste') {
    return ''; // Return empty string or default image
  }
  
  // Return the path to the image in assets folder
  return `/src/assets/images/${skipImagesBase64[percentage]}`;
};