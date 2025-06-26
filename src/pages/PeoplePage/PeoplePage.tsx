import { Loader } from '../../components/Loader';
import { usePeopleList } from '../../hooks/usePeopleList';
import { PeopleTable } from '../../components/PeopleTable';
import { ErrorMessage } from '../../types/ErrorMessage';
import { PeopleFilters } from '../../components/PeopleFilters';
import { useSearchParams } from 'react-router-dom';

export const PeoplePage = () => {
  const [searchParams] = useSearchParams();
  const { peopleList, errorMessage, isLoading } = usePeopleList();

  return (
    <>
      <h1 className="title">People Page</h1>

      <div className="block">
        <div className="columns is-desktop is-flex-direction-row-reverse">
          {peopleList.length > 0 && (
            <div className="column is-7-tablet is-narrow-desktop">
              <PeopleFilters />
            </div>
          )}

          <div className="column">
            <div className="box table-container">
              {isLoading && <Loader />}

              {errorMessage === ErrorMessage.LoadingFailed && (
                <p data-cy="peopleLoadingError" className="has-text-danger">
                  {errorMessage}
                </p>
              )}

              {errorMessage === ErrorMessage.NoPeopleOnServer && (
                <p data-cy="noPeopleMessage">{errorMessage}</p>
              )}

              {peopleList.length > 0 && (
                <PeopleTable
                  key={searchParams.toString()}
                  peopleList={peopleList}
                />
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
