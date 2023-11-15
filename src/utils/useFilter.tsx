import { useSearchParams } from 'react-router-dom';
import { Person } from '../types/Person';

export const useFilter = (people: Person[]) => {
  const [searchParams] = useSearchParams();
  const query = searchParams.get('query') || '';
  const sex = searchParams.get('sex') || '';
  const centuries = searchParams.getAll('centuries') || [];
  let newPeople = [...people];

  if (query) {
    const normalizedQuery = query.toLowerCase();

    newPeople = newPeople
      .filter((person) => person.name.toLowerCase()
        .includes(normalizedQuery));
  }

  if (sex) {
    newPeople = newPeople.filter((person) => person.sex === sex);
  }

  if (centuries.length > 0) {
    let result:Person[] = [];

    centuries.forEach(century => {
      result = [...result, ...newPeople
        .filter(person => Math.ceil(person.born / 100) === +century)];
    });
    newPeople = result;
  }

  return newPeople;
};
