import { NextResponse } from "next/server";

export async function POST(request) {
  try {
    const { name, email, phone, message } = await request.json();

    if (!name || !email || !message) {
      return NextResponse.json(
        { error: "Name, email, and message are required." },
        { status: 400 }
      );
    }

    const recipientEmail = "hhhhohyhu@gmail.com";

    const response = await fetch(`https://formsubmit.co/ajax/${recipientEmail}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Accept": "application/json",
        "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36"
      },
      body: JSON.stringify({
        _subject: `ScootSale Contact Form: New Message from ${name}`,
        _template: "table",
        "Full Name": name,
        "Email Address": email,
        "Phone Number": phone || "Not Provided",
        "Message": message
      })
    });

    const data = await response.json();

    if (response.ok) {
      return NextResponse.json({ success: true, message: "Email sent successfully!" });
    } else {
      return NextResponse.json(
        { error: data.message || "Failed to send email." },
        { status: 500 }
      );
    }
  } catch (error) {
    console.error("Contact form processing error:", error);
    return NextResponse.json(
      { error: "Failed to process form request." },
      { status: 500 }
    );
  }
}
