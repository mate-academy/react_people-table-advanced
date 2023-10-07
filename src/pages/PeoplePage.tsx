import { useSearchParams } from 'react-router-dom';

import { PeopleFilters } from '../components/PeopleFilters';
import { Loader } from '../components/Loader';
import { PeopleTable } from '../components/PeopleTable';

import { usePeople } from '../store/PeopleContext';
import { preparedPeople } from '../utils/preparedPeople';

export const PeoplePage = () => {
  const { people, isLoading, isError } = usePeople();
  const [searchParams] = useSearchParams();

  const visiblePeople = preparedPeople(searchParams, people);

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
              {isLoading && (
                <Loader />
              )}

              {isError && !isLoading && (
                <p
                  data-cy="peopleLoadingError"
                  className="has-text-danger"
                >
                  Something went wrong
                </p>
              )}

              {!people?.length && !isLoading && !isError && (
                <p
                  data-cy="noPeopleMessage"
                >
                  There are no people on the server
                </p>
              )}

              {!!people?.length && !isError && (
                <PeopleTable people={visiblePeople} />
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
