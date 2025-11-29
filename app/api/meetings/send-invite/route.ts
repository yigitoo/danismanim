import { NextRequest, NextResponse } from 'next/server';
import connectDB from '@/lib/mongodb';
import Meeting from '@/lib/models/Meeting';
import nodemailer from 'nodemailer';

// Create email transporter
const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.GMAIL_USER,
    pass: process.env.GMAIL_PASSWORD,
  },
});

// POST - Send meeting invitation email
export async function POST(request: NextRequest) {
  try {
    await connectDB();

    const { meetingId } = await request.json();

    if (!meetingId) {
      return NextResponse.json(
        { error: 'Meeting ID is required' },
        { status: 400 }
      );
    }

    const meeting = await Meeting.findById(meetingId);

    if (!meeting) {
      return NextResponse.json(
        { error: 'Meeting not found' },
        { status: 404 }
      );
    }

    // Format date and time
    const meetingDate = new Date(meeting.meetingDate);
    const formattedDate = meetingDate.toLocaleDateString('tr-TR', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });

    const mailOptions = {
      from: process.env.GMAIL_USER,
      to: meeting.clientEmail,
      subject: `Danışmanım - Randevu Daveti: ${formattedDate}`,
      html: `
        <!DOCTYPE html>
        <html>
          <head>
            <style>
              body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
              .container { max-width: 600px; margin: 0 auto; padding: 20px; }
              .header { background: linear-gradient(135deg, #402e48 0%, #61466e 100%); color: white; padding: 30px; text-align: center; border-radius: 10px 10px 0 0; }
              .content { background: #f8f9fa; padding: 30px; border-radius: 0 0 10px 10px; }
              .info-box { background: white; padding: 20px; border-radius: 8px; margin: 15px 0; border-left: 4px solid #61466e; }
              .info-label { font-weight: bold; color: #61466e; margin-bottom: 5px; }
              .info-value { font-size: 16px; color: #333; }
              .meet-button { display: inline-block; background: #61466e; color: white; padding: 15px 40px; text-decoration: none; border-radius: 8px; margin: 20px 0; font-weight: bold; }
              .meet-button:hover { background: #402e48; }
              .footer { text-align: center; margin-top: 20px; padding: 20px; color: #666; font-size: 12px; }
              .notes { background: #fff3cd; padding: 15px; border-radius: 8px; border-left: 4px solid #ffc107; margin: 15px 0; }
            </style>
          </head>
          <body>
            <div class="container">
              <div class="header">
                <h1 style="margin: 0;">📅 Randevu Daveti</h1>
                <p style="margin: 10px 0 0 0;">Danışmanım Yurtdışı Eğitim Danışmanlık</p>
              </div>
              <div class="content">
                <p style="font-size: 16px; margin-bottom: 20px;">
                  Merhaba <strong>${meeting.clientName}</strong>,
                </p>
                <p style="font-size: 16px; margin-bottom: 20px;">
                  Yurtdışı eğitim danışmanlığı için randevunuz oluşturulmuştur. Detaylar aşağıdadır:
                </p>

                <div class="info-box">
                  <div class="info-label">📅 Tarih:</div>
                  <div class="info-value">${formattedDate}</div>
                </div>

                <div class="info-box">
                  <div class="info-label">🕐 Saat:</div>
                  <div class="info-value">${meeting.meetingTime}</div>
                </div>

                <div class="info-box">
                  <div class="info-label">⏱️ Süre:</div>
                  <div class="info-value">${meeting.duration} dakika</div>
                </div>

                ${meeting.notes ? `
                <div class="notes">
                  <div class="info-label">📝 Notlar:</div>
                  <div class="info-value">${meeting.notes}</div>
                </div>
                ` : ''}

                <div style="text-align: center; margin: 30px 0;">
                  <a href="${meeting.googleMeetLink}" class="meet-button">
                    🎥 Google Meet'e Katıl
                  </a>
                </div>

                <div style="background: white; padding: 15px; border-radius: 8px; font-size: 14px;">
                  <strong>Google Meet Linki:</strong><br>
                  <a href="${meeting.googleMeetLink}" style="color: #61466e; word-break: break-all;">
                    ${meeting.googleMeetLink}
                  </a>
                </div>

                <p style="margin-top: 30px; font-size: 14px; color: #666;">
                  Randevunuza gelmeden önce görüşmek istediğiniz konular hakkında notlar almanızı öneririz.
                </p>
              </div>
              <div class="footer">
                <p><strong>Danışmanım Yurtdışı Eğitim Danışmanlık</strong></p>
                <p>Çukurcuma Caddesi, Firuzağa Mah. No:52, Beyoğlu, İstanbul</p>
                <p>📞 +90 545 279 7664 | 📧 info@danismanim.co</p>
                <p style="margin-top: 10px;">
                  <a href="https://danismanim.co" style="color: #61466e;">danismanim.co</a>
                </p>
              </div>
            </div>
          </body>
        </html>
      `,
      text: `
Randevu Daveti - Danışmanım

Merhaba ${meeting.clientName},

Yurtdışı eğitim danışmanlığı için randevunuz oluşturulmuştur:

Tarih: ${formattedDate}
Saat: ${meeting.meetingTime}
Süre: ${meeting.duration} dakika

Google Meet Linki: ${meeting.googleMeetLink}

${meeting.notes ? `Notlar: ${meeting.notes}` : ''}

Görüşmek üzere!

---
Danışmanım Yurtdışı Eğitim Danışmanlık
+90 545 279 7664 | info@danismanim.co
danismanim.co
      `,
    };

    await transporter.sendMail(mailOptions);

    // Mark email as sent
    meeting.emailSent = true;
    await meeting.save();

    return NextResponse.json({
      success: true,
      message: 'Meeting invitation sent successfully'
    });
  } catch (error) {
    console.error('Error sending meeting invitation:', error);
    return NextResponse.json(
      { error: 'Failed to send meeting invitation' },
      { status: 500 }
    );
  }
}
