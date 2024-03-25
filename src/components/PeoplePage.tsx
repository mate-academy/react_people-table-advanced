import React, { useEffect, useMemo, useState } from 'react';
import { useMatch, useSearchParams } from 'react-router-dom';
import { PeopleFilters } from './PeopleFilters';
import { Loader } from './Loader';
import { PeopleTable } from './PeopleTable';
import { getPeople } from '../api';
import { Person } from '../types';

export const PeoplePage: React.FC = () => {
  const [people, setPeople] = useState<Person[]>([]);
  const [loadingError, setLoadingError] = useState(false);
  const [loading, setLoading] = useState(true);
  const [noPeopleMessage, setNoPeopleMessage] = useState(false);
  const [searchParams, setSearchParams] = useSearchParams();

  const query = searchParams.get('query') || '';
  const match = useMatch('/people/:slug');
  const selectedPerson = match?.params.slug ?? null;

  useEffect(() => {
    getPeople()
      .then(result => {
        if (result.length === 0) {
          setNoPeopleMessage(true);
        }

        setPeople(result);
      })
      .catch(() => setLoadingError(true))
      .finally(() => setLoading(false));
  }, []);

  const isQueryMatch = (person: Person) => {
    const { name, fatherName, motherName } = person;

    return [name, fatherName, motherName].some(field =>
      field?.toLowerCase().includes(query.toLocaleLowerCase()),
    );
  };

  const filteredPeople = useMemo(() => {
    return people.filter(person => {
      const queryFilter = isQueryMatch(person);
      const sexFilter = searchParams.get('sex')
        ? person.sex === searchParams.get('sex')
        : true;
      const centuryFilter =
        searchParams.getAll('century').length === 0 ||
        searchParams
          .getAll('century')
          .map(century => Number(century))
          .includes(Math.floor(person.born / 100));

      return queryFilter && sexFilter && centuryFilter;
    });
  }, [people, query, searchParams]);

  return (
    <>
      <h1 className="title">People Page</h1>

      <div className="block">
        <div className="columns is-desktop is-flex-direction-row-reverse">
          <div className="column is-7-tablet is-narrow-desktop">
            {!loading && !loadingError && (
              <PeopleFilters
                setSearchParams={setSearchParams}
                searchParams={searchParams}
              />
            )}
          </div>

          <div className="column">
            <div className="box table-container">
              {loadingError && (
                <p data-cy="peopleLoadingError" className="has-text-danger">
                  Something went wrong
                </p>
              )}

              {loading && <Loader />}

              {noPeopleMessage && (
                <p data-cy="noPeopleMessage">
                  There are no people on the server
                </p>
              )}

              {!loading && (
                <PeopleTable
                  searchParams={searchParams}
                  setSearchParams={setSearchParams}
                  people={filteredPeople}
                  selectedPerson={selectedPerson}
                />
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
