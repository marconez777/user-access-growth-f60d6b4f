
// Tool types
export type ToolType = 
  | "mercadoPublicoAlvo"
  | "funilDeBusca"
  | "palavrasChave" 
  | "textoSeoLp"
  | "textoSeoProduto"
  | "textoSeoBlog"
  | "pautasBlog"
  | "metaDados";

// Map tool types to N8N webhook URLs
const WEBHOOK_URLS: Record<ToolType, string> = {
  mercadoPublicoAlvo: import.meta.env.VITE_N8N_MERCADO_PUBLICO_ALVO_URL || '/api/mock/mercado-publico-alvo',
  funilDeBusca: import.meta.env.VITE_N8N_FUNIL_DE_BUSCA_URL || '/api/mock/funil-de-busca',
  palavrasChave: import.meta.env.VITE_N8N_PALAVRAS_CHAVE_URL || '/api/mock/palavras-chave',
  textoSeoLp: import.meta.env.VITE_N8N_TEXTO_SEO_LP_URL || '/api/mock/texto-seo-lp',
  textoSeoProduto: import.meta.env.VITE_N8N_TEXTO_SEO_PRODUTO_URL || '/api/mock/texto-seo-produto',
  textoSeoBlog: import.meta.env.VITE_N8N_TEXTO_SEO_BLOG_URL || '/api/mock/texto-seo-blog',
  pautasBlog: import.meta.env.VITE_N8N_PAUTAS_BLOG_URL || '/api/mock/pautas-blog',
  metaDados: import.meta.env.VITE_N8N_META_DADOS_URL || '/api/mock/meta-dados',
};

// Function to call N8N webhook
export async function callWebhook(toolType: ToolType, formData: Record<string, any>) {
  try {
    const url = WEBHOOK_URLS[toolType];
    const response = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(formData),
    });

    if (!response.ok) {
      throw new Error(`Error: ${response.status}`);
    }

    return await response.json();
  } catch (error) {
    console.error(`Error calling ${toolType} webhook:`, error);
    throw error;
  }
}

// Function to save result to user history
export async function saveResult(
  userId: string, 
  toolType: ToolType, 
  input: Record<string, any>, 
  output: any
) {
  try {
    // In real implementation, this would call a Supabase endpoint
    const response = await fetch('/api/save-result', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        userId,
        toolType,
        input,
        output,
        date: new Date().toISOString(),
      }),
    });

    if (!response.ok) {
      throw new Error(`Error: ${response.status}`);
    }

    return await response.json();
  } catch (error) {
    console.error('Error saving result:', error);
    throw error;
  }
}

// Function to fetch user history for a specific tool
export async function fetchHistory(userId: string, toolType: ToolType) {
  try {
    // In real implementation, this would call a Supabase endpoint
    const response = await fetch(`/api/history?userId=${userId}&toolType=${toolType}`);

    if (!response.ok) {
      throw new Error(`Error: ${response.status}`);
    }

    return await response.json();
  } catch (error) {
    console.error('Error fetching history:', error);
    throw error;
  }
}

// Function to delete a history item
export async function deleteHistoryItem(itemId: string) {
  try {
    // In real implementation, this would call a Supabase endpoint
    const response = await fetch(`/api/delete-history-item/${itemId}`, {
      method: 'DELETE',
    });

    if (!response.ok) {
      throw new Error(`Error: ${response.status}`);
    }

    return await response.json();
  } catch (error) {
    console.error('Error deleting history item:', error);
    throw error;
  }
}
