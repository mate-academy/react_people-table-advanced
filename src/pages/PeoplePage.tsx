/* eslint-disable max-len */
/* eslint-disable @typescript-eslint/indent */
import { useParams } from 'react-router-dom';

import { Loader } from '../components/Loader';
import { PeopleFilters } from '../components/PeopleFilters';
import { PeopleTable } from '../components/PeopleTable';

import { usePeople } from '../store/PeopleContext';
import { useSearchParamsContext } from '../store/SearchParamsContext';

export const PeoplePage = () => {
  const { slug } = useParams();
  const { visiblePeople, error, loading } = usePeople();
  const { query, sex, centuries } = useSearchParamsContext();

  return (
    <div className="container">
      <h1 className="title">People Page</h1>

      <div className="block">
        {loading && (
          <div className="box table-container">
            <Loader />
          </div>
        )}

        <div className="columns is-desktop is-flex-direction-row-reverse">
          {!loading && (
            <>
              <div className="column is-7-tablet is-narrow-desktop">
                <PeopleFilters />
              </div>

              <div className="column">
                <div className="box table-container">
                  {error && (
                    <p data-cy="peopleLoadingError">Something went wrong</p>
                  )}

                  {!loading && !error && visiblePeople.length === 0 && (
                    <p data-cy="noPeopleMessage">
                      {query || sex || centuries.length > 0
                        ? 'There are no people matching the current search criteria'
                        : 'There are no people on the server'}
                    </p>
                  )}

                  {!loading &&
                    !error &&
                    visiblePeople &&
                    visiblePeople.length > 0 && (
                      <PeopleTable people={visiblePeople} selectedSlug={slug} />
                    )}
                </div>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
};
