import { PeopleFilters } from './filters/PeopleFilters';
import { PeopleTable } from './table/PeopleTable';
import { LoadingState } from '../types';
import { Person } from '@entities/person';
import { Loader } from '@shared/ui';
import { usePeopleContext } from '../model';

export const PeopleMain = () => {
  const { apiPeople, renderList } = usePeopleContext();

  const childrenMapper = {
    [LoadingState.LOADING]: <Loader />,
    [LoadingState.LOADING_ERROR]: (
      <p data-cy="peopleLoadingError">Something went wrong</p>
    ),
    [LoadingState.NO_PEOPLE]: (
      <p data-cy="noPeopleMessage">There are no people on the server</p>
    ),
    [LoadingState.NO_MATCH]: (
      <p>There are no people matching the current search criteria</p>
    ),
  };

  return (
    <>
      <h1 className="title">People Page</h1>

      <div className="block">
        <div className="columns is-desktop is-flex-direction-row-reverse">
          <div className="column is-7-tablet is-narrow-desktop">
            {renderList !== null && <PeopleFilters />}
          </div>

          <div className="column">
            <div className="box table-container">
              {Object.values(LoadingState).some(el => el === apiPeople) ? (
                childrenMapper[apiPeople as LoadingState]
              ) : renderList === LoadingState.NO_MATCH ? (
                childrenMapper[LoadingState.NO_MATCH]
              ) : (
                <PeopleTable people={renderList as Person[]} />
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
