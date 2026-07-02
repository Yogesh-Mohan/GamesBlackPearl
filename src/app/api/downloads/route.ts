import { NextResponse } from 'next/server';
import { adminDb } from '../../../firebase/admin';

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { userId, gameId, version, platform } = body;

    if (!gameId || !version) {
      return NextResponse.json({ error: 'Missing required game or version data.' }, { status: 400 });
    }

    const downloadData = {
      userId: userId || null, // Anonymous downloads allowed based on schema
      gameId,
      version,
      platform: platform || 'Windows',
      downloadTime: new Date().toISOString()
    };

    // Append to downloads log collection
    const docRef = await adminDb.collection('downloads').add(downloadData);

    return NextResponse.json({ success: true, id: docRef.id }, { status: 201 });
  } catch (error) {
    console.error('Error logging download:', error);
    return NextResponse.json({ error: 'Failed to log download analytics.' }, { status: 500 });
  }
}
