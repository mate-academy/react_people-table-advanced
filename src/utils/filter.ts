import { Person, PersonsKeys } from '../types';
import { Sex } from '../types/Sex';
import { Param } from './search';

const normalizeText = (text: string | null) => {
  if (!text) {
    return '';
  }

  return text.toLowerCase().trim();
};

export const getPeopleFilter = (
  listPeople: Person[],
  queryName: string,
  date: string[],
  gender: Sex,
  sortParam: PersonsKeys | '',
  desc: string,
) => {
  let filterPeople = [...listPeople];

  if (queryName) {
    filterPeople = filterPeople.filter(
      person => normalizeText(person.name).includes(normalizeText(queryName))
        || normalizeText(person.fatherName).includes(normalizeText(queryName))
        || normalizeText(person.motherName).includes(normalizeText(queryName)),
    );
  }

  if (date.length > 0) {
    filterPeople = filterPeople.filter(
      person => date.includes((Math.ceil(person.born / 100).toString())),
    );
  }

  if (gender) {
    filterPeople = filterPeople.filter(
      person => person.sex === gender,
    );
  }

  if (sortParam) {
    filterPeople = filterPeople.sort((a, b) => {
      let aValue = a[sortParam] as Param || '';
      let bValue = b[sortParam] as Param || '';

      if (typeof aValue === 'number' && typeof bValue === 'number') {
        return aValue - bValue;
      }

      if (typeof aValue === 'number' || typeof bValue === 'number') {
        aValue = aValue.toString();
        bValue = bValue.toString();
      }

      return normalizeText(aValue).localeCompare(normalizeText(bValue));
    });
  }

  if (desc) {
    filterPeople = filterPeople.reverse();
  }

  return filterPeople;
};
