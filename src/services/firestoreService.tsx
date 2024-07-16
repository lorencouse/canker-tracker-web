import {
  collection,
  getDocs,
  setDoc,
  deleteDoc,
  doc,
  writeBatch,
  getDoc,
  FirestoreError,
} from 'firebase/firestore';

import { db } from '../firebaseConfig';
import type { CankerSore } from '../types';

export const saveData = async (
  collectionName: string,
  docId: string,
  docData: Object
) => {
  try {
    const docRef = doc(collection(db, collectionName), docId);
    await setDoc(docRef, docData);
    console.log('Document successfully written!');
  } catch (error) {
    console.error(
      'Error writing document: ',
      error instanceof FirestoreError ? error.message : error
    );
  }
};

export const loadSores = async (
  collectionPath: string
): Promise<CankerSore[]> => {
  try {
    const soresCollection = collection(db, collectionPath);
    const querySnapshot = await getDocs(soresCollection);

    const cankerSores: CankerSore[] = querySnapshot.docs.map((doc) => {
      const data = doc.data();

      const lastUpdated =
        data.lastUpdated?.map((timestamp: { toDate: () => Date }) =>
          timestamp.toDate()
        ) || [];

      return {
        id: doc.id,
        active: data.active,
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
  } catch (e) {
    console.error('Error fetching documents: ', e);
    throw e;
  }
};

export const deleteSore = async (collectionPath: string, soreId: string) => {
  try {
    const soreRef = doc(db, collectionPath, soreId);
    await deleteDoc(soreRef);
    console.log(
      `CankerSore with ID ${soreId} has been deleted from ${collectionPath}.`
    );
  } catch (error) {
    console.error('Error deleting CankerSore:', error);
    throw error;
  }
};

export const clearAllSores = async (collectionPath: string) => {
  try {
    const querySnapshot = await getDocs(collection(db, collectionPath));
    const batch = writeBatch(db);

    querySnapshot.forEach((document) => {
      batch.delete(document.ref);
    });

    await batch.commit();
    console.log('All canker sore data cleared from', collectionPath);
  } catch (error) {
    console.error('Error clearing all canker sores:', error);
    throw error;
  }
};

// Last Log Time

const LOG_REF = doc(db, 'settings', 'logTime'); // Define a single reference path

export const saveLogTime = async (date: Date) => {
  try {
    await setDoc(LOG_REF, { time: date });
    console.log('Log time successfully saved!');
  } catch (error) {
    console.error(
      'Error saving log time: ',
      error instanceof FirestoreError ? error.message : error
    );
  }
};

export const loadLogTime = async () => {
  try {
    const docSnap = await getDoc(LOG_REF);
    if (docSnap.exists()) {
      console.log('Document data:', docSnap.data());
      return new Date(docSnap.data().time); // Assuming the stored data has a 'time' property
    }
    console.log('No such document!');
    return null; // Return null if the document doesn't exist
  } catch (e) {
    console.error('Error loading log time: ', e);
    throw e;
  }
};
