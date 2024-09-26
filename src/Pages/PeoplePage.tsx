import { useSearchParams } from 'react-router-dom';
import { PeopleFilters } from '../components/PeopleFilters';
import { Loader } from '../components/Loader';
import { PeopleTable } from '../components/PeopleTable';
import { useContext } from 'react';
import { PeopleContext } from '../store/PeopleContext';

import { getFiterPerson } from '../utils/FilterParams';

export const PeoplePage = () => {
  const { allPeople, errorMessage, isLoading } = useContext(PeopleContext);
  const [searchParams] = useSearchParams();

  const centuries = searchParams.getAll('centuries') || [];
  const query = searchParams.get('query') || '';
  const sex = searchParams.get('sex') || '';

  const visiblePerson = getFiterPerson(allPeople, query, centuries, sex);

  return (
    <>
      <h1 className="title">People Page</h1>

      <div className="block">
        <div className="columns is-desktop is-flex-direction-row-reverse">
          <div className="column is-7-tablet is-narrow-desktop">
            {!isLoading && !errorMessage && <PeopleFilters />}
          </div>

          <div className="column">
            <div className="box table-container">
              {isLoading && <Loader />}

              {errorMessage && (
                <p data-cy="peopleLoadingError" className="has-text-danger">
                  {errorMessage}
                </p>
              )}

              {!errorMessage && allPeople.length === 0 && !isLoading && (
                <p data-cy="noPeopleMessage">
                  There are no people on the server
                </p>
              )}

              {!isLoading && !errorMessage && (
                <PeopleTable people={visiblePerson} />
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
