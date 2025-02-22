import { useEffect, useMemo, useState } from 'react';
import { Loader } from '../components/Loader';
import { Person } from '../types';
import { getPeople } from '../api';
import { PeopleTable } from './PeopleTable';
import { useSearchParams } from 'react-router-dom';
import {
  filterPersonByCenturies,
  filterPersonByQuery,
  getPeopleWithParents,
  getSortPeople,
} from '../utils/functions';
import { SortBy } from '../types/SortBy';
import { PeopleFilters } from '../components/PeopleFilters';

export const PeoplePage: React.FC = () => {
  const [peopleFromServer, setPeopleFromServer] = useState<Person[]>([]);
  const [isError, setIsError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [searchParams] = useSearchParams();

  useEffect(() => {
    setIsLoading(true);
    getPeople()
      .then(setPeopleFromServer)
      .catch(() => setIsError('Something went wrong'))
      .finally(() => setIsLoading(false));
  }, []);

  const sortBy = searchParams.get('sort') as SortBy;
  const order = searchParams.get('order');
  const sex = searchParams.get('sex');
  const centuries = searchParams.getAll('centuries');
  const query = searchParams.get('query');

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
            ? filterPersonByCenturies(centuries, person.born)
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

  const showNoPeopleMessage =
    !peopleFromServer.length && !isError && !isLoading;

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

              {isError && (
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
