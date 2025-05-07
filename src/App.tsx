import { Outlet } from 'react-router-dom';
import './App.scss';
import Navbar from './components/Navbar';

export default function App() {
  return (
    <div data-cy="app">
      <Navbar />

      <div className="section">
        <div className="container">
          <Outlet />
        </div>
      </div>
    </div>
  );
}
