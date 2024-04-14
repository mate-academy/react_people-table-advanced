import { PeopleFilters } from './PeopleFilters';
import { Loader } from './Loader';
import { PeopleTable } from './PeopleTable';
import { usePeople } from './context/PeopleContext';
import { ColumnsFilter, PeopleError } from '../types/enums';
import { getSortPeople } from '../utils/getSortPeople';
import { useSearchParams } from 'react-router-dom';
import { getFilterPeople } from '../utils/getFilterPeople';

export const PeoplePage: React.FC = () => {
  const { isLoading, errorMessage, people } = usePeople();
  const [searchParams] = useSearchParams();

  const isOrdered = searchParams.get('order') === 'desc';
  const sortField = searchParams.get('fieldSort') as ColumnsFilter;
  const sex = searchParams.get('sex') as '';
  const query = searchParams.get('query') || '';
  const centuries = searchParams.getAll('centuries') || [];

  let visiblePeople = [...people];

  if (sortField && Object.values(ColumnsFilter).includes(sortField)) {
    visiblePeople = getSortPeople(visiblePeople, { sortField });
  }

  visiblePeople = getFilterPeople(visiblePeople, { sex, query, centuries });

  if (isOrdered) {
    visiblePeople.reverse();
  }

  return (
    <>
      <h1 className="title">People Page</h1>

      <div className="block">
        <div className="columns is-desktop is-flex-direction-row-reverse">
          {!isLoading && (
            <div className="column is-7-tablet is-narrow-desktop">
              <PeopleFilters />
            </div>
          )}

          <div className="column">
            <div className="box table-container">
              {isLoading && <Loader />}
              {!isLoading && errorMessage && (
                <p data-cy="peopleLoadingError" className="has-text-danger">
                  {PeopleError.requestErrorDisplay}
                </p>
              )}

              {!isLoading && !errorMessage && !!people.length && (
                <PeopleTable visiblePeople={visiblePeople} />
              )}
              {!isLoading && (!people.length || errorMessage) && (
                <p data-cy="noPeopleMessage">{PeopleError.noPeopleMessage}</p>
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
