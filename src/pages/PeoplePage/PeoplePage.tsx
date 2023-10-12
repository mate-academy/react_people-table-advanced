import { FC, useContext } from 'react';
import { PeopleProvider } from '../../store/PeopleContext';
import { PeopleFilters } from '../../components/PeopleFilter';
import { PeopleTable } from '../../components/PeopleTable';
import { Loader } from '../../components/Loader';

type TPeopleProps = {};

export const PeoplePage: FC<TPeopleProps> = () => {
  const {
    errorMessage,
    isLoading,
    preparedPeople,
  } = useContext(PeopleProvider);

  const shouldShowFiltering = !errorMessage && !isLoading;

  return (
    <>
      <h1 className="title container">People Page</h1>

      <div className="block container">
        <div className="columns is-desktop is-flex-direction-row-reverse">
          <div className="column is-7-tablet is-narrow-desktop">
            {shouldShowFiltering && <PeopleFilters />}
          </div>

          <div className="column">
            <div className="box table-container">
              {isLoading && <Loader />}

              {shouldShowFiltering && !!preparedPeople.length && (
                <PeopleTable />
              )}

              {shouldShowFiltering && !preparedPeople.length && (
                <p data-cy="noPeopleMessage">
                  There are no people on the server
                </p>
              )}

              {errorMessage && (
                <p data-cy="peopleLoadingError" className="has-text-danger">
                  {errorMessage}
                </p>
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
