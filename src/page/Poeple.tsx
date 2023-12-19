import { Outlet } from 'react-router-dom';
import { PeopleFilters } from '../components/PeopleFilters';

export const Poeple = () => (
  <>
    <h1 className="title">People Page</h1>
    <div className="block">
      <div className="columns is-desktop is-flex-direction-row-reverse">
        <div className="column is-7-tablet is-narrow-desktop">
          <PeopleFilters />
        </div>

        <div className="column">
          <Outlet />
        </div>
      </div>
    </div>

    {/* <div className="block">
      <div className="columns is-desktop is-flex-direction-row-reverse">
        <div className="column is-7-tablet is-narrow-desktop">
          <PeopleFilters />
          </div>
          </div>
        </div> */}
  </>
);
