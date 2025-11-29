import nodemailer from 'nodemailer';

// Create reusable transporter
const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.GMAIL_USER,
    pass: process.env.GMAIL_PASSWORD,
  },
});

export interface ContactFormData {
  name: string;
  email: string;
  phone: string;
  country: string;
  message: string;
}

/**
 * Send contact form email
 */
export async function sendContactEmail(data: ContactFormData) {
  const { name, email, phone, country, message } = data;

  const mailOptions = {
    from: process.env.GMAIL_USER,
    to: 'info@danismanim.co', // Send to yourself
    replyTo: email, // User can reply directly to the contact
    subject: `Danışmanım - Yeni İletişim Formu: ${name}`,
    html: `
      <!DOCTYPE html>
      <html>
        <head>
          <style>
            body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
            .container { max-width: 600px; margin: 0 auto; padding: 20px; }
            .header { background: linear-gradient(135deg, #402e48 0%, #61466e 100%); color: white; padding: 30px; text-align: center; border-radius: 10px 10px 0 0; }
            .content { background: #f8f9fa; padding: 30px; border-radius: 0 0 10px 10px; }
            .field { margin-bottom: 20px; }
            .label { font-weight: bold; color: #61466e; margin-bottom: 5px; }
            .value { background: white; padding: 12px; border-radius: 5px; border-left: 3px solid #61466e; }
            .message-box { background: white; padding: 20px; border-radius: 5px; border-left: 3px solid #F59E0B; margin-top: 10px; }
            .footer { text-align: center; margin-top: 20px; padding: 20px; color: #666; font-size: 12px; }
          </style>
        </head>
        <body>
          <div class="container">
            <div class="header">
              <h1 style="margin: 0;">🎓 Yeni İletişim Formu</h1>
              <p style="margin: 10px 0 0 0;">Danışmanım Yurtdışı Eğitim Danışmanlık</p>
            </div>
            <div class="content">
              <div class="field">
                <div class="label">👤 Ad Soyad:</div>
                <div class="value">${name}</div>
              </div>

              <div class="field">
                <div class="label">📧 E-posta:</div>
                <div class="value"><a href="mailto:${email}" style="color: #61466e; text-decoration: none;">${email}</a></div>
              </div>

              <div class="field">
                <div class="label">📱 Telefon:</div>
                <div class="value">${phone}</div>
              </div>

              <div class="field">
                <div class="label">🌍 Ülke:</div>
                <div class="value">${country}</div>
              </div>

              <div class="field">
                <div class="label">💬 Mesaj:</div>
                <div class="message-box">${message.replace(/\n/g, '<br>')}</div>
              </div>
            </div>
            <div class="footer">
              <p>Bu e-posta <strong>danismanim.co</strong> web sitesindeki iletişim formundan gönderilmiştir.</p>
              <p>Yanıtlamak için doğrudan bu e-postayı yanıtlayabilirsiniz.</p>
            </div>
          </div>
        </body>
      </html>
    `,
    text: `
Yeni İletişim Formu - Danışmanım

Ad Soyad: ${name}
E-posta: ${email}
Telefon: ${phone}
Ülke: ${country}

Mesaj:
${message}

---
Bu e-posta danismanim.co web sitesindeki iletişim formundan gönderilmiştir.
    `,
  };

  try {
    const info = await transporter.sendMail(mailOptions);
    console.log('Email sent:', info.messageId);
    return { success: true, messageId: info.messageId };
  } catch (error) {
    console.error('Error sending email:', error);
    throw error;
  }
}
