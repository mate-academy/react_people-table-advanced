import { FC } from 'react';
import { Outlet } from 'react-router-dom';
import { Navbar } from '../components/Navbar/Navbar';

export const Layout: FC = () => {
  return (
    <div className="section">
      <div className="container">
        <Navbar />
        <Outlet />
      </div>
    </div>
  );
};
