export interface LeadData {
  nome: string;
  email: string;
  telefone: string;
  origem: string;
  metadados?: Record<string, string>;
}

/**
 * Envia os dados do lead para o CRM via API Gateway.
 * Utiliza as variáveis de ambiente NEXT_PUBLIC_API_KEY e NEXT_PUBLIC_API_GATEWAY_URL.
 */
export async function sendToCRM(data: LeadData) {
  const apiKey = process.env.NEXT_PUBLIC_API_KEY;
  const gatewayUrl = process.env.NEXT_PUBLIC_API_GATEWAY_URL;

  if (!apiKey || !gatewayUrl) {
    console.warn("CRM: Configuração ausente (API Key ou Gateway URL). Verifique as variáveis de ambiente.");
    return null;
  }

  try {
    const response = await fetch(`${gatewayUrl}/ingest`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "X-API-Key": apiKey,
      },
      body: JSON.stringify({
        ...data,
        metadados: data.metadados || {}
      }),
    });

    if (!response.ok) {
      const errorText = await response.text();
      throw new Error(`Erro na API do CRM (${response.status}): ${errorText}`);
    }

    return await response.json();
  } catch (error) {
    console.error("Falha ao enviar dados para o CRM:", error);
    throw error;
  }
}
