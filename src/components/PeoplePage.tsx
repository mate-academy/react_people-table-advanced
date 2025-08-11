import { PeopleFilters } from './PeopleFilters';
import { Loader } from './Loader';
import { PeopleTable } from './PeopleTable';
import { useEffect, useMemo, useState } from 'react';
import { getPeople } from '../api';
import { Person } from '../types';
import { useSearchParams } from 'react-router-dom';

export const PeoplePage = () => {
  const [people, setPeople] = useState<Person[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isError, setIsError] = useState(false);

  const [searchParams] = useSearchParams();
  const sort = searchParams.get('sort') || '';
  const order = searchParams.get('order') || '';

  const filteredPeople = useMemo(() => {
    const result = [...people];
    const peopleCopy = [...people];

    if (sort) {
      switch (sort) {
        case 'name':
        case 'sex':
          return peopleCopy.sort((a, b) =>
            order === 'desc'
              ? b[sort].localeCompare(a[sort])
              : a[sort].localeCompare(b[sort]),
          );

        case 'born':
        case 'died':
          return peopleCopy.sort((a, b) =>
            order === 'desc' ? b[sort] - a[sort] : a[sort] - b[sort],
          );

        default:
          return people;
      }
    }

    return result;
  }, [order, sort, people]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const fetchedPeople = await getPeople();

        setPeople(fetchedPeople);
      } catch {
        setIsError(true);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, []);

  return (
    <>
      <h1 className="title">People Page</h1>

      <div className="block">
        <div className="columns is-desktop is-flex-direction-row-reverse">
          {!isLoading && (
            <div className="column is-7-tablet is-narrow-desktop">
              <PeopleFilters />
            </div>
          )}
          <div className="column">
            <div className="box table-container">
              {isLoading ? (
                <Loader />
              ) : isError ? (
                <p data-cy="peopleLoadingError" className="has-text-danger">
                  Something went wrong
                </p>
              ) : !people || people.length === 0 ? (
                <p data-cy="noPeopleMessage">
                  There are no people on the server
                </p>
              ) : (
                <PeopleTable people={filteredPeople} />
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
