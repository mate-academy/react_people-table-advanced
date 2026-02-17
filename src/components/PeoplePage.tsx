import { PeopleFilters } from './PeopleFilters';
import { Loader } from './Loader';
import { PeopleTable } from './PeopleTable';
import { useParams, useSearchParams } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { Person } from '../types';
import { getPeople } from '../api';

type SortField = 'name' | 'sex' | 'born' | 'died';

export const PeoplePage = () => {
  const { person } = useParams();

  const [people, setPeople] = useState<Person[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(false);

  useEffect(() => {
    setIsLoading(true);

    getPeople()
      .then(data => {
        setPeople(data);
      })
      .catch(() => {
        setError(true);
      })
      .finally(() => {
        setIsLoading(false);
      });
  }, []);

  const [searchParams] = useSearchParams();

  const sex = searchParams.get('sex');
  const query = searchParams.get('query') || '';
  const centuries = searchParams.getAll('centuries');

  const sort = searchParams.get('sort') as SortField | null;
  const order = searchParams.get('order') || 'asc';

  const filteredPeople = people.filter(p => {
    const normalizedQuery = query.trim().toLowerCase();

    if (sex && p.sex !== sex) {
      return false;
    }

    if (normalizedQuery) {
      const inName = p.name.toLowerCase().includes(normalizedQuery);

      const inMother =
        p.motherName && p.motherName.toLowerCase().includes(normalizedQuery);

      const inFather =
        p.fatherName && p.fatherName.toLowerCase().includes(normalizedQuery);

      if (!inName && !inMother && !inFather) {
        return false;
      }
    }

    if (centuries.length > 0) {
      const century = Math.ceil(Number(p.born) / 100).toString();

      if (!centuries.includes(century)) {
        return false;
      }
    }

    return true;
  });

  const sortedPeople = [...filteredPeople].sort((a, b) => {
    if (!sort) {
      return 0;
    }

    let valueA = a[sort];
    let valueB = b[sort];

    if (valueA === null || valueA === undefined) {
      valueA = '';
    }

    if (valueB === null || valueB === undefined) {
      valueB = '';
    }

    if (typeof valueA === 'string') {
      const result = valueA.localeCompare(valueB as string);

      return order === 'asc' ? result : -result;
    }

    const result = (valueA as number) - (valueB as number);

    return order === 'asc' ? result : -result;
  });

  return (
    <>
      <h1 className="title">People Page</h1>

      <div className="block">
        <div className="columns is-desktop is-flex-direction-row-reverse">
          {!isLoading && people.length > 0 && (
            <div className="column is-7-tablet is-narrow-desktop">
              <PeopleFilters />
            </div>
          )}

          {isLoading && <Loader />}

          {error && (
            <p data-cy="peopleLoadingError" className="has-text-danger">
              Something went wrong
            </p>
          )}

          {!isLoading && !error && !people.length && (
            <p data-cy="noPeopleMessage">There are no people on the server</p>
          )}

          {!isLoading && !error && people.length > 0 && (
            <PeopleTable people={sortedPeople} selectedPerson={person} />
          )}
        </div>
      </div>
    </>
  );
};
