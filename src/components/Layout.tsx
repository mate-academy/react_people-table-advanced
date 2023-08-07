import { Outlet } from 'react-router-dom';
import { Navbar } from './Navbar';

export const Layout:React.FC = () => {
  return (
    <>
      <Navbar />

      <main className="section">
        <div className="container">
          <Outlet />
        </div>
      </main>
    </>
  );
};
