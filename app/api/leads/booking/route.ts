import { NextResponse } from 'next/server';
import { notifyAdmins, sendWhatsAppMessage } from '@/utils/whatsappService';

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { 
      checkIn, checkOut, adults, children, 
      roomType, roomPlan, extraBedType, extraBedPlan, 
      fullName, phone, specialRequests 
    } = body;

    // Basic validation
    if (!checkIn || !roomType || !fullName || !phone) {
      return NextResponse.json(
        { error: 'Booking details are incomplete' },
        { status: 400 }
      );
    }

    // Format the message for admins
    let waAdminMessage = `🛎️ *New Booking Reservation* 🛎️\n\n` +
      `*Guest:* ${fullName}\n` +
      `*Phone:* ${phone}\n` +
      `*Stay:* ${checkIn} to ${checkOut || 'TBD'}\n` +
      `*Guests:* ${adults} Adults, ${children} Children\n` +
      `*Room:* ${roomType} (${roomPlan})\n`;

    if (extraBedType) {
      waAdminMessage += `*Extra Bed:* ${extraBedType} (${extraBedPlan})\n`;
    }

    waAdminMessage += `*Requests:* ${specialRequests || 'None'}\n\n` +
      `_Please follow up with the guest on WhatsApp._`;

    // Format the message for the user
    let waUserMessage = `Hello ${fullName}! \n\n` +
      `Thank you for choosing Hotel The Indian, Kargil. We have received your booking request:\n\n` +
      `📅 *Dates:* ${checkIn} to ${checkOut || 'TBD'}\n` +
      `🏨 *Room:* ${roomType} (${roomPlan})\n`;

    if (extraBedType) {
      waUserMessage += `🛏️ *Extra Bed:* ${extraBedType} (${extraBedPlan})\n`;
    }

    waUserMessage += `\nOur team will confirm your reservation shortly.`;

    // Send notifications to admins
    const adminResults = await notifyAdmins(waAdminMessage, fullName);
    
    // Send confirmation to the user
    const userResult = await sendWhatsAppMessage({
      phone,
      message: waUserMessage,
      name: fullName
    });

    const allSuccessful = adminResults.every(r => r.success) && userResult.success;

    if (allSuccessful) {
      return NextResponse.json({ success: true, message: 'Reservation lead sent and confirmation message dispatched.' });
    } else {
      console.error('Some WhatsApp messages failed to send', { adminResults, userResult });
      return NextResponse.json({ 
        success: true, 
        message: 'Booking received, but some notifications may have failed.',
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
