import { KeyProps } from '../types';

export function getNextSortOrder(
  currentKey: KeyProps | null,
  currentOrder: 'asc' | 'desc',
  key: KeyProps,
) {
  if (currentKey !== key) {
    return 'asc';
  }

  if (currentOrder === 'asc') {
    return 'desc';
  }

  return null;
}
