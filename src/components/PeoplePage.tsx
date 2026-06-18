import { useEffect, useState } from 'react';
import { Person } from '../types';
import { PeopleFilters } from './PeopleFilters';
import { Loader } from './Loader';
import { PeopleTable } from './PeopleTable';
import { getPeople } from '../api';
import { useSearchParams } from 'react-router-dom';

export const PeoplePage = () => {
  const [people, setPeople] = useState<Person[]>([]);
  const [hasError, setHasError] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [searchParams, setSearchParams] = useSearchParams();

  const sex = searchParams.get('sex') || '';
  const query = searchParams.get('query') || '';
  const centuries = searchParams.getAll('centuries') || [];
  const sort = searchParams.get('sort') || '';
  const order = searchParams.has('order');

  let preparedPeople = people;

  if (sex) {
    preparedPeople = preparedPeople.filter(person => person.sex === sex);
  }

  if (query) {
    const lowQuery = query.toLowerCase();

    preparedPeople = preparedPeople.filter(
      person =>
        person.name.toLowerCase().includes(lowQuery) ||
        person.motherName?.toLowerCase().includes(lowQuery) ||
        person.fatherName?.toLowerCase().includes(lowQuery),
    );
  }

  if (centuries.length) {
    preparedPeople = preparedPeople.filter(person =>
      centuries.includes(`${Math.ceil(person.born / 100)}`),
    );
  }

  if (sort) {
    preparedPeople = [...preparedPeople].sort((a, b) => {
      switch (sort) {
        case 'born':
        case 'died':
          return a[sort] - b[sort];
        case 'name':
        case 'sex':
          return a[sort].localeCompare(b[sort]);
        default:
          return 0;
      }
    });
  }

  if (order) {
    preparedPeople = [...preparedPeople].reverse();
  }

  const handleQuerryChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const search = new URLSearchParams(searchParams);

    if (e.target.value) {
      search.set('query', e.target.value);
    } else {
      search.delete('query');
    }

    setSearchParams(search);
  };

  useEffect(() => {
    const load = async () => {
      setIsLoading(true);
      try {
        const data = await getPeople();

        setPeople(data);
      } catch (error) {
        setHasError(true);
      } finally {
        setIsLoading(false);
      }
    };

    load();
  }, []);

  return (
    <>
      <h1 className="title">People Page</h1>

      <div className="block">
        <div className="columns is-desktop is-flex-direction-row-reverse">
          {!!people.length && (
            <div className="column is-7-tablet is-narrow-desktop">
              <PeopleFilters
                currentSex={sex}
                query={query}
                onQueryChange={handleQuerryChange}
                centuries={centuries}
              />
            </div>
          )}

          <div className="column">
            <div className="box table-container">
              {isLoading && <Loader />}

              {hasError && (
                <p data-cy="peopleLoadingError" className="has-text-danger">
                  Something went wrong
                </p>
              )}

              {!people.length && !isLoading && (
                <p data-cy="noPeopleMessage">
                  There are no people on the server
                </p>
              )}

              {people.length > 0 && preparedPeople.length === 0 && (
                <p>There are no people matching the current search criteria</p>
              )}

              {!!preparedPeople.length && (
                <PeopleTable
                  people={preparedPeople}
                  sort={sort}
                  order={order}
                />
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
