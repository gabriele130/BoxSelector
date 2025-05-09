/**
 * Questo è un file speciale per StackBlitz che aiuta a diagnosticare e risolvere
 * problemi di rendering dell'applicazione React.
 */

// Controlla e riferisce lo stato del rendering
document.addEventListener('DOMContentLoaded', () => {
    console.log('📋 Diagnostica BoxSelector per StackBlitz');
    // Crea un elemento visibile per la diagnostica in caso di emergenza
    createDiagnosticsUI();
    
    // Verifica se c'è un elemento root e se è vuoto
    const rootElement = document.getElementById('root');
    if (!rootElement) {
        console.error('❌ Elemento #root non trovato nel DOM');
        reportIssue('root-missing', 'Elemento #root non trovato nel DOM');
        createRootElement();
    } else if (rootElement.children.length === 0) {
        console.warn('⚠️ L\'elemento #root è vuoto, React non ha ancora renderizzato');
        reportIssue('root-empty', 'L\'elemento #root è vuoto - React non ha renderizzato');
    } else {
        console.log('✅ L\'elemento #root contiene elementi figli, il rendering React potrebbe essere riuscito');
    }
    
    // Verifica la disponibilità di React e ReactDOM
    verifyReactAvailability();
});

// Verifica se React e ReactDOM sono disponibili globalmente
function verifyReactAvailability() {
    const timeout = setTimeout(() => {
        console.warn('⚠️ Timeout durante la verifica della disponibilità di React');
        reportIssue('react-timeout', 'React non è stato caricato dopo un\'attesa ragionevole');
    }, 3000);
    
    // Controlla ogni 100ms fino a 3 secondi
    let attempts = 0;
    const checkInterval = setInterval(() => {
        attempts++;
        
        const hasReactInWindow = typeof window.React !== 'undefined';
        const hasReactDOMInWindow = typeof window.ReactDOM !== 'undefined';
        
        if (hasReactInWindow && hasReactDOMInWindow) {
            console.log('✅ React e ReactDOM sono disponibili globalmente');
            clearTimeout(timeout);
            clearInterval(checkInterval);
        } else if (attempts >= 30) {
            console.error('❌ React e/o ReactDOM non sono disponibili dopo 30 tentativi');
            reportIssue('react-missing', 'React o ReactDOM non sono disponibili globalmente');
            clearTimeout(timeout);
            clearInterval(checkInterval);
        }
    }, 100);
}

// Crea un elemento UI per la diagnostica
function createDiagnosticsUI() {
    const diagnosticUI = document.createElement('div');
    diagnosticUI.id = 'stackblitz-diagnostics';
    diagnosticUI.style.cssText = 'position: fixed; bottom: 0; right: 0; background: rgba(0, 0, 0, 0.8); color: white; padding: 10px; font-family: sans-serif; font-size: 12px; z-index: 9999; max-height: 80vh; overflow-y: auto; width: 300px; display: none;';
    
    const header = document.createElement('h3');
    header.textContent = 'BoxSelector Diagnostica';
    header.style.margin = '0 0 10px 0';
    
    const issueList = document.createElement('ul');
    issueList.id = 'stackblitz-issue-list';
    issueList.style.padding = '0 0 0 20px';
    issueList.style.margin = '0';
    
    const footer = document.createElement('div');
    footer.innerHTML = `<p>Per vedere la pagina di debug completa, visita: <a href="/debug-stackblitz" style="color: #3b82f6;">/debug-stackblitz</a></p>`;
    footer.style.marginTop = '10px';
    footer.style.fontSize = '11px';
    
    diagnosticUI.appendChild(header);
    diagnosticUI.appendChild(issueList);
    diagnosticUI.appendChild(footer);
    
    document.body.appendChild(diagnosticUI);
}

// Rapporta un problema nel pannello di diagnostica
function reportIssue(id, message) {
    const diagnosticUI = document.getElementById('stackblitz-diagnostics');
    if (diagnosticUI) {
        diagnosticUI.style.display = 'block';
    }
    
    const issueList = document.getElementById('stackblitz-issue-list');
    if (issueList) {
        const issueItem = document.createElement('li');
        issueItem.id = `issue-${id}`;
        issueItem.textContent = message;
        issueList.appendChild(issueItem);
    }
}

// Crea un elemento root se non esiste
function createRootElement() {
    console.log('🔧 Creazione di un elemento #root di emergenza');
    const rootElement = document.createElement('div');
    rootElement.id = 'root';
    document.body.appendChild(rootElement);
    reportIssue('root-created', 'Elemento #root creato automaticamente');
}

// Monitora gli errori globali
window.addEventListener('error', (event) => {
    console.error('❌ Errore globale:', event.error);
    reportIssue('global-error', `Errore globale: ${event.message}`);
});

// Monitora i rifiuti delle promise non gestiti
window.addEventListener('unhandledrejection', (event) => {
    console.error('❌ Promise rifiutata non gestita:', event.reason);
    reportIssue('unhandled-rejection', `Promise rifiutata: ${event.reason}`);
});