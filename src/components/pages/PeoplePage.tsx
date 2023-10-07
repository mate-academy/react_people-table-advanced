import { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { Loader } from '../Loader';
import { Person } from '../../types';
import { getPeople } from '../../api';
import { PeopleTable } from '../PeopleTable';
import { PeopleFilters } from '../PeopleFilters';
import {
  ERROR_MESSAGE,
  NO_MATCHING_PEOPLE,
  NO_PEOPLE_ON_SERVER,
  ALL_CENTURIES,
} from '../../utils/constants';
import { getPreparedPeople } from '../../utils/helpers';
import {
  filterByCenturies,
  filterByQuery,
  filterBySex,
  sortPeople,
} from '../../utils/filterPeoplePageFunctions';

export const PeoplePage: React.FC = () => {
  const [people, setPeople] = useState<Person[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [isError, setIsError] = useState<boolean>(false);
  const [searchParams] = useSearchParams();

  const centuries = searchParams.getAll('centuries') || ALL_CENTURIES;
  const query = searchParams.get('query') as string;
  const order = searchParams.get('order');
  const sort = searchParams.get('sort') as string;

  useEffect(() => {
    setIsLoading(true);
    getPeople()
      .then(setPeople)
      .catch(() => setIsError(true))
      .finally(() => setIsLoading(false));
  }, []);
  const preparedPeople = getPreparedPeople(people);

  const filteredPeople = preparedPeople
    .filter((person) => filterBySex(person, searchParams))
    .filter((person) => filterByCenturies(person, centuries))
    .filter((person) => filterByQuery(person, query))
    .sort((a, b) => sortPeople(a, b, sort, order));

  const noPeopleMessage = !people.length && !isLoading && !isError;
  const noMatchingPeople = !isLoading && !filteredPeople.length;

  return (
    <>
      <h1 className="title">People Page</h1>
      <div className="block">
        <div className="columns is-desktop is-flex-direction-row-reverse">
          <div className="column is-7-tablet is-narrow-desktop">
            {!isLoading
              && <PeopleFilters /> }
          </div>

          <div className="column">
            <div className="box table-container">
              {isLoading && <Loader />}

              {isError
                && <p data-cy="peopleLoadingError">{ERROR_MESSAGE}</p>}

              {noPeopleMessage
                && (
                  <p data-cy="noPeopleMessage">
                    {NO_PEOPLE_ON_SERVER}
                  </p>
                )}

              {noMatchingPeople
                && (
                  <p>
                    {NO_MATCHING_PEOPLE}
                  </p>
                )}

              {!isLoading && (
                <PeopleTable
                  people={filteredPeople}
                />
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
