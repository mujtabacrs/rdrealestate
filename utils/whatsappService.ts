/**
 * Utility Service for interacting with WhatsApp Cloud API
 * This file is prepared to integrate easily with Meta's official API
 * once the API key is secured.
 */

export const sendWhatsAppNotification = async (messageText: string) => {
  // TODO: Add these environment variables to your .env.local file
  const WHATSAPP_API_TOKEN = process.env.WHATSAPP_API_TOKEN || '';
  const WHATSAPP_PHONE_NUMBER_ID = process.env.WHATSAPP_PHONE_NUMBER_ID || '';
  
  // The phone number that will receive the leads. Can also be in .env.local
  const RECIPIENT_NUMBER = process.env.ADMIN_WHATSAPP_NUMBER || '918082745614';

  if (!WHATSAPP_API_TOKEN || !WHATSAPP_PHONE_NUMBER_ID) {
    console.warn("WhatsApp API key not configured. Mocking API call to number:", RECIPIENT_NUMBER);
    console.log("Mock WhatsApp Message Payload:", messageText);
    
    // Simulate a network delay
    await new Promise((resolve) => setTimeout(resolve, 1000));
    return { success: true, mocked: true };
  }

  const url = `https://graph.facebook.com/v17.0/${WHATSAPP_PHONE_NUMBER_ID}/messages`;

  try {
    const response = await fetch(url, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${WHATSAPP_API_TOKEN}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        messaging_product: "whatsapp",
        recipient_type: "individual",
        to: RECIPIENT_NUMBER,
        type: "text",
        text: {
          preview_url: false,
          body: messageText
        }
      })
    });

    const data = await response.json();
    
    if (!response.ok) {
      throw new Error(data.error?.message || 'Failed to send WhatsApp message');
    }

    return { success: true, data };
  } catch (error) {
    console.error("Error sending WhatsApp notification:", error);
    return { success: false, error };
  }
}
