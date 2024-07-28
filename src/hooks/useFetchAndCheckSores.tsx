import { useEffect } from 'react';

import { loadSores, checkDailyLogStatus } from '@/services/firestoreService';

export const useFetchAndCheck = (
  setSores,
  setSelectedSore,
  setLogCompleted,
  setMode,
  today
) => {
  useEffect(() => {
    const fetchAndCheck = async () => {
      const cachedSores = JSON.parse(
        localStorage.getItem('activesores') || '[]'
      );
      setSores(cachedSores);
      setSelectedSore(cachedSores[0]);

      const activeSores = await loadSores('activesores');
      setSores(activeSores);
      localStorage.setItem('activesores', JSON.stringify(activeSores));

      if (activeSores[0]) {
        const result = checkDailyLogStatus(activeSores[0].updated);
        setLogCompleted(result);

        if (!result && activeSores.length) {
          setMode('update');
          const updatedSores = activeSores.map((sore) => ({
            ...sore,
            ...(sore.updated.includes(today)
              ? {}
              : {
                  size: [...sore.size, sore.size.at(-1) ?? 5],
                  pain: [...sore.pain, sore.pain.at(-1) ?? 5],
                  updated: [...sore.updated, today],
                }),
          }));
          setSores(updatedSores);
          localStorage.setItem('activesores', JSON.stringify(updatedSores));
          setSelectedSore(updatedSores[0]);
        }
      }
    };

    fetchAndCheck();
  }, [setSores, setSelectedSore, setLogCompleted, setMode, today]);
};
