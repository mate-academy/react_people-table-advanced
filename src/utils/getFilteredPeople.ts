import { Person } from '../types';

type FuncParams = {
  people: Person[];
  query: string;
  sex: string;
  centuries: string[];
};

export const getFilteredPeople = ({
  people,
  query,
  sex,
  centuries,
}: FuncParams) => {
  let visiblePeople = [...people];

  if (query) {
    visiblePeople = visiblePeople.filter(person =>
      person.name.toLowerCase().includes(query.toLowerCase()),
    );
  }

  if (sex) {
    visiblePeople = visiblePeople.filter(person => person.sex === sex);
  }

  if (centuries.length) {
    visiblePeople = visiblePeople.filter(person =>
      centuries.includes(Math.ceil(person.born / 100).toString()),
    );
  }

  return visiblePeople;
};
