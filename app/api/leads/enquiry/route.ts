import { NextResponse } from 'next/server';
import { sendWhatsAppNotification } from '@/utils/whatsappService';

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { name, contact } = body;

    if (!name || !contact) {
      return NextResponse.json(
        { error: 'Name and contact are required' },
        { status: 400 }
      );
    }

    // Format the message
    const message = `🚨 *New Quick Enquiry* 🚨\n\n*Name:* ${name}\n*Contact:* ${contact}\n*Source:* Website Popup`;

    // Send the notification
    const result = await sendWhatsAppNotification(message);

    if (result.success) {
      return NextResponse.json({ success: true, message: 'Enquiry received inside WhatsApp' });
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
