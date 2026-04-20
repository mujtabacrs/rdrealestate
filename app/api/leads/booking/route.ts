import { NextResponse } from 'next/server';
import { sendWhatsAppNotification } from '@/utils/whatsappService';

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { checkIn, checkOut, adults, children, roomType } = body;

    // Basic validation
    if (!checkIn || !roomType) {
      return NextResponse.json(
        { error: 'Booking details are incomplete' },
        { status: 400 }
      );
    }

    // Format the message
    const message = `🛎️ *New Booking Reservation* 🛎️\n\n*Room:* ${roomType}\n*Check-In:* ${checkIn}\n*Check-Out:* ${checkOut || 'Not specified'}\n*Guests:* ${adults} Adults, ${children} Children\n\n_Please follow up with the guest._`;

    // Send the notification
    const result = await sendWhatsAppNotification(message);

    if (result.success) {
      return NextResponse.json({ success: true, message: 'Reservation lead sent to WhatsApp.' });
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
