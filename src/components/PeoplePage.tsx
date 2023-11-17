import React, { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { PeopleFilters } from './PeopleFilters';
import { Loader } from './Loader';
import { PeopleTable } from './PeopleTable';
import { Person } from '../types/Person';
import { getPeople } from '../api';
import { SortField } from '../types/SortField';

export const PeoplePage = () => {
  const [peopleFromServer, setPeopleFromServer] = useState<Person[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState('');
  const [searchParams, setSearchParams] = useSearchParams();
  const query = searchParams.get('query') || '';
  const sex = searchParams.get('sex') || '';
  const centuries = searchParams.getAll('century');

  const loadData = async () => {
    try {
      const people = await getPeople();

      if (people.length === 0) {
        setError('There are no people on the server');

        return;
      }

      setPeopleFromServer(people);
    } catch {
      setError('Something went wrong');
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    loadData();
  }, []);

  const filteredPeople = React.useMemo(() => {
    const preparedQuery = query.toLowerCase().trim();

    const visiblepeople = [...peopleFromServer]
      .filter(person => {
        switch (sex) {
          case 'm':
            return person.sex === 'm';
          case 'f':
            return person.sex === 'f';
          default:
            return true;
        }
      })
      .filter(person => {
        if (centuries.length > 0) {
          const birthCentury = Math.ceil(person.born / 100);

          return centuries.includes(birthCentury.toString());
        }

        return true;
      })
      .filter(person => person.name.toLowerCase().includes(preparedQuery)
      || person.motherName?.toLowerCase().includes(preparedQuery)
        || person.fatherName?.toLowerCase().includes(preparedQuery))
      .sort((a, b) => {
        switch (searchParams.get('sort')) {
          case SortField.Name:
            return a[SortField.Name].localeCompare(b[SortField.Name]);
          case SortField.Sex:
            return a[SortField.Sex].localeCompare(b[SortField.Sex]);
          case SortField.Born:
            return a[SortField.Born] - b[SortField.Born];
          case SortField.Died:
            return a[SortField.Died] - b[SortField.Died];
          default:
            return 0;
        }
      });

    return !searchParams.get('order') ? visiblepeople : visiblepeople.reverse();
  }, [searchParams, peopleFromServer, centuries]);

  return (
    <>
      <h1 className="title">People Page</h1>

      <div className="block">
        <div className="columns is-desktop is-flex-direction-row-reverse">
          <div className="column is-7-tablet is-narrow-desktop">
            {!isLoading && (
              <PeopleFilters
                searchParams={searchParams}
                setSearchParams={setSearchParams}
                query={query}
              />
            )}

          </div>

          <div className="column">
            <div className="box table-container">
              {isLoading && <Loader />}

              {error && (
                <p data-cy="peopleLoadingError" className="has-text-danger">
                  {error}
                </p>
              )}

              {error && peopleFromServer.length === 0 && (
                <p data-cy="noPeopleMessage">
                  {error}
                </p>
              )}
              {false
                && (
                // eslint-disable-next-line
                  <p>There are no people matching the current search criteria</p>
                )}

              {!error && !isLoading && (
                <PeopleTable
                  people={filteredPeople}
                  allPeople={peopleFromServer}
                  searchParams={searchParams}
                />
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
