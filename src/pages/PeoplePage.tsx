import { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { PeopleFilters, allCenturies } from '../components/PeopleFilters';
import { PeopleTable } from '../components/PeopleTable';
import { Loader } from '../components/Loader/Loader';
import { Person } from '../types';
import { getPeople } from '../api';

export const PeoplePage = () => {
  const [people, setPeople] = useState<Person[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [isError, setIsError] = useState<boolean>(false);
  const [searchParams] = useSearchParams();
  const centuries = searchParams.getAll('centuries') || allCenturies;
  const query = searchParams.get('query') as string;
  const order = searchParams.get('order');
  const sort = searchParams.get('sort') as string;

  // eslint-disable-next-line
  const sortPeople = (a: string | number, b: string | number, orderOfSort: string | null) => {
    if (typeof a === 'string' && typeof b === 'string') {
      return orderOfSort === 'desc' ? b.localeCompare(a) : a.localeCompare(b);
    }

    if (typeof a === 'number' && typeof b === 'number') {
      return orderOfSort === 'desc' ? (b as number) - (a as number) : a - b;
    }

    return 0;
  };

  const fetchPeople = () => {
    setIsLoading(true);
    getPeople()
      .then(setPeople)
      .catch(() => setIsError(true))
      .finally(() => setIsLoading(false));
  };

  useEffect(fetchPeople, []);

  const filterPeople = (person: Person) => {
    const isMale = searchParams.toString().includes('m');
    const isFemale = searchParams.toString().includes('f');
    // eslint-disable-next-line
    const isInCentury = centuries.includes(Math.ceil(person.born / 100).toString());
    const matchesQuery = query !== null && (
      person.name.toLowerCase().includes(query.toLowerCase())
      || person.motherName?.toLowerCase().includes(query.toLowerCase())
      || person.fatherName?.toLowerCase().includes(query.toLowerCase())
    );

    return (
      ((!isMale && !isFemale) || (person.sex === (isMale ? 'm' : 'f')))
      && (centuries.length === 0 || isInCentury)
      && (query === null || matchesQuery)
    );
  };

  const peopleWithParents = people
    .map(person => ({
      ...person,
      mother: people.find(element => element.name === person.motherName),
      father: people.find(element => element.name === person.fatherName),
    }))
    .filter(filterPeople)
    .sort((a, b) => {
      const aValue = a[sort as keyof Person];
      const bValue = b[sort as keyof Person];

      if ((typeof aValue === 'string' || typeof aValue === 'number')
          && (typeof bValue === 'string' || typeof bValue === 'number')) {
        // eslint-disable-next-line
        return sortPeople(aValue as string | number, bValue as string | number, order);
      }

      return 0;
    });

  return (
    <>
      <h1 className="title">People Page</h1>

      <div className="block">
        <div className="columns is-desktop is-flex-direction-row-reverse">
          <div className="column is-7-tablet is-narrow-desktop">
            {!isLoading && <PeopleFilters />}
          </div>

          <div className="column">
            <div className="box table-container">
              {isLoading && <Loader />}
              {/* eslint-disable-next-line */ }
              {isError && <p data-cy="peopleLoadingError">Something went wrong</p>}
              {/* eslint-disable-next-line */ }
              {people.length === 0 && !isLoading && <p data-cy="noPeopleMessage">There are no people on the server</p>}
              {/* eslint-disable-next-line */ }
              {!isLoading && peopleWithParents.length === 0 && <p>There are no people matching the current search criteria</p>}
              {!isLoading && <PeopleTable people={peopleWithParents} />}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
