import React, { useEffect, useMemo, useState } from 'react';
import { useSearchParams } from 'react-router-dom';

import { PeopleFilters } from '../components/PeopleFilters';
import { Loader } from '../components/Loader';
import { PeopleTable } from '../components/PeopleTable';

import { Person, SortBy } from '../types';
import { getPeople } from '../api';
import {
  filterPeopleByCenturies,
  filterPersonByQuery,
  getPeopleWithParents,
  getSortPeople,
} from '../utils/functions';

export const PeoplePage: React.FC = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [peopleFromServer, setPeopleFromServer] = useState<Person[]>([]);
  const [error, setError] = useState('');
  const [searchParams] = useSearchParams();

  const sortBy = searchParams.get('sort') as SortBy;
  const order = searchParams.get('order');
  const sex = searchParams.get('sex');
  const centuries = searchParams.getAll('centuries');
  const query = searchParams.get('query');

  useEffect(() => {
    setIsLoading(true);
    getPeople()
      .then(setPeopleFromServer)
      .catch(() => setError('Something went wrong'))
      .finally(() => setIsLoading(false));
  }, []);

  const peopleWithParents = useMemo(
    () => getPeopleWithParents(peopleFromServer),
    [peopleFromServer],
  );

  const people = useMemo(() => {
    let currentPeople = [...peopleWithParents];

    if (sortBy) {
      currentPeople = getSortPeople(currentPeople, sortBy);
    }

    if (centuries.length > 0 || sex || query) {
      currentPeople = currentPeople.filter(person => {
        const filteredByCentury =
          centuries.length > 0
            ? filterPeopleByCenturies(centuries, person.born)
            : true;

        const filteredBySex = sex ? person.sex === sex : true;

        const filteredByQuery = query
          ? filterPersonByQuery(person, query)
          : true;

        return filteredByCentury && filteredBySex && filteredByQuery;
      });
    }

    if (order) {
      return currentPeople.reverse();
    }

    return currentPeople;
  }, [sortBy, order, sex, centuries, query, peopleWithParents]);

  const showNoPeopleMessage = !peopleFromServer.length && !error && !isLoading;
  const showNoSearchPeopleMessage = !people.length && !isLoading;

  return (
    <>
      <h1 className="title">People Page</h1>

      <div className="block">
        <div className="columns is-desktop is-flex-direction-row-reverse">
          {!!peopleFromServer.length && (
            <div className="column is-7-tablet is-narrow-desktop">
              <PeopleFilters />
            </div>
          )}

          <div className="column">
            <div className="box table-container">
              {isLoading && <Loader />}

              {error && (
                <p data-cy="peopleLoadingError" className="has-text-danger">
                  Something went wrong
                </p>
              )}

              {showNoPeopleMessage && (
                <p data-cy="noPeopleMessage">
                  There are no people on the server
                </p>
              )}

              {showNoSearchPeopleMessage && (
                <p>There are no people matching the current search criteria</p>
              )}

              {!!people.length && <PeopleTable people={people} />}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
