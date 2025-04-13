import { useContext } from 'react';
import { PeopleFilters } from '../PeopleTable/PeopleFilters';
import { PeopleTable } from '../PeopleTable/PeopleTable';
import { PeopleContext } from '../../contexts/PeopleContext';
import { Loader } from '../Loader';
import { ErrorType } from '../../types/Error';
import { Person } from '../../types';
import { filterBySex } from '../../functions/FilterBySex';
import { Sex } from '../../types/Sex';
import { filterByName } from '../../functions/FilterByName';
import { filterByCentury } from '../../functions/FilterByCentury';
import { useSearchParams } from 'react-router-dom';
import { FilterOrder } from '../../types/FilterParamOrder';

const preparedPeople = (
  people: Person[],
  sortBy: keyof Person,
  order: string,
  centuries: string[],
  query: string,
  sex: Sex,
): Person[] => {
  let visiblePeople = [...people];

  if (sex) {
    visiblePeople = filterBySex(visiblePeople, sex);
  }

  if (query) {
    visiblePeople = filterByName(visiblePeople, query);
  }

  if (centuries.length) {
    visiblePeople = filterByCentury(visiblePeople, centuries);
  }

  if (sortBy) {
    visiblePeople = visiblePeople.sort((p1, p2) => {
      const p1Key = p1[sortBy];
      const p2Key = p2[sortBy];

      if (typeof p1Key === 'string' && typeof p2Key === 'string') {
        return p1Key.localeCompare(p2Key);
      }

      if (typeof p1Key === 'number' && typeof p2Key === 'number') {
        return p1Key - p2Key;
      }

      return 0;
    });
  }

  if (order === FilterOrder.DESC) {
    return visiblePeople.toReversed();
  }

  return visiblePeople;
};

export const PeoplePage = () => {
  const { people, isLoading, errorMessage } = useContext(PeopleContext);

  const [searchParams] = useSearchParams();
  const query = searchParams.get('query')?.toLowerCase() || '';
  const sortBy = searchParams.get('sort') || '';
  const order = searchParams.get('order') || '';
  const centuries = searchParams.getAll('centuries') || '';
  const sex = searchParams.get('sex') || '';

  const visiblePeople = preparedPeople(
    people,
    sortBy as keyof Person,
    order,
    centuries,
    query,
    sex as Sex,
  );

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

              {!isLoading && !people.length && (
                <p data-cy="noPeopleMessage">
                  There are no people on the server
                </p>
              )}

              {!isLoading && !errorMessage && people.length && (
                <PeopleTable people={visiblePeople} />
              )}

              {errorMessage && (
                <p data-cy="peopleLoadingError">{ErrorType.DEFAULT_ERROR}</p>
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
