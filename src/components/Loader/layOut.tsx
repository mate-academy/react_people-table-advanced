import { Outlet } from 'react-router-dom';
import { TopNav } from './topNav';

export const LayOut = () => {
  return (
    <>
      <TopNav />

      <Outlet />
    </>
  );
};
