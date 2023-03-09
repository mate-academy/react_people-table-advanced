import { Person } from '../types';

const caseInsensitive = (word: string) => word.split('').map(l => {
  return l.toUpperCase().toLowerCase();
}).join('');

export const filteredList = (
  people: Person[],
  sexParams: string | null,
  query: string | null,
  centuriesParams: string[] | null,
) => people?.filter(
  person => {
    const father = person.father?.name || '';
    const mother = person.mother?.name || '';
    const {
      name,
      born,
      sex,
    } = person;
    const queryInsensetive = caseInsensitive(query || '');

    const isNameContainsQuery = () => {
      return !centuriesParams?.length
      || caseInsensitive(name).includes(queryInsensetive)
      || caseInsensitive(mother).includes(queryInsensetive)
      || caseInsensitive(father).includes(queryInsensetive);
    };

    const isPeopleBirthCentury = () => {
      return !centuriesParams?.length
      || centuriesParams?.includes(`${Math.ceil(born / 100)}`);
    };

    const isSelectedSex = () => !sexParams || sex === sexParams;

    return isSelectedSex() && isNameContainsQuery() && isPeopleBirthCentury();
  },
);
