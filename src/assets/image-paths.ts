import { HeavyWastePercentage } from "@/contexts/BookingContext";

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
    return "/attached_assets/heavywaste-up-to-5.png"; 
  }
  return heavyWasteImagePaths[percentage];
}

// Fallback SVG in caso le immagini non siano disponibili
export function getHeavyWasteSvgFallback(percentage: HeavyWastePercentage): string {
  // SVG di base con testo che indica la percentuale
  const baseColor = percentage === "No heavy waste" ? "#777777" : 
                    percentage === "Up to 5%" ? "#666666" :
                    percentage === "5-20%" ? "#555555" : "#444444";
                    
  return `data:image/svg+xml,%3Csvg width='200' height='100' xmlns='http://www.w3.org/2000/svg'%3E%3Crect width='198' height='98' x='1' y='1' stroke='%23333' fill='${baseColor}' stroke-width='2' rx='5' ry='5'/%3E%3Ctext x='50' y='50' font-family='Arial' font-size='16' fill='white'%3E${percentage}%3C/text%3E%3C/svg%3E`;
}