import { Person } from '../types';

type Props = {
  people: Person[];
  sex: string
  centuries: string[];
  query: string;
};

function normalized(string: string | undefined) {
  if (string) {
    return string?.trim().toLowerCase();
  }

  return '';
}

function getCentury(born: number) {
  return `${Math.ceil(born / 100)}`;
}

export const getFilteredPeople = ({
  people,
  sex,
  query,
  centuries,
}: Props) => {
  let preparedPeople = people;

  if (sex) {
    preparedPeople = preparedPeople.filter(person => person.sex === sex);
  }

  if (query) {
    preparedPeople = preparedPeople.filter(person => (
      normalized(person.name).includes(normalized(query))
        || normalized(person.mother?.name).includes(normalized(query))
        || normalized(person.father?.name).includes(normalized(query))
    ));
  }

  if (centuries.length) {
    preparedPeople = preparedPeople.filter(person => (
      centuries.includes(getCentury(person.born))
    ));
  }

  return preparedPeople;
};
