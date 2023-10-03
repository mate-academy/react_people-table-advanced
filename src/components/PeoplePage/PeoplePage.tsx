import { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { PeopleFilters } from '../PeopleFilters/PeopleFilters';
import { Loader } from '../Loader';
import { PeopleTable } from '../PeopleTable/PeopleTable';
import { Person } from '../../types';
import { getPeople } from '../../api';
import { getPrepearedPeople } from '../../utils/getPrepearedPeople';
import { getFilteredPeople } from '../../utils/getFilteredPeople';

export const PeoplePage = () => {
  const [hasError, setHasError] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [people, setPeople] = useState<Person[]>([]);
  const [searchParams] = useSearchParams();

  useEffect(() => {
    setIsLoading(true);
    getPeople()
      .then(currentPeople => {
        const peopleWithParents = getPrepearedPeople(currentPeople);

        setPeople(peopleWithParents);
      })
      .catch(() => setHasError(true))
      .finally(() => setIsLoading(false));
  }, []);

  const visiblePeople = getFilteredPeople(searchParams, people);
  const isPeopleVisible = !hasError && !isLoading && !!visiblePeople.length;
  const isSuccessRequest = !isLoading && !hasError;
  const isRequestFail = hasError && !isLoading;
  const isNoPeopleOnServer = !people.length && isSuccessRequest;

  const isNoVisiblePeople = !!people.length
    && !visiblePeople.length
    && isSuccessRequest;

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
              {isLoading && <Loader /> }

              {isNoPeopleOnServer && (
                <p data-cy="noPeopleMessage">
                  There are no people on the server
                </p>
              )}

              {isRequestFail && (
                <p
                  data-cy="peopleLoadingError"
                  className="has-text-danger"
                >
                  Something went wrong
                </p>
              )}

              {isNoVisiblePeople && (
                <p>
                  There are no people matching the current search criteria
                </p>
              )}

              {isPeopleVisible && <PeopleTable people={visiblePeople} />}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
