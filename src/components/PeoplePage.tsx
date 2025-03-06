import { PeopleFilters } from './PeopleFilters';
import { Loader } from './Loader';
import { PeopleTable } from './PeopleTable';
import { useEffect, useRef, useState } from 'react';
import { getPeople } from '../api';
import { Person } from '../types';
import { useSearchParams } from 'react-router-dom';
export const PeoplePage = () => {
  const [people, setPeople] = useState<Person[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const [searchParams] = useSearchParams();
  const initialPeople = useRef<Person[]>([]);

  const filterPeople = () => {
    const query = searchParams.get('query');
    const centuries = searchParams.getAll('centuries');
    const sex = searchParams.get('sex');
    let filteredPeople = [...initialPeople.current];

    if (query) {
      filteredPeople = filteredPeople.filter(person =>
        person.name.toLowerCase().includes(query.toLowerCase()),
      );
    }

    if (centuries.length) {
      filteredPeople = filteredPeople.filter(person =>
        centuries.includes(`${Math.ceil(person.born / 100)}`),
      );
    }

    if (sex) {
      filteredPeople = filteredPeople.filter(person => person.sex === sex);
    }

    setPeople(filteredPeople);
  };

  const sortPeople = () => {
    const sort = searchParams.getAll('sort');
    const order = searchParams.get('order');

    if (!order && !sort.length) {
      return;
    }

    const sortedPeople = [...people];

    if (sort.length) {
      sort.forEach(field => {
        switch (field) {
          case 'name':
            sortedPeople.sort((a, b) => a.name.localeCompare(b.name));
            break;
          case 'sex':
            sortedPeople.sort((a, b) => a.sex.localeCompare(b.sex));
            break;
          case 'born':
            sortedPeople.sort((a, b) => a.born - b.born);
            break;
          case 'died':
            sortedPeople.sort((a, b) => a.died - b.died);
            break;
        }
      });
    }

    if (order === 'desc') {
      sortedPeople.reverse();
    }

    setPeople(sortedPeople);
  };

  const isPeopleOnServer =
    !initialPeople.current.length &&
    !loading &&
    !error &&
    !searchParams.toString();

  const isPeopleWithCriteria =
    !people.length && !loading && !error && searchParams.toString();

  const isAnyError = !loading && !error && people.length > 0;

  useEffect(() => {
    setLoading(true);
    getPeople()
      .then(data => {
        setPeople(data);
        initialPeople.current = data;
        if (searchParams) {
          filterPeople();
          sortPeople();
        }
      })
      .catch(() => setError(true))
      .finally(() => setLoading(false));
  }, []);

  useEffect(() => {
    filterPeople();
    sortPeople();
  }, [searchParams]);

  return (
    <>
      <h1 className="title">People Page</h1>

      <div className="block">
        <div className="columns is-desktop is-flex-direction-row-reverse">
          <div className="column is-7-tablet is-narrow-desktop">
            {initialPeople.current.length > 0 && <PeopleFilters />}
          </div>

          <div className="column">
            <div className="box table-container">
              {loading && <Loader />}
              {error && (
                <p data-cy="peopleLoadingError">Something went wrong</p>
              )}
              {isPeopleOnServer && (
                <p data-cy="noPeopleMessage">
                  There are no people on the server
                </p>
              )}
              {isPeopleWithCriteria && (
                <p>There are no people matching the current search criteria</p>
              )}
              {isAnyError && <PeopleTable {...{ people }} />}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
