// import { useCankerSores } from "../context/CankerSoresContext";
import type { RefObject } from 'react';
import type React from 'react';
import { v4 as uuidv4 } from 'uuid';

import type { CankerSore } from '../types';

const calcView = (x: number, y: number) => {
  const dimensions = 600;
  if (y < dimensions / 2) {
    if (x < dimensions * 0.33) {
      return 'Left Cheek';
    }
    if (x < dimensions * 0.66) {
      return 'Upper Mouth';
    }
    return 'Right Cheek';
  }
  if (x < dimensions * 0.33) {
    return 'Left Jaw';
  }
  if (x < dimensions * 0.66) {
    return 'Lower Mouth';
  }
  return 'Right Jaw';
};

export default calcView;
