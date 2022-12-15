import { useEffect, useMemo, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { getPeople } from '../api';
import { Person } from '../types';
import { Loader } from './Loader';
import { PeopleFilters } from './PeopleFilters';
import { PeopleTable } from './PeopleTable';

export const PeoplePage = () => {
  const [people, setPeople] = useState<Person[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState(false);

  const [searchParams] = useSearchParams();

  const sexParam = searchParams.get('sex') || 'all';
  const query = searchParams.get('query');
  const centuries = searchParams.getAll('centuries') || [];

  const isEmptyFilter = useMemo(() => {
    return !searchParams.toString();
  }, [searchParams]);

  const handleGetPeople = async () => {
    try {
      const data = await getPeople();

      const dataWithParents = data.map(person => {
        return {
          ...person,
          mother: data.find(anyone => anyone.name === person.motherName),
          father: data.find(anyone => anyone.name === person.fatherName),
        };
      });

      setPeople(dataWithParents);
    } catch {
      setError(true);
    } finally {
      setIsLoading(false);
    }
  };

  const handleFilterPeople = () => {
    let newPeope: Person[] = [];

    if (sexParam !== 'all') {
      newPeope = people.filter((person: Person) => person.sex === sexParam);
    } else {
      newPeope = [...people];
    }

    if (query) {
      newPeope = newPeope.filter((person: Person) => {
        const queryLowerCase = query.toLowerCase();

        return person.name.toLowerCase().includes(queryLowerCase)
          || person.fatherName?.toLowerCase().includes(queryLowerCase)
          || person.motherName?.toLowerCase().includes(queryLowerCase);
      });
    }

    if (centuries.length) {
      newPeope = newPeope?.filter((person: Person) => {
        return centuries.some(
          (centurie: string) => +centurie === Math.ceil(person.born / 100),
        );
      });
    }

    return newPeope;
  };

  const filterPeople = handleFilterPeople();

  useEffect(() => {
    handleGetPeople();
  }, []);

  if (isLoading) {
    return (
      <Loader />
    );
  }

  return (
    <>
      <h1 className="title">People Page</h1>

      <div className="block">
        <div className="columns is-desktop is-flex-direction-row-reverse">
          <div className="column is-7-tablet is-narrow-desktop">
            <PeopleFilters />
          </div>

          <div className="column">
            <div className="box table-container">

              {error && (
                <p data-cy="peopleLoadingError">Something went wrong</p>
              )}

              {!people.length && (
                <p data-cy="noPeopleMessage">
                  There are no people on the server
                </p>
              )}

              {!filterPeople.length && !isEmptyFilter && (
                <p>There are no people matching the current search criteria</p>
              )}

              {filterPeople.length > 0 && (
                <PeopleTable people={filterPeople} />
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
