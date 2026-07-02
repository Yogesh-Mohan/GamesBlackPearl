import { db } from './config';
import { 
  collection, 
  doc, 
  getDoc, 
  getDocs, 
  query, 
  where, 
  orderBy, 
  limit, 
  DocumentData,
  QueryConstraint
} from 'firebase/firestore';

/**
 * Fetch a single document from a collection by ID.
 */
export const getDocument = async (collectionName: string, id: string): Promise<DocumentData | null> => {
  try {
    const docRef = doc(db, collectionName, id);
    const docSnap = await getDoc(docRef);
    if (docSnap.exists()) {
      return { id: docSnap.id, ...docSnap.data() };
    }
    return null;
  } catch (error) {
    console.error(`Error fetching document from ${collectionName}:`, error);
    return null;
  }
};

/**
 * Fetch all documents from a collection with optional constraints.
 */
export const queryCollection = async (collectionName: string, constraints: QueryConstraint[] = []): Promise<DocumentData[]> => {
  try {
    const q = query(collection(db, collectionName), ...constraints);
    const querySnapshot = await getDocs(q);
    return querySnapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data()
    }));
  } catch (error) {
    console.error(`Error querying collection ${collectionName}:`, error);
    return [];
  }
};

/**
 * Specialized Queries based on the Architecture Schema
 */

export const getLatestUpdates = async (maxLimit = 5) => {
  return queryCollection('updates', [
    orderBy('publishedAt', 'desc'),
    limit(maxLimit)
  ]);
};

export const getTopRatedGames = async (maxLimit = 10) => {
  // Assumes a ratingAverage field exists on games as per the denormalization strategy
  return queryCollection('games', [
    orderBy('ratingAverage', 'desc'),
    limit(maxLimit)
  ]);
};

export const getActivePolls = async () => {
  return queryCollection('polls', [
    where('active', '==', true),
    orderBy('endDate', 'asc')
  ]);
};
