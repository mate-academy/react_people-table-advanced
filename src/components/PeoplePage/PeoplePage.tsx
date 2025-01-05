import React, { useEffect, useMemo, useState } from 'react';
import { Loader } from '../Loader';
import { Person } from '../../types';
import { getPeople } from '../../api';
import { PeopleTable } from '../PeopleTable';
import { PeopleFilters } from '../PeopleFilters';
import { useSearchParams } from 'react-router-dom';

export const PeoplePage: React.FC = () => {
  const [people, setPeople] = useState<Person[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [errorMessage, setErrorMessage] = useState('');

  const [searchParams] = useSearchParams();

  const query = searchParams.get('query') || '';
  const sex = searchParams.get('sex') || '';
  const centuries = searchParams.getAll('centuries');
  const sort = searchParams.get('sort') || '';
  const order = searchParams.get('order') || '';
  const orderDirection = order ? -1 : 1;

  const showingList = useMemo(() => {
    let peopleToShow = [...people];

    if (sex) {
      peopleToShow = peopleToShow.filter(person => person.sex === sex);
    }

    if (query) {
      peopleToShow = peopleToShow.filter(person =>
        person.name.toLowerCase().includes(query.trim().toLowerCase()),
      );
    }

    if (centuries.length > 0) {
      peopleToShow = peopleToShow.filter(person =>
        centuries.some(
          century => `${person.born}`.slice(0, 2) === `${+century - 1}`,
        ),
      );
    }

    switch (sort) {
      case 'name':
      case 'sex':
        peopleToShow.sort(
          (p1, p2) => p1[sort].localeCompare(p2[sort]) * orderDirection,
        );
        break;

      case 'born':
      case 'died':
        peopleToShow.sort((p1, p2) => (p1[sort] - p2[sort]) * orderDirection);
        break;
    }

    return peopleToShow;
  }, [people, sex, query, centuries, sort, orderDirection]);

  useEffect(() => {
    getPeople()
      .then(data => setPeople(data))
      .catch(error => {
        setErrorMessage('Something went wrong');
        throw error;
      })
      .finally(() => setIsLoading(false));
  }, []);

  return (
    <>
      <h1 className="title">People Page</h1>

      <div className="block">
        <div className="columns is-desktop is-flex-direction-row-reverse">
          {people.length > 0 && (
            <div className="column is-7-tablet is-narrow-desktop">
              <PeopleFilters />
            </div>
          )}

          <div className="column">
            <div className="box table-container">
              {isLoading ? (
                <Loader />
              ) : errorMessage ? (
                <p data-cy="peopleLoadingError" className="has-text-danger">
                  {errorMessage}
                </p>
              ) : people.length > 0 ? (
                <PeopleTable people={showingList} />
              ) : !isLoading && !!people.length && !showingList.length ? (
                <p>There are no people matching the current search criteria</p>
              ) : (
                <p data-cy="noPeopleMessage">
                  There are no people on the server
                </p>
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
