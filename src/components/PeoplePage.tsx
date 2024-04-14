import React, { useEffect, useState } from 'react';
import { useParams, useLocation } from 'react-router-dom';
import { getPeople } from '../api';
import { Loader } from '../components/Loader';
import PeopleTable from './PeopleTable';
import { PeopleFilters } from './PeopleFilters';
import { Person } from '../types/Person';

const PeoplePage: React.FC = () => {
  const [people, setPeople] = useState<Person[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [hasError, setHasError] = useState(false);
  const [filteredPeople, setFilteredPeople] = useState<Person[]>([]);
  const { personSlug } = useParams<{ personSlug?: string }>();

  const location = useLocation();

  useEffect(() => {
    setIsLoading(true);
    getPeople()
      .then(fetchedPeople => {
        setPeople(fetchedPeople);
        setFilteredPeople(fetchedPeople);
      })
      .catch(() => {
        setHasError(true);
      })
      .finally(() => {
        setIsLoading(false);
      });
  }, []);

  useEffect(() => {
    const applyFilters = () => {
      const queryParams = new URLSearchParams(location.search);
      let filteredList = [...people];

      const sex = queryParams.get('sex');

      if (sex) {
        filteredList = filteredList.filter(person => person.sex === sex);
      }

      const query = queryParams.get('query');

      if (query) {
        const queryInLowerCase = query.toLowerCase();

        filteredList = filteredList.filter(person =>
          person.name.toLowerCase().includes(queryInLowerCase),
        );
      }

      const centuries = queryParams.getAll('centuries');

      if (centuries.length > 0) {
        filteredList = filteredList.filter(person =>
          centuries.includes(Math.floor(person.born / 100 + 1).toString()),
        );
      }

      setFilteredPeople(filteredList);
    };

    applyFilters();
  }, [people, location.search]);

  useEffect(() => {
    const resetFilters = () => {
      const queryParams = new URLSearchParams(location.search);

      queryParams.delete('sex');
      queryParams.delete('query');
      queryParams.delete('centuries');

      window.history.replaceState(
        {},
        '',
        `${location.pathname}?${queryParams}`,
      );
    };

    resetFilters();
  }, [location]);

  return (
    <>
      {isLoading && <Loader />}
      {hasError && (
        <p data-cy="peopleLoadingError" className="has-text-danger">
          Something went wrong
        </p>
      )}
      {!!people.length && (
        <>
          <h1 className="title">People Page</h1>
          <div className="block">
            <div className="columns is-desktop is-flex-direction-row-reverse">
              <div className="column is-7-tablet is-narrow-desktop">
                <PeopleFilters />
              </div>
              <div className="column">
                <div className="box table-container">
                  <PeopleTable
                    people={filteredPeople}
                    personSlug={personSlug ?? ''}
                  />
                </div>
              </div>
            </div>
          </div>
        </>
      )}
      {!isLoading && !hasError && people.length === 0 && (
        <p data-cy="noPeopleMessage">There are no people on the server</p>
      )}
    </>
  );
};

export default PeoplePage;
