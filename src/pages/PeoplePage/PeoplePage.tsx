import { PeopleFilters } from '../../components/PeopleFilters/PeopleFilters';
import { Loader } from '../../components/Loader';
import { PeopleTable } from '../../components/PeopleTable/PeopleTable';
import { useContext } from 'react';
import { PeopleContext } from '../../context/PeopleContext';

export const PeoplePage = () => {
  const { people, error, isLoading } = useContext(PeopleContext);

  return (
    <>
      <h1 className="title">People Page</h1>
      <div className="block">
        <div className="columns is-desktop is-flex-direction-row-reverse">
          <div className="column is-7-tablet is-narrow-desktop">
            {people.length !== 0 && <PeopleFilters />}
          </div>

          <div className="column">
            <div className="box table-container">
              {isLoading && <Loader />}

              {error && <p data-cy="peopleLoadingError">{error}</p>}

              {!isLoading && people.length === 0 && (
                <p data-cy="noPeopleMessage">
                  There are no people on the server
                </p>
              )}
              {people.length !== 0 && <PeopleTable />}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
