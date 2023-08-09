import React, { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { PeopleFilters } from './PeopleFilters';
import { Loader } from './Loader';
import { PeopleTable } from './PeopleTable';
import { Person } from '../types';
import { getPeople } from '../api';
import { getSearchWith } from '../utils/searchHelper';
import { getVisiblePeople } from '../utils/filters';

export const PeoplePage: React.FC = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [people, setPeople] = useState<Person[]>([]);
  const [loading, setLoading] = useState(false);
  const [hasError, setHasError] = useState(false);
  const query = searchParams.get('query') || '';
  const centuries = searchParams.getAll('centuries') || [];
  const sort = searchParams.get('sort') || '';
  const order = searchParams.get('order') || '';
  const sex = searchParams.get('sex') || '';
  const allPeople = getVisiblePeople(people, {
    query,
    sex,
    centuries,
    sort,
    order,
  });

  const matchMotherAndFather = (peopleFromServer: Person[]): Person[] => {
    return peopleFromServer.map((per): Person => {
      const mother = peopleFromServer.find(
        person => person.name === per.motherName,
      );

      const father = peopleFromServer.find(
        person => person.name === per.fatherName,
      );

      return { ...per, mother, father };
    });
  };

  useEffect(() => {
    setLoading(true);
    getPeople()
      .then(data => matchMotherAndFather(data))
      .then((data) => setPeople(data))
      .catch(() => setHasError(true))
      .finally(() => setLoading(false));
  }, []);

  const handleQueryChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const params = getSearchWith(searchParams, { query: event.target.value });

    setSearchParams(params);
  };

  const handleSex = (newSex: string) => {
    const params = getSearchWith(searchParams, { newSex });

    setSearchParams(params);
  };

  return (
    <>
      <h1 className="title">People Page</h1>

      <div className="block">
        <div className="columns is-desktop is-flex-direction-row-reverse">
          <div className="column is-7-tablet is-narrow-desktop">
            {people.length !== 0 && !loading && (
              <PeopleFilters
                query={query}
                sex={sex}
                centuries={centuries}
                handleSex={handleSex}
                handleQueryChange={handleQueryChange}
              />
            )}
          </div>

          <div className="column">
            <div className="box table-container">
              {loading && (
                <Loader />
              )}

              {hasError && (
                <p data-cy="peopleLoadingError">Something went wrong</p>
              )}

              {people.length === 0 && !loading && (
                <p data-cy="noPeopleMessage">
                  There are no people on the server
                </p>
              )}

              {allPeople.length === 0 && !loading && (
                <p>There are no people matching the current search criteria</p>
              )}

              {allPeople.length !== 0 && !loading && (
                <PeopleTable
                  people={allPeople}
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
