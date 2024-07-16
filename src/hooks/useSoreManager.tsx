import { useUIContext } from '../Context/UiContext';
import { auth } from '../firebaseConfig';
import {
  clearAllSores,
  loadSores,
  saveData,
  deleteSore,
} from '../services/firestoreService';
import type { CankerSore } from '../types';

export function useSoreManager() {
  const { cankerSores, setCankerSores, selectedSore, setSelectedSore } =
    useUIContext();

  const cacheSoresToLocalStorage = (userId: string, sores: CankerSore[]) => {
    localStorage.setItem(`cankerSores_${userId}`, JSON.stringify(sores));
  };

  const fetchSores = async () => {
    const userId = auth.currentUser?.uid;
    if (!userId) return;

    const cachedSores = localStorage.getItem(`cankerSores_${userId}`);
    if (cachedSores) {
      setCankerSores(JSON.parse(cachedSores));
      console.log('Sores loaded from cache.');
    }

    try {
      const sores = await loadSores(`users/${userId}/cankerSores`);
      setCankerSores(sores);
      cacheSoresToLocalStorage(userId, sores);
      console.log('Sores loaded from Firestore.');
    } catch (error) {
      console.error(`Failed to load sores: ${error}`);
    }
  };

  const addSore = async (sore: CankerSore) => {
    const userId = auth.currentUser?.uid;
    if (!userId) return;

    try {
      await saveData(`users/${userId}/cankerSores`, sore.id, sore);
      console.log('Sore saved to server.');

      const newSores = [...cankerSores, sore];
      setCankerSores(newSores);
      cacheSoresToLocalStorage(userId, newSores);
    } catch (error) {
      console.error('Failed to add sore', error);
    }
  };

  const updateSore = async (sore: CankerSore) => {
    const userId = auth.currentUser?.uid;
    if (!userId) return;

    try {
      await saveData(`users/${userId}/cankerSores`, sore.id, sore);
      const newSores = cankerSores.map((s) => (s.id === sore.id ? sore : s));
      setCankerSores(newSores);
      cacheSoresToLocalStorage(userId, newSores);
    } catch (error) {
      console.error(`Failed to update sore: ${error}`);
    }
  };

  const removeSore = async () => {
    const userId = auth.currentUser?.uid;
    if (!userId || !selectedSore) return;

    try {
      await deleteSore(`users/${userId}/cankerSores`, selectedSore.id);
      const newCankerSores = cankerSores.filter(
        (sore) => sore.id !== selectedSore.id
      );
      setCankerSores(newCankerSores);
      cacheSoresToLocalStorage(userId, newCankerSores);
      setSelectedSore(null);
    } catch (error) {
      console.error('Failed to delete sore: ', error);
    }
  };

  const removeAllSores = async () => {
    const userId = auth.currentUser?.uid;
    if (!userId) return;

    try {
      await clearAllSores(`users/${userId}/cankerSores`);
      setCankerSores([]);
      localStorage.removeItem(`cankerSores_${userId}`);
    } catch (error) {
      console.error(`Could not remove sores: ${error}`);
    }
  };

  const updateSoreNewDay = () => {
    const userId = auth.currentUser?.uid;
    if (!userId) return;

    if (selectedSore) {
      const oldSore = cankerSores.find((sore) => sore.id === selectedSore.id);
      if (oldSore) {
        const newSore: CankerSore = {
          ...oldSore,
          soreSize: oldSore.soreSize.concat(selectedSore.soreSize),
          painLevel: oldSore.painLevel.concat(selectedSore.painLevel),
          lastUpdated: oldSore.lastUpdated.concat(new Date()),
        };
        updateSore(newSore);
      }
    }
  };

  return {
    fetchSores,
    addSore,
    updateSore,
    updateSoreNewDay,
    removeSore,
    removeAllSores,
    setSelectedSore,
  };
}
