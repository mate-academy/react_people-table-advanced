import { useContext } from 'react';
import { PeopleFilters } from './PeopleFilters';
import { Loader } from './Loader';
import { PeopleTable } from './PeopleTable';
import { PeopleContext } from '../App';
import { Errors } from '../types/Errors';

interface Props {
  isError: boolean;
  isLoad: boolean
}

export const PeoplePage: React.FC<Props> = ({
  isError,
  isLoad,
}) => {
  const arrayOfPeople = useContext(PeopleContext);

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
              {isLoad && (
                <Loader />
              )}

              {isError && (
                <p data-cy="peopleLoadingError">Something went wrong</p>
              )}
              {!arrayOfPeople && (
                <p data-cy="noPeopleMessage">
                  {Errors.no_people}
                </p>
              )}
              <p>There are no people matching the current search criteria</p>

              <PeopleTable />
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
