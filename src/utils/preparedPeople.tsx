/* eslint-disable max-len */
import { Person } from '../types';
import { Sex } from '../types/Sex';
import { Centuries } from '../types/Centuries';

type Props = {
  people: Person[];
  sex: Sex;
  query: string;
  centuries: Centuries;
};

export const preparedPeople = ({
  people,
  sex,
  query,
  centuries,
}: Props): Person[] => {
  let newPeople = [...people];

  if (query) {
    const normalizedQuery = query.toLocaleLowerCase();

    newPeople = newPeople.filter(
      person => person.name.toLowerCase().includes(normalizedQuery)
      || person.fatherName?.toLowerCase().includes(normalizedQuery)
      || person.motherName?.toLowerCase().includes(normalizedQuery),
    );
  }

  if (sex) {
    switch (sex) {
      case Sex.male:
        newPeople = newPeople.filter(person => person.sex === 'm');
        break;

      case Sex.female:
        newPeople = newPeople.filter(person => person.sex === 'f');
        break;

      default:
        newPeople = [...newPeople];
    }
  }

  if (centuries) {
    switch (centuries) {
      case Centuries.sixteen:
        newPeople = newPeople.filter(person => Math.ceil(person.born / 100) === 16);
        break;

      case Centuries.seventeen:
        newPeople = newPeople.filter(person => Math.ceil(person.born / 100) === 17);
        break;

      case Centuries.eighteen:
        newPeople = newPeople.filter(person => Math.ceil(person.born / 100) === 18);
        break;

      case Centuries.nineteen:
        newPeople = newPeople.filter(person => Math.ceil(person.born / 100) === 19);
        break;

      case Centuries.twenty:
        newPeople = newPeople.filter(person => Math.ceil(person.born / 100) === 20);
        break;

      default:
        newPeople = [...newPeople];
    }
  }

  return newPeople;
};
