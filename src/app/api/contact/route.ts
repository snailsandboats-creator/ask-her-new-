import { Resend } from 'resend';
import { NextResponse } from 'next/server';

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(request: Request) {
  console.log('=== Contact Form API Called ===');

  try {
    // Parse the request body
    const body = await request.json();
    console.log('Request body:', body);

    const { name, email, phone, service, message } = body;

    // Validate required fields
    if (!name || !email || !message) {
      console.error('Validation failed: missing required fields');
      return NextResponse.json(
        { error: 'Missing required fields: name, email, and message are required.' },
        { status: 400 }
      );
    }

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return NextResponse.json(
        { error: 'Invalid email address.' },
        { status: 400 }
      );
    }

    // Check if Resend API key is configured
    if (!process.env.RESEND_API_KEY) {
      console.error('RESEND_API_KEY is not configured');
      return NextResponse.json(
        { error: 'Email service is not configured. Please contact support.' },
        { status: 500 }
      );
    }

    console.log('API Key present:', !!process.env.RESEND_API_KEY);

    // Get recipient emails from environment or use defaults
    const recipients = process.env.RESEND_TO_EMAIL?.split(',') || [
      'drita@askhermarketing.com',
      'che@askhermarketing.com',
    ];

    // Get sender email from environment or use default
    const fromEmail = process.env.RESEND_FROM_EMAIL || 'onboarding@resend.dev';

    console.log('Sending email to:', recipients);
    console.log('From:', fromEmail);

    // Create formatted email body
    const emailBody = `
New Contact Form Submission

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

Contact Information:
• Name: ${name}
• Email: ${email}
• Phone: ${phone || 'Not provided'}

Service Interest:
${service || 'Not specified'}

Message:
${message}

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

Submitted: ${new Date().toLocaleString('en-US', {
      dateStyle: 'full',
      timeStyle: 'long',
    })}
`;

    // Send email using Resend
    console.log('Attempting to send email via Resend...');

    const data = await resend.emails.send({
      from: fromEmail,
      to: recipients,
      subject: `New Contact Form Submission from ${name}`,
      text: emailBody,
      replyTo: email,
    });

    // Log success
    console.log('Email sent successfully!');
    console.log('Resend response:', JSON.stringify(data, null, 2));

    return NextResponse.json(
      {
        success: true,
        message: 'Your message has been sent successfully!',
      },
      { status: 200 }
    );
  } catch (error) {
    console.error('Error processing contact form:', error);

    // Handle specific Resend errors
    if (error instanceof Error) {
      return NextResponse.json(
        {
          error: 'Failed to send message. Please try again later.',
          details: process.env.NODE_ENV === 'development' ? error.message : undefined,
        },
        { status: 500 }
      );
    }

    return NextResponse.json(
      { error: 'An unexpected error occurred. Please try again later.' },
      { status: 500 }
    );
  }
}
