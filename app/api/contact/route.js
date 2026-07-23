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

    // Submit to FormSubmit endpoint with custom formatting
    const response = await fetch(`https://formsubmit.co/ajax/${recipientEmail}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Accept": "application/json"
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
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}
