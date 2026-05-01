import { NextResponse } from 'next/server';
import { sendWhatsAppNotification } from '@/utils/whatsappService';

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { name, email, phone, message } = body;

    // Basic validation
    if (!name || !email || !phone || !message) {
      return NextResponse.json(
        { error: 'Contact details are incomplete' },
        { status: 400 }
      );
    }

    // Format the message
    const waMessage = `📧 *New Contact Inquiry* 📧\n\n*Name:* ${name}\n*Email:* ${email}\n*Phone:* ${phone}\n\n*Message:*\n${message}\n\n_Please follow up with the guest._`;

    // Send the notification
    const result = await sendWhatsAppNotification(waMessage);

    if (result.success) {
      return NextResponse.json({ success: true, message: 'Inquiry sent to WhatsApp.' });
    } else {
      console.error('Failed to send WhatsApp message', result.error);
      return NextResponse.json({ success: false, message: 'Failed to notify admin.' }, { status: 500 });
    }
  } catch (error) {
    console.error('API Error:', error);
    return NextResponse.json(
      { error: 'Internal Server Error' },
      { status: 500 }
    );
  }
}
