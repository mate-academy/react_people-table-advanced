import { useContext } from 'react';
import { PeopleFilters } from '../../components/PeopleFilters';
import { PeopleTable } from '../../components/PeopleTable';
import { TableContext } from '../../App';
export const PeoplePage = () => {
  const { isLoading } = useContext(TableContext);

  return (
    <>
      <h1 className="title">People Page</h1>

      <div className="block">
        <div className="columns is-desktop is-flex-direction-row-reverse">
          {!isLoading && <PeopleFilters />}
          <div className="column">
            <div className="box table-container">
              <PeopleTable />
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
