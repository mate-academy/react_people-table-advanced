import { Outlet } from 'react-router-dom';
import { Loader } from '../Loader/Loader';
import { PeopleFilters } from '../PeopleFilters/PeopleFilters';
import { SexFilter } from '../../types/SexFilter';

interface Props {
  isLoadingPeople: boolean;
  fetchPeopleError: boolean;
  sexFilter: SexFilter;
  nameFilter: string;
  centuryFilter: string[];
  setSexFilter: React.Dispatch<React.SetStateAction<string>>;
  setNameFilter: React.Dispatch<React.SetStateAction<string>>;
  setCenturyFilter: React.Dispatch<React.SetStateAction<string[]>>;
}

export const PeoplePage: React.FC<Props> = ({
  isLoadingPeople,
  fetchPeopleError,
  sexFilter,
  nameFilter,
  centuryFilter,
  setSexFilter,
  setNameFilter,
  setCenturyFilter,
}) => {
  return (
    <>
      <h1 className="title">People Page</h1>
      {isLoadingPeople ? (
        <Loader />
      ) : (
        <div className="block">
          <div className="columns is-desktop is-flex-direction-row-reverse">
            <div className="column is-7-tablet is-narrow-desktop">
              <PeopleFilters
                setSexFilter={setSexFilter}
                sexFilter={sexFilter}
                nameFilter={nameFilter}
                centuryFilter={centuryFilter}
                setCenturyFilter={setCenturyFilter}
                setNameFilter={setNameFilter}
              />
            </div>
            <div className="box table-container">
              <div className="column">
                {fetchPeopleError && (
                  <p data-cy="peopleLoadingError" className="has-text-danger">
                    Something went wrong
                  </p>
                )}
                {!isLoadingPeople && !fetchPeopleError && <Outlet />}
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};
