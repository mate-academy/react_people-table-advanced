import { Person } from '../types/Person';

export const getSortComparator = (type: keyof Person, order: string) => {
  return (arr: Person[]) => {
    return [...arr].sort((a, b) => {
      if (typeof a[type] === 'string') {
        return order === 'desc'
          ? (b[type] as string).localeCompare(a[type] as string)
          : (a[type] as string).localeCompare(b[type] as string);
      } else {
        return order === 'desc'
          ? (b[type] as number) - (a[type] as number)
          : (a[type] as number) - (b[type] as number);
      }
    });
  };
};
