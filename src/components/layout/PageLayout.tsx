import { Outlet } from 'react-router-dom';
import { Navbar } from '../Navbar';

export const PageLayout = () => (
  <>
    <Navbar />

    <div className="section">
      <div className="container">
        <Outlet />
      </div>
    </div>
  </>
);
