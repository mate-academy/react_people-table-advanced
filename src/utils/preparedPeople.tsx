/* eslint-disable max-len */
import { Person } from '../types';
import { Sex } from '../types/Sex';
import { Centuries } from '../types/Centuries';
import { SortField } from '../types/SortField';
import { Order } from '../types/Order';

type Props = {
  people: Person[];
  sex: Sex;
  query: string;
  centuries: Centuries;
  sort: SortField,
  order: Order,
};

export const preparedPeople = ({
  people,
  sex,
  query,
  centuries,
  sort,
  order,
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

  if (sort) {
    switch (sort) {
      case SortField.name:
        newPeople = [...newPeople].sort((p1, p2) => p1.name.localeCompare(p2.name));
        break;

      case SortField.sex:
        newPeople = [...newPeople].sort((p1, p2) => p1.sex.localeCompare(p2.sex));
        break;

      case SortField.born:
        newPeople = [...newPeople].sort((p1, p2) => p1.born - p2.born);
        break;

      case SortField.died:
        newPeople = [...newPeople].sort((p1, p2) => p1.died - p2.died);
        break;

      default:
        newPeople = [...newPeople];
    }
  }

  if (order) {
    switch (order) {
      case Order.desc:
        newPeople = [...newPeople].reverse();
        break;

      default:
        newPeople = [...newPeople];
    }
  }

  return newPeople;
};
