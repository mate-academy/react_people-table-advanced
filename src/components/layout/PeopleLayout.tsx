import { Outlet } from 'react-router-dom';

export const PeopleLayout = () => (
  <>
    <h1 className="title">People Page</h1>

    <div className="block">
      <div className="columns is-desktop is-flex-direction-row-reverse">
        <Outlet />
      </div>
    </div>
  </>
);
