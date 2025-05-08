// API Service

// Interfaccia per i dati dello skip ricevuti dall'API
export interface ApiSkip {
  id: number;
  size: number;
  hire_period_days: number;
  transport_cost: number | null;
  per_tonne_cost: number | null;
  price_before_vat: number;
  vat: number;
  postcode: string;
  area: string;
  forbidden: boolean;
  created_at: string;
  updated_at: string;
  allowed_on_road: boolean;
  allows_heavy_waste: boolean;
}

// Interfaccia per i tipi di rifiuti pesanti
export interface HeavyWasteInfo {
  id: string;
  name: string;
  description: string;
  imageUrl?: string;
  allowedInSkips: number[]; // Array di ID skip compatibili
}

// Recupera i dati degli skip dall'API
export async function getSkipsByLocation(postcode: string, area: string): Promise<ApiSkip[]> {
  try {
    const response = await fetch(`https://app.wewantwaste.co.uk/api/skips/by-location?postcode=${postcode}&area=${area}`);
    
    if (!response.ok) {
      throw new Error(`API error: ${response.status}`);
    }
    
    return await response.json();
  } catch (error) {
    console.error("Error fetching skips:", error);
    throw error;
  }
}

// Recupera le informazioni sui tipi di rifiuti pesanti
// Nota: questa funzione usa dati temporanei che dovrebbero essere sostituiti con chiamate API reali
export async function getHeavyWasteTypes(): Promise<HeavyWasteInfo[]> {
  // Simula chiamata API
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve([
        {
          id: "soil",
          name: "Soil",
          description: "Including topsoil and subsoil",
          allowedInSkips: [17933, 17934, 17935, 15124] // IDs degli skip che accettano soil
        },
        {
          id: "concrete",
          name: "Concrete",
          description: "Blocks, slabs, and foundations",
          allowedInSkips: [17933, 17934, 17935]
        },
        {
          id: "bricks",
          name: "Bricks",
          description: "Whole or broken bricks",
          allowedInSkips: [17933, 17934, 17935]
        },
        {
          id: "tiles",
          name: "Tiles",
          description: "Ceramic, porcelain, or stone tiles",
          allowedInSkips: [17933, 17934, 17935]
        },
        {
          id: "sand",
          name: "Sand",
          description: "Building or garden sand",
          allowedInSkips: [17933, 17934, 17935]
        },
        {
          id: "gravel",
          name: "Gravel",
          description: "Stone and aggregate",
          allowedInSkips: [17933, 17934, 17935]
        },
        {
          id: "rubble",
          name: "Rubble",
          description: "Mixed building debris",
          allowedInSkips: [17933, 17934, 17935]
        }
      ]);
    }, 300);
  });
}

// Recupera le informazioni sulle percentuali di rifiuti pesanti
export async function getHeavyWastePercentages(): Promise<{id: string, name: string, description: string}[]> {
  // Simula chiamata API con dati temporanei
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve([
        {
          id: "none",
          name: "No heavy waste",
          description: "No heavy waste in your skip"
        },
        {
          id: "up-to-5",
          name: "Up to 5%",
          description: "A small amount of heavy waste"
        },
        {
          id: "5-20",
          name: "5-20%",
          description: "A moderate amount of heavy waste"
        },
        {
          id: "over-20",
          name: "Over 20%",
          description: "A large amount of heavy waste"
        }
      ]);
    }, 300);
  });
}