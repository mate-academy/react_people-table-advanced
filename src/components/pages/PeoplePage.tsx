import { useEffect } from 'react';
import { PeopleFilters } from '../Filtering/PeopleFilters';
import { Loader } from '../Loader';
import { PeopleTable } from '../PeopleTable/PeopleTable';
import { usePeopleContext } from '../../context/PeopleProvider';

export const PeoplePage = () => {
  const { people, isLoading, isError, setIsError } = usePeopleContext();

  useEffect(() => {
    if (!isError) {
      return;
    }

    const timerId = window.setTimeout(() => setIsError(false), 3000);

    // eslint-disable-next-line consistent-return
    return () => {
      window.clearTimeout(timerId);
    };
  }, [isError]);

  return (
    <>
      <h1 className="title">People Page</h1>

      <div className="block">
        <div className="columns is-desktop is-flex-direction-row-reverse">
          <div className="column is-7-tablet is-narrow-desktop">
            {!isLoading && <PeopleFilters />}
          </div>

          <div className="column">
            <div className="box table-container">
              {isLoading && <Loader />}

              {isError && (
                <p data-cy="peopleLoadingError" className="has-text-danger">
                  Something went wrong
                </p>
              )}

              {!isLoading && !people.length && (
                <p data-cy="noPeopleMessage">
                  There are no people on the server
                </p>
              )}

              {!!people.length && <PeopleTable people={people} />}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
