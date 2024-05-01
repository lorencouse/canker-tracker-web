import { db } from '../firebaseConfig';
import { collection, getDocs, getDoc, setDoc, deleteDoc, doc, writeBatch, query, where, FirestoreError } from 'firebase/firestore';
import { CankerSore, DailyLog } from '../types';


export const saveData = async (collectionName: string, docId: string, docData: Object) => {
  try {
    const docRef = doc(collection(db, collectionName), docId);
    await setDoc(docRef, docData);
    console.log("Document successfully written!");
  } catch (error) {
    console.error("Error writing document: ", error instanceof FirestoreError ? error.message : error);
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
            active: data.active,
            lastUpdated: lastUpdated,
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

// export const saveSore = async (cankerSore: CankerSore) => {
//   try {
//     const cankerSoreRef = doc(collection(db, "cankerSores"), cankerSore.id);
//     await setDoc(cankerSoreRef, cankerSore);
//     console.log("Document successfully written!");
//   } catch (error) {
//     console.error("Error writing document: ", error);
//   }
// };

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

// Last Log Time

const LOG_REF = doc(db, "settings", "logTime"); // Define a single reference path

export const saveLogTime = async (date: Date) => {
  try {
    await setDoc(LOG_REF, { time: date });
    console.log("Log time successfully saved!");
  } catch (error) {
    console.error("Error saving log time: ", error instanceof FirestoreError ? error.message : error);
  }
};

export const loadLogTime = async () => {
  try {
    const docSnap = await getDoc(LOG_REF);
    if (docSnap.exists()) {
      console.log("Document data:", docSnap.data());
      return new Date(docSnap.data().time); // Assuming the stored data has a 'time' property
    } else {
      console.log("No such document!");
      return null; // Return null if the document doesn't exist
    }
  } catch (e) {
    console.error("Error loading log time: ", e);
    throw e;
  }
};