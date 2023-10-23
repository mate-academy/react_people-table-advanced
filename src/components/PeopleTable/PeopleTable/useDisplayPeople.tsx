import { useSearchParams } from 'react-router-dom';
import { Person } from '../../../types';

export const useDisplayPeople = () => {
  const [searchParams] = useSearchParams();

  const displayedPeople = (people: Person[]) => {
    let filteredPeople = [...people];

    const gender = searchParams.get('sex');
    const query = searchParams.get('query');
    const centuries = searchParams.getAll('centuries');

    filteredPeople = gender
      ? filteredPeople.filter(person => person.sex === gender)
      : filteredPeople;

    filteredPeople = query
      ? filteredPeople.filter(person => person
        .name.toLocaleLowerCase().includes(query.toLocaleLowerCase())
      || person.motherName?.toLocaleLowerCase()
        .includes(query.toLocaleLowerCase())
      || person.fatherName?.toLocaleLowerCase()
        .includes(query.toLocaleLowerCase()))
      : filteredPeople;

    filteredPeople = centuries.length > 0
      ? filteredPeople.filter(person => centuries
        .includes((Math.ceil(Number(person.born) / 100)).toString()))
      : filteredPeople;

    const sort = searchParams.get('sort');

    if (sort) {
      if (sort === 'born' || sort === 'died') {
        filteredPeople.sort((a, b) => {
          return a[sort] - b[sort];
        });
      }

      if (sort === 'name' || sort === 'sex') {
        filteredPeople.sort((a, b) => {
          return a[sort].localeCompare(b[sort]);
        });
      }
    }

    const order = searchParams.get('order');

    if (order) {
      filteredPeople.reverse();
    }

    return filteredPeople;
  };

  return { displayedPeople };
};
