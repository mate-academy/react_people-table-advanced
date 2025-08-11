import { PeopleFilters } from './PeopleFilters/PeopleFilters';
import { PeoplePageContext } from '../context/PeoplePageContext';
import { Error } from './Error';
import { PeopleTable } from './PeopleTable/PeopleTable';

export const PeoplePage = () => {
  return (
    <PeoplePageContext>
      <h1 className="title">People Page</h1>

      <div className="block">
        <div className="columns is-desktop is-flex-direction-row-reverse">
          <PeopleFilters />
          <Error />
          <PeopleTable />
        </div>
      </div>
    </PeoplePageContext>
  );
};
