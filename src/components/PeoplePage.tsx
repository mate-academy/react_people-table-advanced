import { PeopleFilters } from './PeopleFilters';
import { Loader } from './Loader';
import { PeopleTable } from './PeopleTable';
import { useEffect, useMemo, useState } from 'react';
import { getPeople } from '../api';
import { Person } from '../types';
import { useSearchParams } from 'react-router-dom';

export const PeoplePage = () => {
  const [people, setPeople] = useState<Person[]>([]);
  const [isError, setIsError] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [searchParams] = useSearchParams();

  useEffect(() => {
    setIsLoading(true);
    getPeople()
      .then(result => setPeople(result))
      .catch(() => {
        setIsError(true);
      })
      .finally(() => {
        setIsLoading(false);
      });
  }, []);

  const visiblePeople = useMemo(() => {
    const query = searchParams.get('query') || '';
    const sex = searchParams.get('sex');
    const centuries = searchParams.getAll('centuries');
    const sort = searchParams.get('sort');
    const order = searchParams.get('order');

    let tempPeople = [...people];

    if (sex) {
      tempPeople = tempPeople.filter(person => person.sex === sex);
    }

    if (centuries.length > 0) {
      tempPeople = tempPeople.filter(person =>
        centuries.includes(Math.ceil(person.born / 100).toString()),
      );
    }

    if (query !== '') {
      const queryInLowerCase = query.toLowerCase();

      const matchesQuery = (
        value: string | null | undefined,
        q: string,
      ): boolean => {
        return value?.toLowerCase().includes(q) ?? false;
      };

      tempPeople = tempPeople.filter(person => {
        return (
          matchesQuery(person.name, queryInLowerCase) ||
          matchesQuery(person.motherName, queryInLowerCase) ||
          matchesQuery(person.fatherName, queryInLowerCase)
        );
      });
    }

    if (sort) {
      tempPeople.sort((personA, personB) => {
        switch (sort) {
          case 'name':
            return personA.name.localeCompare(personB.name);
          case 'sex':
            return personA.sex.localeCompare(personB.sex);
          case 'born':
            return personA.born - personB.born;
          case 'died':
            return personA.died - personB.died;
          default:
            return 0;
        }
      });
    }

    if (order === 'desc') {
      tempPeople.reverse();
    }

    return tempPeople;
  }, [people, searchParams]);

  const showNoPeopleOnServer = !isLoading && !isError && people.length === 0;
  const showNoMatchingPeople =
    !isLoading && !isError && people.length > 0 && visiblePeople.length === 0;
  const showTable = !isLoading && !isError && visiblePeople.length > 0;
  const showFilters = !isLoading && !isError && people.length > 0;

  return (
    <>
      <h1 className="title">People Page</h1>

      <div className="block">
        <div className="columns is-desktop is-flex-direction-row-reverse">
          <div className="column is-7-tablet is-narrow-desktop">
            {showFilters && <PeopleFilters />}
          </div>

          <div className="column">
            <div className="box table-container">
              {isLoading && <Loader />}

              {isError && (
                <p data-cy="peopleLoadingError" className="has-text-danger">
                  Something went wrong
                </p>
              )}

              {showNoPeopleOnServer && (
                <p data-cy="noPeopleMessage">
                  There are no people on the server
                </p>
              )}

              {showNoMatchingPeople && (
                <p>There are no people matching the current search criteria</p>
              )}

              {showTable && <PeopleTable people={visiblePeople} />}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
