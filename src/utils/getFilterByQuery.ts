import { Person } from '../types';

export const getFilterByQuery = (currentPeople: Person[], query: string) => {
  return currentPeople.filter(
    item =>
      item.name.toLowerCase().includes(query) ||
      item.fatherName?.toLowerCase().includes(query) ||
      item.motherName?.toLowerCase().includes(query),
  );
};
