import { NextResponse } from 'next/server';
import { adminAuth } from './admin';

type AuthenticatedHandler = (request: Request, uid: string) => Promise<NextResponse>;

/**
 * Middleware wrapper to secure Next.js API Routes.
 * Extracts the Bearer token, verifies it via Firebase Admin SDK,
 * and passes the authenticated `uid` to the handler.
 */
export const withAuth = (handler: AuthenticatedHandler) => {
  return async (request: Request) => {
    try {
      const authHeader = request.headers.get('authorization');
      
      if (!authHeader || !authHeader.startsWith('Bearer ')) {
        return NextResponse.json(
          { error: 'Unauthorized: Missing or invalid Authorization header.' },
          { status: 401 }
        );
      }

      const idToken = authHeader.split('Bearer ')[1];
      
      // Cryptographically verify the Firebase ID token
      const decodedToken = await adminAuth.verifyIdToken(idToken);
      const uid = decodedToken.uid;

      // Pass control to the protected route handler
      return await handler(request, uid);
    } catch (error: any) {
      console.error('API Authentication Error:', error);
      
      if (error.code === 'auth/id-token-expired') {
        return NextResponse.json({ error: 'Unauthorized: Token expired.' }, { status: 401 });
      }
      
      return NextResponse.json({ error: 'Unauthorized: Invalid token.' }, { status: 401 });
    }
  };
};
