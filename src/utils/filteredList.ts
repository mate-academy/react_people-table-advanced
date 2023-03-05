import { Person } from '../types';

const caseInsensitive = (word: string) => word.split('').map(l => {
  return l.toUpperCase().toLowerCase();
}).join('');

export const filteredList = (
  people: Person[],
  sex: string | null,
  query: string | null,
  centuries: string[] | null,
) => people?.filter(
  person => {
    const father = person.father?.name || '';
    const mother = person.mother?.name || '';
    const { name } = person;
    const queryInsensetive = caseInsensitive(query || '');

    return (sex ? person.sex === sex : true)
      && (query
        ? caseInsensitive(name).includes(queryInsensetive)
          || caseInsensitive(mother).includes(queryInsensetive)
          || caseInsensitive(father).includes(queryInsensetive)
        : true)
      && (centuries?.length
        ? centuries.includes(`${Math.ceil(person.born / 100)}`)
        : true);
  },
);
