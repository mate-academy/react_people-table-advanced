import { Person } from '../types';

export function areArraysEqual(array1: Person[], array2: Person[]) {
  if (array1.length !== array2.length) {
    return false;
  }

  for (let i = 0; i < array1.length; i += 1) {
    const keys1 = Object.keys(array1[i]);
    const keys2 = Object.keys(array2[i]);

    if (keys1.length !== keys2.length
      || !keys1.every(key => keys2.includes(key))) {
      return false;
    }

    for (let j = 0; j < keys1.length; j += 1) {
      const key = keys1[j];

      if (array1[i][key] !== array2[i][key]) {
        return false;
      }
    }
  }

  return true;
}
