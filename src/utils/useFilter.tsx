import { useSearchParams } from 'react-router-dom';
import { Person } from '../types/Person';

export const useFilter = (people: Person[]) => {
  const [searchParams] = useSearchParams();
  const query = searchParams.get('query') || '';
  const sex = searchParams.get('sex') || '';
  const centuries = searchParams.getAll('centuries') || [];
  const sort = searchParams.get('sort') || '';
  const order = searchParams.get('order') || '';
  let newPeople = [...people];

  if (query) {
    const normalizedQuery = query.toLowerCase();

    newPeople = newPeople
      .filter((person) => person.name.toLowerCase().includes(normalizedQuery));
  }

  if (sex) {
    newPeople = newPeople.filter((person) => person.sex === sex);
  }

  if (centuries.length > 0) {
    let result: Person[] = [];

    centuries.forEach((century) => {
      result = [
        ...result,
        ...newPeople.filter(
          (person) => Math.ceil(person.born / 100) === +century,
        ),
      ];
    });
    newPeople = result;
  }

  if (sort) {
    newPeople = newPeople.sort((person1, person2) => {
      switch (sort) {
        case 'born':
          if (order === 'desc') {
            return person2.born - person1.born;
          }

          return person1.born - person2.born;

        case 'died':
          if (order === 'desc') {
            return person2.died - person1.died;
          }

          return person1.died - person2.died;
        case 'name':
          if (order === 'desc') {
            return person2.name.localeCompare(person1.name);
          }

          return person1.name.localeCompare(person2.name);
        case 'sex':
          if (order === 'desc') {
            return person2.sex.localeCompare(person1.sex);
          }

          return person1.sex.localeCompare(person2.sex);
        default:
          return 1;
      }
    });
  }

  return newPeople;
};
