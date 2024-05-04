import { useContext } from 'react';
import { PeopleFilters } from '../../components/PeopleFilters';
import { PeopleTable } from '../../components/PeopleTable';
import { TableContext } from '../../store/TableContextProvider';

export const PeoplePage = () => {
  const { isLoading, isEmptyMessage } = useContext(TableContext);

  return (
    <>
      <h1 className="title">People Page</h1>

      <div className="block">
        <div className="columns is-desktop is-flex-direction-row-reverse">
          {!isLoading && <PeopleFilters />}
          <div className="column">
            <div className="box table-container">
              <div style={{ display: isEmptyMessage ? 'none' : 'block' }}>
                <PeopleTable />
              </div>
              {isEmptyMessage && (
                <p>There are no people matching the current search criteria</p>
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
