import { NextResponse } from 'next/server';
import { notifyAdmins, sendWhatsAppMessage } from '@/utils/whatsappService';

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

    // Format the message for admins
    const waAdminMessage = `📧 *New Contact Inquiry* 📧\n\n*Name:* ${name}\n*Email:* ${email}\n*Phone:* ${phone}\n\n*Message:*\n${message}\n\n_Please follow up with the guest._`;

    // Format the message for the user
    const waUserMessage = `Hello ${name}! \n\nThank you for contacting Hotel The Indian, Kargil. We have received your inquiry. \n\nOur team will get back to you shortly.`;

    // Send notifications to admins
    const adminResults = await notifyAdmins(waAdminMessage, name);

    // Send confirmation to the user
    const userResult = await sendWhatsAppMessage({
      phone,
      message: waUserMessage,
      name
    });

    const allSuccessful = adminResults.every(r => r.success) && userResult.success;

    if (allSuccessful) {
      return NextResponse.json({ success: true, message: 'Inquiry received and notifications sent.' });
    } else {
      console.error('Some WhatsApp messages failed to send', { adminResults, userResult });
      return NextResponse.json({
        success: true,
        message: 'Inquiry received, but some notifications may have failed.',
        details: { adminResults, userResult }
      });
    }
  } catch (error) {
    console.error('API Error:', error);
    return NextResponse.json(
      { error: 'Internal Server Error' },
      { status: 500 }
    );
  }
}
