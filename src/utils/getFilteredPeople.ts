/* eslint-disable react-hooks/rules-of-hooks */
import { useMemo } from 'react';
import { Person } from '../types/Person';
import { SortType } from '../types/SortType';

export const getFilteredPeople = (
  people: Person[],
  query: string,
  sex: string,
  numbers: string[],
  sort: string,
  order: string,
): Person[] => {
  let preparedPeople = useMemo(() => {
    return people.map(person => {
      const father = people.find(human => human.name === person.fatherName);

      const mother = people.find(human => human.name === person.motherName);

      return { ...person, father, mother };
    });
  }, [people]);

  switch (sort) {
    case SortType.Name: {
      preparedPeople = preparedPeople.sort((person1, person2) =>
        person1.name.localeCompare(person2.name),
      );

      break;
    }

    case SortType.Sex: {
      preparedPeople = preparedPeople.sort((person1, person2) =>
        person1.sex.localeCompare(person2.sex),
      );

      break;
    }

    case SortType.Born: {
      preparedPeople = preparedPeople.sort(
        (person1, person2) => person1.born - person2.born,
      );

      break;
    }

    case SortType.Died: {
      preparedPeople = preparedPeople.sort(
        (person1, person2) => person1.died - person2.died,
      );

      break;
    }

    default: {
      break;
    }
  }

  if (order) {
    preparedPeople = preparedPeople.reverse();
  }

  if (query) {
    const correctQuery = query.toLowerCase().trim();

    preparedPeople = preparedPeople.filter(person => {
      return (
        person.name.toLowerCase().includes(correctQuery) ||
        person.fatherName?.toLowerCase().includes(correctQuery) ||
        person.motherName?.toLowerCase().includes(correctQuery)
      );
    });
  }

  if (sex) {
    preparedPeople = preparedPeople.filter(person => person.sex === sex);
  }

  if (numbers.length) {
    preparedPeople = preparedPeople.filter(person => {
      const bornCent = Math.ceil(person.born / 100);
      const diedCent = Math.ceil(person.died / 100);

      return numbers.includes(`${bornCent}`) || numbers.includes(`${diedCent}`);
    });
  }

  return preparedPeople;
};
