import { db } from '../firebaseConfig';
import { collection, addDoc, getDocs, doc, setDoc, query, where } from 'firebase/firestore';
import { CankerSore } from '../types';

export const saveData = async (collectionName: string, data: Record<string, any>) => {
  try {
    const docRef = await addDoc(collection(db, collectionName), data);
    console.log("Document written with ID: ", docRef.id);
    return docRef.id; 
  } catch (e) {
    console.error("Error adding document: ", e);
    throw e; 
  }
};

export const loadData = async (collectionName: string) => {
  try {
    const querySnapshot = await getDocs(collection(db, collectionName));
    return querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
  } catch (e) {
    console.error("Error fetching documents: ", e);
    throw e; 
  }
};

export const loadCankerSores = async (viewName: string): Promise<CankerSore[]> => {
  let q;
  if (viewName === "mouthDiagramNoLabels") {
    q = collection(db, 'cankerSores') ;

  } else {
    q = query(collection(db, 'cankerSores'), where('locationImage', '==', viewName));
  }

    const querySnapshot = await getDocs(q);

    const cankerSores: CankerSore[] = querySnapshot.docs.map(doc => {
        const data = doc.data();

        const lastUpdated = data.lastUpdated?.map((timestamp: { toDate: () => Date }) => timestamp.toDate()) || [];

        return {
            id: doc.id,
            lastUpdated,
            numberOfDays: data.numberOfDays,
            locationImage: data.locationImage,
            soreSize: data.soreSize,
            painLevel: data.painLevel,
            xCoordinateZoomed: data.xCoordinateZoomed,
            yCoordinateZoomed: data.yCoordinateZoomed,
            xCoordinateScaled: data.xCoordinateScaled,
            yCoordinateScaled: data.yCoordinateScaled,
        };
    });

    return cankerSores;
};

export const saveSore = async (cankerSore: CankerSore) => {
  try {
    const cankerSoreRef = doc(collection(db, "cankerSores"), cankerSore.id);
    await setDoc(cankerSoreRef, cankerSore);
    console.log("Document successfully written!");
  } catch (error) {
    console.error("Error writing document: ", error);
  }
};

