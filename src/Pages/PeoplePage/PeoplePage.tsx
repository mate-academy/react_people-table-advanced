import { useSearchParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { Loader } from '../../components/Loader';
import { PeopleFilters } from '../../components/PeopleFilters';
import { PeopleTable } from '../../components/PeopleTable';
import { Person } from '../../types';
import { getPeople } from '../../api';
import { PeopleLoadingError } from '../PeopleLoadingError';
import { NoPeopleMessage } from '../NoPeopleMessage';
import {
  filterByCenturies,
  filterByName,
  filterBySex,
  getFilteredPeople,
  reversePeopleOrder,
  sortPeople,
} from '../../utils/peopleFilterHelper';
import { SortType } from '../../types/SortType';
import { SearchFilterParams } from '../../types/SearchFilterParams';

export const PeoplePage = () => {
  const [people, setPeople] = useState<Person[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [hasError, setHasError] = useState(false);

  const [searchParams] = useSearchParams();
  const sort = searchParams.get(SearchFilterParams.Sort)
    || SearchFilterParams.None;
  const order = searchParams.get(SearchFilterParams.Order)
    || SearchFilterParams.None;
  const query = searchParams.get(SearchFilterParams.Query)
    || SearchFilterParams.None;
  const sex = searchParams.get(SortType.Sex) || SortType.None;
  const centuries = searchParams.getAll(SearchFilterParams.Centuries) || [];

  useEffect(() => {
    setIsLoading(true);

    getPeople()
      .then(setPeople)
      .catch(() => setHasError(true))
      .finally(() => setIsLoading(false));
  }, []);

  const getPreparedPeople = () => {
    let preparedPeople = [...people];

    preparedPeople = getFilteredPeople(preparedPeople,
      (person) => filterByName(person, query));
    preparedPeople = getFilteredPeople(preparedPeople,
      (person) => filterBySex(person, sex));
    preparedPeople = getFilteredPeople(preparedPeople,
      (person) => filterByCenturies(person, centuries));
    preparedPeople = sortPeople(preparedPeople, sort);
    preparedPeople = reversePeopleOrder(preparedPeople, order);

    return preparedPeople;
  };

  const preparedPeople = getPreparedPeople();

  return (
    <>
      <h1 className="title">People Page</h1>

      <div className="block">
        <div className="columns is-desktop is-flex-direction-row-reverse">
          <div className="column is-7-tablet is-narrow-desktop">
            <PeopleFilters />
          </div>

          <div className="column">
            <div className="box table-container">
              {isLoading && <Loader />}

              {!isLoading && hasError && (<PeopleLoadingError />)}

              {!isLoading && !people.length && (
                <p data-cy="noPeopleMessage">
                  <NoPeopleMessage />
                </p>
              )}

              {!isLoading && !preparedPeople.length && (
                <p>There are no people matching the current search criteria</p>
              )}

              {!isLoading && !hasError && !!preparedPeople.length && (
                <PeopleTable people={preparedPeople} />
              )}

            </div>
          </div>
        </div>
      </div>
    </>
  );
};
