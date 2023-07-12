import { FC, useContext } from 'react';
import { useSearchParams } from 'react-router-dom';
import { PeopleFilters } from '../components/Filter/PeopleFilters';
import { PeopleTable } from '../components/PeopleTable/PeopleTable';
import { peopleContext } from '../components/Context/ContextProvider';
import { getFilteredPeople } from '../utils/Helper';
import { Loader } from '../components/Loader';

export const PeoplePage: FC = () => {
  const { people, isLoading, hasError } = useContext(peopleContext);

  const [searchParams] = useSearchParams();

  const visiblePeople = getFilteredPeople(searchParams, people);

  const showVisiblePeople = !isLoading
  && !hasError
  && people.length;

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

              {showVisiblePeople
                ? <PeopleTable visiblePeople={visiblePeople} />
                : null}

              {hasError
                && <p data-cy="peopleLoadingError">Something went wrong</p>}

              {!people.length && (
                <p data-cy="noPeopleMessage">
                  There are no people on the server
                </p>
              )}

            </div>
          </div>
        </div>
      </div>
    </>
  );
};
