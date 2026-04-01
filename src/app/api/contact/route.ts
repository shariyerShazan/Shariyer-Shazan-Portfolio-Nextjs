import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  try {
    const { name, email, message } = await request.json();

    if (!name || !email || !message) {
      return NextResponse.json(
        { error: "name, email and message are required" },
        { status: 400 },
      );
    }

    const BREVO_API_KEY = process.env.BREVO_API_KEY;
    const BREVO_SENDER_EMAIL = process.env.BREVO_SENDER_EMAIL;
    const BREVO_SENDER_NAME = process.env.BREVO_SENDER_NAME;
    const ADMIN_EMAIL = "shariyershazan1@gmail.com";

    if (!BREVO_API_KEY || !BREVO_SENDER_EMAIL) {
      console.error("Brevo env vars missing");
      return NextResponse.json(
        { error: "Email service not configured" },
        { status: 500 },
      );
    }

    const res = await fetch("https://api.brevo.com/v3/smtp/email", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "api-key": BREVO_API_KEY,
      },
      body: JSON.stringify({
        sender: {
          name: BREVO_SENDER_NAME || "Portfolio Contact",
          email: BREVO_SENDER_EMAIL,
        },
        to: [{ email: ADMIN_EMAIL, name: "Shazan Admin" }],
        replyTo: { email, name },
        subject: `New Contact: ${name}`,
        htmlContent: `
          <div style="font-family:monospace;max-width:600px;margin:auto;background:#0a0a0a;color:#e0e0e0;padding:32px;border:1px solid #222;">
            <h2 style="color:#fff;margin-top:0;">New Portfolio Contact</h2>
            <p style="color:#999;font-size:12px;letter-spacing:0.15em;text-transform:uppercase;">from</p>
            <p style="color:#fff;font-size:16px;margin:0 0 4px;"><strong>${name}</strong></p>
            <p style="color:#aaa;margin:0 0 24px;"><a href="mailto:${email}" style="color:#5b8def;">${email}</a></p>
            <p style="color:#999;font-size:12px;letter-spacing:0.15em;text-transform:uppercase;">message</p>
            <p style="color:#ddd;line-height:1.8;white-space:pre-wrap;">${message}</p>
            <hr style="border:none;border-top:1px solid #222;margin:24px 0;"/>
            <p style="color:#555;font-size:11px;">Sent from your portfolio contact form</p>
          </div>
        `,
      }),
    });

    if (!res.ok) {
      const err = await res.text();
      console.error("Brevo error:", err);
      return NextResponse.json(
        { error: "Failed to send email" },
        { status: 500 },
      );
    }

    return NextResponse.json({ message: "Email sent successfully" });
  } catch (error: unknown) {
    console.error("Contact API error:", error);
    const message =
      process.env.NODE_ENV === "development"
        ? error instanceof Error
          ? error.message
          : String(error)
        : "Server error";
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
