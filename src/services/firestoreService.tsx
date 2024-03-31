import { db } from '../firebaseConfig';
import { collection, addDoc, getDocs, doc, setDoc } from 'firebase/firestore';
import { CankerSore } from '../types';

// Function to save data to a specified collection
export const saveData = async (collectionName: string, data: Record<string, any>) => {
  try {
    const docRef = await addDoc(collection(db, collectionName), data);
    console.log("Document written with ID: ", docRef.id);
    return docRef.id; // Return the document ID
  } catch (e) {
    console.error("Error adding document: ", e);
    throw e; // Rethrow the error for handling elsewhere
  }
};

export const getAllData = async (collectionName: string) => {
  try {
    const querySnapshot = await getDocs(collection(db, collectionName));
    return querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
  } catch (e) {
    console.error("Error fetching documents: ", e);
    throw e; // Rethrow the error for handling elsewhere
  }
};

export const addCankerSoreToFirestore = async (cankerSore: CankerSore) => {
  try {
    // Correctly use Firestore v9 modular syntax
    const cankerSoreRef = doc(collection(db, "cankerSores"), cankerSore.id);
    await setDoc(cankerSoreRef, cankerSore);
    console.log("Document successfully written!");
  } catch (error) {
    console.error("Error writing document: ", error);
  }
};

