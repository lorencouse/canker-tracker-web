import { db } from '../firebaseConfig';
import { collection, addDoc, getDocs, writeBatch, deleteDoc, doc, setDoc, query, where } from 'firebase/firestore';
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

export const loadSores = async (viewName: string): Promise<CankerSore[]> => {
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
            zone: data.zone,
            gums: data.gums,
            soreSize: data.soreSize,
            painLevel: data.painLevel,
            xCoordinate: data.xCoordinate,
            yCoordinate: data.yCoordinate,
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

export const deleteSore = async (soreId: string) => {
  try {
    const soreRef = doc(db, 'cankerSores', soreId); 
    await deleteDoc(soreRef);
    console.log(`CankerSore with ID ${soreId} has been deleted.`);
  } catch (error) {
    console.error('Error deleting CankerSore:', error);
    throw error; 
  }
};

export const clearAllSores = async () => {
  const querySnapshot = await getDocs(collection(db, 'cankerSores'));
  const batch = writeBatch(db); 

  querySnapshot.forEach((document) => {
    batch.delete(document.ref); 
  });

  await batch.commit(); 
  console.log('All canker sore data cleared.');
};
