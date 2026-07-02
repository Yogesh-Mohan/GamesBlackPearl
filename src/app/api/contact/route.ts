import { NextResponse } from 'next/server';
import { adminDb } from '../../../firebase/admin';

export async function POST(request: Request) {
  try {
    if (!adminDb) return NextResponse.json({ error: 'Service unavailable' }, { status: 503 });

    const body = await request.json();
    const { name, email, subject, message } = body;

    // Validate fields
    if (!name || !email || !subject || !message) {
      return NextResponse.json({ error: 'All fields are required.' }, { status: 400 });
    }

    // Email basic validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return NextResponse.json({ error: 'Invalid email address.' }, { status: 400 });
    }

    // Write contact submission to Firestore
    const contactData = {
      name,
      email,
      subject,
      message,
      status: 'Unread', // Matches our schema
      submittedAt: new Date().toISOString()
    };

    const docRef = await adminDb.collection('contacts').add(contactData);

    return NextResponse.json({ success: true, id: docRef.id }, { status: 201 });
  } catch (error) {
    console.error('Error submitting contact form:', error);
    return NextResponse.json({ error: 'Failed to send message. Please try again later.' }, { status: 500 });
  }
}
