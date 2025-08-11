import { Person } from '../types';

export const matchesQuery = (str: string, query: string) =>
  str.toLowerCase().includes(query.toLowerCase());

export const filterByQuery = (people: Person[], query: string) =>
  people.filter(
    person =>
      matchesQuery(person.name, query) ||
      (person.motherName && matchesQuery(person.motherName, query)) ||
      (person.fatherName && matchesQuery(person.fatherName, query)),
  );

export const filterBySex = (people: Person[], selectedSex: string) =>
  selectedSex ? people.filter(person => person.sex === selectedSex) : people;

export const filterByCenturies = (
  people: Person[],
  selectedCenturies: number[],
) =>
  people.filter(person => {
    const birthCentury = Math.ceil(person.born / 100);

    return (
      selectedCenturies.length === 0 || selectedCenturies.includes(birthCentury)
    );
  });
