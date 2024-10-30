import { useLocalStorage } from '../utils/useLocalStorage';
import { Loader } from './Loader';
import { PeopleTable } from './PeopleTable';
import { PeopleFilters } from './PeopleFilters';

interface Props {}

export const PeoplePage: React.FC<Props> = () => {
  const { isUploadError, isLoading, isEmptyError } = useLocalStorage();

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
              {isLoading ? (
                <Loader />
              ) : (
                <>
                  {isUploadError ? (
                    <p data-cy="peopleLoadingError" className="has-text-danger">
                      Something went wrong
                    </p>
                  ) : isEmptyError ? (
                    <p data-cy="noPeopleMessage">
                      There are no people on the server
                    </p>
                  ) : (
                    <PeopleTable />
                  )}
                </>
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
