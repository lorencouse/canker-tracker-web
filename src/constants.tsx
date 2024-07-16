import { v4 as uuidv4 } from 'uuid';

import type { CankerSore } from './types';

export const newSore: CankerSore = {
  id: uuidv4(),
  updated: [new Date()],
  zone: viewName,
  gums: false,
  size: [3],
  pain: [3],
  x: 0,
  y: 0,
};
