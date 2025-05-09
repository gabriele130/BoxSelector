/**
 * Questo file contiene fix per problemi di percorsi in StackBlitz
 * 
 * Problema: In StackBlitz, le importazioni dirette di file statici come immagini
 * possono causare errori del tipo:
 * 
 * "Failed to load module script: Expected a JavaScript module script but the server 
 * responded with a MIME type of "image/png". Strict MIME type checking is enforced 
 * for module scripts per HTML spec."
 * 
 * Soluzione: Utilizziamo percorsi statici invece di importazioni ES Module
 */

/**
 * Ottiene l'URL corretto per un asset pubblico, indipendentemente dall'ambiente
 * @param relativePath Percorso relativo all'asset (es. "/attached_assets/image.png")
 * @returns URL completo adattato all'ambiente corrente
 */
export function getPublicAssetUrl(relativePath: string): string {
  // Assicurati che il percorso inizi con "/" se non lo è già
  const normalizedPath = relativePath.startsWith("/") 
    ? relativePath 
    : `/${relativePath}`;
  
  // In StackBlitz, le immagini potrebbero essere servite da un percorso diverso
  // Questo controlla se siamo in un ambiente StackBlitz
  const isStackBlitz = typeof window !== 'undefined' && 
    window.location.hostname.includes('stackblitz') || 
    window.location.hostname.includes('webcontainer');
  
  if (isStackBlitz) {
    // Restituisci un percorso assoluto senza modifiche per StackBlitz
    return normalizedPath;
  }
  
  // In altri ambienti, restituisci il percorso relativo
  return normalizedPath;
}

/**
 * Crea un'immagine SVG inline come fallback per le immagini che non si caricano
 * @param text Testo da mostrare nell'SVG
 * @param bgColor Colore di sfondo (opzionale)
 * @returns Data URI dell'SVG
 */
export function createSvgFallback(text: string, bgColor: string = '#555555'): string {
  // Versione pulita del testo (rimuove caratteri speciali che potrebbero causare errori nell'SVG)
  const cleanText = text.replace(/[^\w\s]/gi, '').substring(0, 20);
  
  // Crea un semplice SVG con il testo fornito
  const svg = `
    <svg width="200" height="100" xmlns="http://www.w3.org/2000/svg">
      <rect width="198" height="98" x="1" y="1" stroke="#333" fill="${bgColor}" stroke-width="2" rx="5" ry="5"/>
      <text x="50" y="50" font-family="Arial" font-size="14" fill="#fff">${cleanText}</text>
    </svg>
  `.trim();
  
  // Converti in data URI (evita problemi di caricamento anche per l'SVG)
  return `data:image/svg+xml;utf8,${encodeURIComponent(svg)}`;
}