import { NextResponse } from 'next/server';
import { adminDb } from '../../../firebase/admin';
import { withAuth } from '../../../firebase/middleware';

const handler = async (request: Request, uid: string) => {
  try {
    const body = await request.json();
    const { gameId, title, description, severity } = body;

    if (!gameId || !title || !description || !severity) {
      return NextResponse.json({ error: 'Missing required fields' }, { status: 400 });
    }

    // Use the cryptographically verified UID from the token, not from the payload
    const bugReportData = {
      userId: uid,
      gameId,
      title,
      description,
      severity,
      status: "Open", // Default status
      screenshots: body.screenshots || [],
      video: body.video || null,
      createdAt: new Date().toISOString()
    };

    const docRef = await adminDb.collection('bugReports').add(bugReportData);

    return NextResponse.json({ success: true, id: docRef.id }, { status: 201 });
  } catch (error) {
    console.error('Error creating bug report:', error);
    return NextResponse.json({ error: 'Failed to submit bug report' }, { status: 500 });
  }
};

export const POST = withAuth(handler);
