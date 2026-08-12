import { PeopleFilters } from './PeopleFilters';
import { Loader } from './Loader';
import { PeopleTable } from './PeopleTable';
import { usePeople } from '../hooks/usePeople';
import { useSearchParams } from 'react-router-dom';
import { getPreparedPeople } from '../helpers/people';

export const PeoplePage = () => {
  const [searchParams] = useSearchParams();

  const peopleState = usePeople();

  const query = searchParams.get('query') || '';
  const centuries = searchParams.getAll('centuries') || [];
  const sex = searchParams.get('sex') || '';

  const preparedPeople = getPreparedPeople(peopleState.people, {
    query,
    centuries,
    sex,
  });

  const shouldRenderNoPeopleMessage =
    !peopleState.isLoading &&
    !peopleState.hasError &&
    peopleState.people.length === 0;

  const shouldRenderNoMatchingPeopleMessage =
    !peopleState.isLoading &&
    !peopleState.hasError &&
    peopleState.people.length > 0 &&
    preparedPeople.length === 0;

  const shouldRenderPeopleTable =
    !peopleState.isLoading &&
    !peopleState.hasError &&
    peopleState.people.length > 0 &&
    preparedPeople.length !== 0;

  return (
    <>
      <h1 className="title">People Page</h1>

      <div className="block">
        <div className="columns is-desktop is-flex-direction-row-reverse">
          {peopleState.people.length !== 0 && (
            <div className="column is-7-tablet is-narrow-desktop">
              <PeopleFilters />
            </div>
          )}

          <div className="column">
            <div className="box table-container">
              {peopleState.isLoading && <Loader />}

              {peopleState.hasError && (
                <p data-cy="peopleLoadingError" className="has-text-danger">
                  Something went wrong
                </p>
              )}

              {shouldRenderNoPeopleMessage && (
                <p data-cy="noPeopleMessage">
                  There are no people on the server
                </p>
              )}

              {shouldRenderNoMatchingPeopleMessage && (
                <p>There are no people matching the current search criteria</p>
              )}

              {shouldRenderPeopleTable && (
                <PeopleTable people={preparedPeople} />
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
