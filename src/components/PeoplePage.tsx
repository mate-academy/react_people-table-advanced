import { useSearchParams } from 'react-router-dom';
import { useFetchPeople } from '../hooks/useFetchPeople';
import { getFilteredPeople } from '../utils/getFilteredPeople';

import { getPreparedPeople } from '../utils/getPreparedPeople';
import { PeopleFilters } from './PeopleFilters';
// import { Loader } from './Loader';
import { PeopleTable } from './PeopleTable';
import { getSortedPeople } from '../utils/getSortedPeople';

export const PeoplePage = () => {
  const { peopleData, errorMessage, isLoading } = useFetchPeople();
  const [searchParams] = useSearchParams();

  const preparedPeople = getPreparedPeople(peopleData);
  const filteredPeople = getFilteredPeople(preparedPeople, searchParams);
  const sortedPeople = getSortedPeople(filteredPeople, searchParams);

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
              <PeopleTable
                dataPeople={sortedPeople}
                errorMessage={errorMessage}
                isLoading={isLoading}
              />
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
