import { initializeApp } from 'firebase/app';
import { 
  getAuth, 
  signInWithEmailAndPassword, 
  createUserWithEmailAndPassword,
  signOut,
  onAuthStateChanged,
  User
} from 'firebase/auth';
import { 
  getFirestore,
  collection,
  doc,
  getDoc,
  getDocs,
  setDoc,
  updateDoc,
  query,
  where
} from 'firebase/firestore';
import { Card, UserData, QuizQuestion } from '../types';

// Firebase configuration
const firebaseConfig = {
  apiKey: "YOUR_API_KEY",
  authDomain: "YOUR_AUTH_DOMAIN",
  projectId: "YOUR_PROJECT_ID",
  storageBucket: "YOUR_STORAGE_BUCKET",
  messagingSenderId: "YOUR_MESSAGING_SENDER_ID",
  appId: "YOUR_APP_ID"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);

// Authentication functions
export const signIn = async (email: string, password: string) => {
  try {
    const userCredential = await signInWithEmailAndPassword(auth, email, password);
    return userCredential.user;
  } catch (error) {
    throw error;
  }
};

export const signUp = async (email: string, password: string, userData: Partial<UserData>) => {
  try {
    const userCredential = await createUserWithEmailAndPassword(auth, email, password);
    const user = userCredential.user;
    
    // Create user document in Firestore
    await setDoc(doc(db, 'users', user.uid), {
      ...userData,
      email,
      joinDate: new Date().toISOString(),
      streak: 0,
      totalCards: 0,
      completedQuizzes: 0,
      averageScore: 0,
      preferredCategories: []
    });

    return user;
  } catch (error) {
    throw error;
  }
};

export const signOutUser = async () => {
  try {
    await signOut(auth);
  } catch (error) {
    throw error;
  }
};

export const onAuthStateChange = (callback: (user: User | null) => void) => {
  return onAuthStateChanged(auth, callback);
};

// Data functions
export const getUserData = async (userId: string): Promise<UserData | null> => {
  try {
    const userDoc = await getDoc(doc(db, 'users', userId));
    if (userDoc.exists()) {
      return userDoc.data() as UserData;
    }
    return null;
  } catch (error) {
    throw error;
  }
};

export const updateUserData = async (userId: string, data: Partial<UserData>) => {
  try {
    await updateDoc(doc(db, 'users', userId), data);
  } catch (error) {
    throw error;
  }
};

export const getDailyCards = async (): Promise<Card[]> => {
  try {
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    
    const cardsQuery = query(
      collection(db, 'cards'),
      where('dateAdded', '>=', today)
    );
    
    const querySnapshot = await getDocs(cardsQuery);
    return querySnapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data()
    })) as Card[];
  } catch (error) {
    throw error;
  }
};

export const getCardQuestions = async (cardId: string): Promise<QuizQuestion[]> => {
  try {
    const questionsQuery = query(
      collection(db, 'questions'),
      where('cardId', '==', cardId)
    );
    
    const querySnapshot = await getDocs(questionsQuery);
    return querySnapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data()
    })) as QuizQuestion[];
  } catch (error) {
    throw error;
  }
};

export const updateUserStreak = async (userId: string, newStreak: number) => {
  try {
    await updateDoc(doc(db, 'users', userId), {
      streak: newStreak
    });
  } catch (error) {
    throw error;
  }
};

export const updateQuizResults = async (
  userId: string, 
  score: number, 
  totalQuestions: number
) => {
  try {
    const userDoc = await getDoc(doc(db, 'users', userId));
    if (userDoc.exists()) {
      const userData = userDoc.data() as UserData;
      const newCompletedQuizzes = userData.completedQuizzes + 1;
      const newAverageScore = Math.round(
        ((userData.averageScore * userData.completedQuizzes) + score) / newCompletedQuizzes
      );

      await updateDoc(doc(db, 'users', userId), {
        completedQuizzes: newCompletedQuizzes,
        averageScore: newAverageScore
      });
    }
  } catch (error) {
    throw error;
  }
}; 