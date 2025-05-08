import { HeavyWastePercentage } from "@/contexts/BookingContext";

// Importa le immagini degli skip direttamente nel codice come Base64
// Esempi di skip con diversi livelli di rifiuti pesanti
export const skipImagesBase64: Record<Exclude<HeavyWastePercentage, 'No heavy waste'>, string> = {
  "Up to 5%": `data:image/svg+xml,
    <svg width="400" height="200" xmlns="http://www.w3.org/2000/svg">
      <rect width="400" height="180" x="0" y="20" fill="#F9B233" stroke="#333" stroke-width="4" />
      <polygon points="0,20 50,0 350,0 400,20" fill="#333" />
      <g transform="translate(20, 40)">
        <circle cx="80" cy="80" r="25" fill="#4a7c59" />
        <rect x="150" y="70" width="40" height="40" fill="#444" />
        <polygon points="220,60 240,80 220,100" fill="#4a7c59" />
        <circle cx="280" cy="75" r="20" fill="#444" />
      </g>
      <text x="350" y="40" fill="#fff" font-family="Arial" font-size="14" font-weight="bold">Up to 5%</text>
    </svg>`,
  "5-20%": `data:image/svg+xml,
    <svg width="400" height="200" xmlns="http://www.w3.org/2000/svg">
      <rect width="400" height="180" x="0" y="20" fill="#F9B233" stroke="#333" stroke-width="4" />
      <polygon points="0,20 50,0 350,0 400,20" fill="#333" />
      <g transform="translate(20, 40)">
        <circle cx="50" cy="60" r="25" fill="#4a7c59" />
        <rect x="90" y="40" width="40" height="40" fill="#444" />
        <circle cx="160" cy="60" r="20" fill="#777" />
        <rect x="190" y="50" width="50" height="30" fill="#444" />
        <polygon points="260,40 290,50 260,70" fill="#4a7c59" />
        <circle cx="310" cy="55" r="30" fill="#444" />
      </g>
      <text x="350" y="40" fill="#fff" font-family="Arial" font-size="14" font-weight="bold">5-20%</text>
    </svg>`,
  "Over 20%": `data:image/svg+xml,
    <svg width="400" height="200" xmlns="http://www.w3.org/2000/svg">
      <rect width="400" height="180" x="0" y="20" fill="#F9B233" stroke="#333" stroke-width="4" />
      <polygon points="0,20 50,0 350,0 400,20" fill="#333" />
      <g transform="translate(20, 40)">
        <rect x="10" y="20" width="60" height="50" fill="#444" />
        <circle cx="100" cy="40" r="30" fill="#4a7c59" />
        <rect x="140" y="30" width="70" height="60" fill="#444" />
        <circle cx="240" cy="45" r="35" fill="#777" />
        <rect x="280" y="25" width="60" height="65" fill="#444" />
      </g>
      <text x="350" y="40" fill="#fff" font-family="Arial" font-size="14" font-weight="bold">Over 20%</text>
    </svg>`
};

export const getSkipImageForPercentage = (percentage: HeavyWastePercentage): string => {
  if (percentage === "No heavy waste") {
    return "";
  }
  return skipImagesBase64[percentage];
};