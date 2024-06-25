import { Outlet } from 'react-router-dom';

export const PeoplePage = () => {
  return (
    <>
      <h1 className="title">People Page</h1>

      <Outlet />
    </>
  );
};
