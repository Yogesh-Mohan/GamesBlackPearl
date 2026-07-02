import { NextResponse } from 'next/server';
import { adminDb } from '../../../firebase/admin';
import { withAuth } from '../../../firebase/middleware';

const handler = async (request: Request, uid: string) => {
  try {
    if (!adminDb) return NextResponse.json({ error: 'Service unavailable' }, { status: 503 });

    const body = await request.json();
    const { gameId, rating, review } = body;

    if (!gameId || rating === undefined || !review) {
      return NextResponse.json({ error: 'Missing required fields' }, { status: 400 });
    }

    if (rating < 1 || rating > 5) {
      return NextResponse.json({ error: 'Rating must be between 1 and 5' }, { status: 400 });
    }

    // Write review document
    const reviewData = {
      userId: uid, // Use verified UID from the middleware token
      gameId,
      rating,
      review,
      createdAt: new Date().toISOString()
    };

    const docRef = await adminDb.collection('reviews').add(reviewData);

    // DENORMALIZATION: Trigger an update to the Game document's ratingAverage and reviewCount
    // Normally this could be done via a Cloud Function, but doing it in the API Route works too.
    const gameRef = adminDb.collection('games').doc(gameId);
    await adminDb.runTransaction(async (transaction) => {
      const gameDoc = await transaction.get(gameRef);
      if (gameDoc.exists) {
        const data = gameDoc.data();
        const currentCount = data?.reviewCount || 0;
        const currentAverage = data?.ratingAverage || 0;
        
        const newCount = currentCount + 1;
        const newAverage = ((currentAverage * currentCount) + rating) / newCount;
        
        transaction.update(gameRef, {
          reviewCount: newCount,
          ratingAverage: newAverage
        });
      }
    });

    return NextResponse.json({ success: true, id: docRef.id }, { status: 201 });
  } catch (error) {
    console.error('Error submitting review:', error);
    return NextResponse.json({ error: 'Failed to submit review' }, { status: 500 });
  }
};

export const POST = withAuth(handler);
