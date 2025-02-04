// app/api/send-email/route.ts
import { MailtrapClient } from "mailtrap";

const TOKEN = process.env.MAILTRAP_API_TOKEN;
if (!TOKEN) {
  throw new Error("MAILTRAP_API_TOKEN is not defined");
}

const client = new MailtrapClient({ token: TOKEN });

export async function POST(request: Request) {
  try {
    const { name, email, message } = await request.json();

    const sender = {
      email: "contact@bassmit.dev",
      name: "Bas Smit",
    };

    // Email to portfolio owner
    const adminEmailHtml = `
      <!DOCTYPE html>
      <html>
        <head>
          <meta charset="utf-8">
          <meta name="viewport" content="width=device-width, initial-scale=1.0">
          <title>New Portfolio Contact Message</title>
          <style>
            body {
              font-family: Arial, sans-serif;
              line-height: 1.6;
              background-color: #0d1117;
              color: #c9d1d9;
              margin: 0;
              padding: 0;
            }
            .container {
              max-width: 600px;
              margin: 0 auto;
              padding: 20px;
            }
            .header {
              background-color: #161b22;
              border: 1px solid #30363d;
              border-radius: 10px;
              padding: 20px;
              margin-bottom: 20px;
              text-align: center;
            }
            .content {
              background-color: #161b22;
              border: 1px solid #30363d;
              border-radius: 10px;
              padding: 20px;
            }
            .message-box {
              background-color: #0d1117;
              border: 1px solid #30363d;
              border-radius: 8px;
              padding: 15px;
              margin-top: 15px;
            }
            h1, h2 {
              color: #58a6ff;
              margin: 0;
            }
            .label {
              color: #8b949e;
              font-size: 14px;
              margin-bottom: 5px;
            }
            .value {
              color: #c9d1d9;
              margin-bottom: 15px;
            }
            .footer {
              text-align: center;
              margin-top: 20px;
              color: #8b949e;
              font-size: 12px;
            }
            .stars {
              color: #fff;
              font-size: 20px;
              letter-spacing: 3px;
            }
          </style>
        </head>
        <body>
          <div class="container">
            <div class="header">
              <div class="stars">✧ · . · ✧</div>
              <h1>New Contact Message</h1>
              <div class="stars">✧ · . · ✧</div>
            </div>

            <div class="content">
              <div>
                <div class="label">From:</div>
                <div class="value">${name} (${email})</div>
              </div>

              <div>
                <div class="label">Message:</div>
                <div class="message-box">
                  ${message.replace(/\n/g, "<br>")}
                </div>
              </div>
            </div>

            <div class="footer">
              <p>This message was sent from your portfolio contact form</p>
              <div class="stars">· · ✧ · ·</div>
            </div>
          </div>
        </body>
      </html>
    `;

    // Confirmation email to sender
    const confirmationEmailHtml = `
      <!DOCTYPE html>
      <html>
        <head>
          <meta charset="utf-8">
          <meta name="viewport" content="width=device-width, initial-scale=1.0">
          <title>Message Received - Bas Smit</title>
          <style>
            body {
              font-family: Arial, sans-serif;
              line-height: 1.6;
              background-color: #0d1117;
              color: #c9d1d9;
              margin: 0;
              padding: 0;
            }
            .container {
              max-width: 600px;
              margin: 0 auto;
              padding: 20px;
            }
            .header {
              background-color: #161b22;
              border: 1px solid #30363d;
              border-radius: 10px;
              padding: 20px;
              margin-bottom: 20px;
              text-align: center;
            }
            .content {
              background-color: #161b22;
              border: 1px solid #30363d;
              border-radius: 10px;
              padding: 20px;
            }
            h1, h2 {
              color: #58a6ff;
              margin: 0;
            }
            .message {
              color: #c9d1d9;
              margin: 15px 0;
            }
            .note {
              background-color: #0d1117;
              border: 1px solid #30363d;
              border-radius: 8px;
              padding: 15px;
              margin-top: 15px;
              color: #8b949e;
              font-size: 14px;
            }
            .footer {
              text-align: center;
              margin-top: 20px;
              color: #8b949e;
              font-size: 12px;
            }
            .stars {
              color: #fff;
              font-size: 20px;
              letter-spacing: 3px;
            }
          </style>
        </head>
        <body>
          <div class="container">
            <div class="header">
              <div class="stars">✧ · . · ✧</div>
              <h1>Message Received!</h1>
              <div class="stars">✧ · . · ✧</div>
            </div>

            <div class="content">
              <div class="message">
                <p>Hi ${name},</p>
                <p>Thank you for reaching out! I've received your message and will get back to you as soon as possible.</p>
                <p>I appreciate your interest and look forward to our conversation.</p>
              </div>

              <div class="note">
                <strong>Note:</strong> If you don't see this email in your inbox, please check your spam folder and mark it as "not spam" to ensure you receive my response.
              </div>
            </div>

            <div class="footer">
              <p>Best regards,<br>Bas Smit</p>
              <div class="stars">· · ✧ · ·</div>
            </div>
          </div>
        </body>
      </html>
    `;

    // Send email to portfolio owner
    await client.send({
      from: sender,
      to: [{ email: "bas.smit@live.nl" }],
      subject: `✧ New Portfolio Message from ${name} ✧`,
      html: adminEmailHtml,
      category: "Contact Form Admin",
    });

    // Send confirmation email to sender
    await client.send({
      from: sender,
      to: [{ email: email }],
      subject: `✧ Thank You for Your Message - Bas Smit Portfolio ✧`,
      html: confirmationEmailHtml,
      category: "Contact Form Confirmation",
    });

    return Response.json({ success: true });
  } catch (error) {
    console.error("Email sending error:", error);
    return Response.json(
      {
        success: false,
        error: error instanceof Error ? error.message : "Failed to send email",
      },
      { status: 500 },
    );
  }
}
