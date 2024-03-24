import { Person } from '../types/Person';
import { SortType } from '../types/SortType';

export const getCorrectPeople = (
  people: Person[],
  query: string,
  sex: string,
  numbers: string[],
  sort: string,
  order: string,
): Person[] => {
  let correctPeople = [...people];

  correctPeople = correctPeople.map(person => {
    const newPerson = { ...person };

    newPerson.father = people.find(
      father => father.name === newPerson.fatherName,
    );

    newPerson.mother = people.find(
      mother => mother.name === newPerson.motherName,
    );

    return newPerson;
  });

  switch (sort) {
    case SortType.Name: {
      correctPeople = correctPeople.sort((person1, perosn2) =>
        person1.name.localeCompare(perosn2.name),
      );

      break;
    }

    case SortType.Sex: {
      correctPeople = correctPeople.sort((person1, perosn2) =>
        person1.sex.localeCompare(perosn2.sex),
      );

      break;
    }

    case SortType.Born: {
      correctPeople = correctPeople.sort(
        (person1, perosn2) => person1.born - perosn2.born,
      );

      break;
    }

    case SortType.Died: {
      correctPeople = correctPeople.sort(
        (person1, perosn2) => person1.died - perosn2.died,
      );

      break;
    }

    default: {
      break;
    }
  }

  if (order) {
    correctPeople = correctPeople.reverse();
  }

  if (query) {
    const correctQuery = query.toLowerCase().trim();

    correctPeople = correctPeople.filter(person => {
      return (
        person.name.toLowerCase().includes(correctQuery) ||
        person.fatherName?.toLowerCase().includes(correctQuery) ||
        person.motherName?.toLowerCase().includes(correctQuery)
      );
    });
  }

  if (sex) {
    correctPeople = correctPeople.filter(person => person.sex === sex);
  }

  if (numbers.length) {
    correctPeople = correctPeople.filter(person => {
      const bornCent = Math.ceil(person.born / 100);
      const diedCent = Math.ceil(person.died / 100);

      return numbers.includes(`${bornCent}`) || numbers.includes(`${diedCent}`);
    });
  }

  return correctPeople;
};
