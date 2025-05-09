import { HeavyWastePercentage } from "@/contexts/BookingContext";
import { getPublicAssetUrl, createSvgFallback } from "@/public-path-fix";

// Definisci i percorsi statici alle immagini
const heavyWasteImagePaths: Record<Exclude<HeavyWastePercentage, 'No heavy waste'>, string> = {
  "Up to 5%": "/attached_assets/heavywaste-up-to-5.png",
  "5-20%": "/attached_assets/heavywaste-5-to-20.png",
  "Over 20%": "/attached_assets/heavywaste-over20.png"
};

// Funzione per ottenere l'URL dell'immagine in base alla percentuale
export function getHeavyWasteImagePath(percentage: HeavyWastePercentage): string {
  if (percentage === "No heavy waste") {
    // Immagine di fallback o placeholder
    return getPublicAssetUrl("/attached_assets/heavywaste-up-to-5.png");
  }
  return getPublicAssetUrl(heavyWasteImagePaths[percentage]);
}

// Fallback SVG in caso le immagini non siano disponibili
export function getHeavyWasteSvgFallback(percentage: HeavyWastePercentage): string {
  // SVG di base con testo che indica la percentuale
  const baseColor = percentage === "No heavy waste" ? "#777777" : 
                    percentage === "Up to 5%" ? "#666666" :
                    percentage === "5-20%" ? "#555555" : "#444444";
                    
  return createSvgFallback(`Heavy Waste ${percentage}`, baseColor);
}