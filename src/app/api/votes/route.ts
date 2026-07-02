import { NextResponse } from 'next/server';
import { adminDb } from '../../../firebase/admin';
import { withAuth } from '../../../firebase/middleware';

const handler = async (request: Request, uid: string) => {
  try {
    const body = await request.json();
    const { pollId, optionId } = body;

    if (!pollId || !optionId) {
      return NextResponse.json({ error: 'Missing required poll or vote data.' }, { status: 400 });
    }

    const pollRef = adminDb.collection('polls').doc(pollId);
    const voteRef = pollRef.collection('votes').doc(uid); // Securely use verified UID

    await adminDb.runTransaction(async (transaction) => {
      const pollDoc = await transaction.get(pollRef);
      if (!pollDoc.exists) {
        throw new Error('Poll does not exist.');
      }

      const pollData = pollDoc.data();
      if (pollData?.active === false) {
        throw new Error('This poll is closed.');
      }

      const voteDoc = await transaction.get(voteRef);
      if (voteDoc.exists) {
        throw new Error('User has already voted in this poll.');
      }

      // Record the vote
      transaction.set(voteRef, {
        optionId,
        votedAt: new Date().toISOString()
      });

      // Increment poll counters
      const currentTotal = pollData?.totalVotes || 0;
      let updatedOptions = pollData?.options || [];
      
      updatedOptions = updatedOptions.map((opt: any) => {
        if (opt.id === optionId) {
          return { ...opt, voteCount: (opt.voteCount || 0) + 1 };
        }
        return opt;
      });

      transaction.update(pollRef, {
        totalVotes: currentTotal + 1,
        options: updatedOptions
      });
    });

    return NextResponse.json({ success: true }, { status: 201 });
  } catch (error: any) {
    console.error('Error submitting vote:', error);
    
    if (error.message.includes('already voted')) {
      return NextResponse.json({ error: 'You have already voted in this poll.' }, { status: 403 });
    }
    
    return NextResponse.json({ error: 'Failed to process vote.' }, { status: 500 });
  }
};

export const POST = withAuth(handler);
