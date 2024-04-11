import { useEffect, useState } from 'react';
import { Loader } from '../components/Loader';
import { getPeople } from '../api';
import { Person } from '../types';
import { PeopleTable } from '../components/PeopleTable';
import { getPreparedPeople } from '../utils/getPreparedPeople';
import { PeopleFilters } from '../components/PeopleFilters';
import { useSearchParams } from 'react-router-dom';
import { Sex } from '../types/Sex';

export const PeoplePage = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);
  const [people, setPeople] = useState<Person[]>([]);

  const [searchParams] = useSearchParams();

  const loadingError = !isLoading && isError;
  const emptyPeopleList = !isLoading && !isError && !people.length;
  const peopleList = !isLoading && !isError && !!people.length;

  useEffect(() => {
    setIsLoading(true);

    getPeople()
      .then(setPeople)
      .catch(() => setIsError(true))
      .finally(() => {
        setIsLoading(false);
      });
  }, []);

  const preparedPeople = getPreparedPeople(people);

  const handleFilter = () => {
    let filteredPeople = [...preparedPeople];
    const query = searchParams.get('query') || '';
    const centuries = searchParams.getAll('centuries') || [];
    const sex = searchParams.get('sex') || '';

    if (query) {
      filteredPeople = filteredPeople.filter(person =>
        person.name.toLowerCase().includes(query.toLowerCase()),
      );
    }

    if (!!centuries.length) {
      filteredPeople = filteredPeople.filter(person => {
        return centuries.includes(`${Math.ceil(person.born / 100)}`);
      });
    }

    if (sex) {
      switch (sex) {
        case 'm':
          return filteredPeople.filter(person => person.sex === Sex.Male);
        case 'f':
          return filteredPeople.filter(person => person.sex === Sex.Female);
        default:
          return filteredPeople;
      }
    }

    return filteredPeople;
  };

  const handleSort = () => {
    const sortedPeople = handleFilter();
    const sort = (searchParams.get('sort') || '') as keyof Person;
    const order = searchParams.get('order') || '';

    const newOutPut = sortedPeople.sort((a: Person, b: Person) => {
      const valueA = a[sort];
      const valueB = b[sort];

      if (typeof valueA === 'string' && typeof valueB === 'string') {
        return valueA.localeCompare(valueB);
      }

      if (typeof valueA === 'number' && typeof valueB === 'number') {
        return valueA - valueB;
      }

      return 0;
    });

    if (sort && !order) {
      return newOutPut;
    }

    if (sort && order) {
      return newOutPut.reverse();
    }

    return [...sortedPeople];
  };

  const sortedPeople = handleSort();

  return (
    <>
      <h1 className="title">People Page</h1>

      <div className="block">
        <div className="columns is-desktop is-flex-direction-row-reverse">
          <div className="column is-7-tablet is-narrow-desktop">
            <PeopleFilters handleFilter={handleFilter} />
          </div>

          <div className="column">
            <div className="box table-container">
              {isLoading && <Loader />}

              {loadingError && (
                <p data-cy="peopleLoadingError" className="has-text-danger">
                  Something went wrong
                </p>
              )}

              {emptyPeopleList && (
                <p data-cy="noPeopleMessage">
                  There are no people on the server
                </p>
              )}

              {peopleList && <PeopleTable people={sortedPeople} />}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
