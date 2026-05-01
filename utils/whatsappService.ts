/**
 * Utility Service for interacting with WhatsApp Cloud API
 * This file is prepared to integrate easily with Meta's official API
 * once the API key is secured.
 */

/**
 * Utility Service for interacting with internal WhatsApp API tool
 */

export interface WhatsAppMessageParams {
  phone: string;
  message: string;
  name: string;
}

export const sendWhatsAppMessage = async ({ phone, message, name }: WhatsAppMessageParams) => {
  const WHATSAPP_API_TOKEN = process.env.WHATSAPP_API_TOKEN || '';
  
  if (!WHATSAPP_API_TOKEN) {
    console.warn("WhatsApp API key not configured. Mocking API call to number:", phone);
    console.log("Mock WhatsApp Message Payload:", { phone, message, name });
    
    // Simulate a network delay
    await new Promise((resolve) => setTimeout(resolve, 1000));
    return { success: true, mocked: true };
  }

  const url = `https://api.waibusiness.com/messages/m`;

  try {
    const payload = {
      phone: phone.startsWith('+') ? phone : `+${phone.replace(/\D/g, '')}`, // Ensure format like +1234567890
      type: "text",
      message: message,
      name: name,
      messageType: "notification",
      priority: "normal"
    };

    const response = await fetch(url, {
      method: 'POST',
      headers: {
        'x-api-key': WHATSAPP_API_TOKEN,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(payload)
    });

    const data = await response.json();
    
    if (!response.ok) {
      console.error("WhatsApp API Error Response:", data);
      return { success: false, error: data };
    }

    return { success: true, data };
  } catch (error) {
    console.error("Error sending WhatsApp message:", error);
    return { success: false, error };
  }
}

/**
 * Helper to send a message to all admins defined in environment variables
 */
export const notifyAdmins = async (message: string, guestName: string) => {
  const adminNumbers = (process.env.ADMIN_WHATSAPP_NUMBER || '').split(',').map(n => n.trim()).filter(Boolean);
  
  if (adminNumbers.length === 0) {
    console.warn("No admin WhatsApp numbers configured in ADMIN_WHATSAPP_NUMBER");
    return [];
  }

  const results = await Promise.all(
    adminNumbers.map(phone => sendWhatsAppMessage({ phone, message, name: guestName }))
  );

  return results;
}
