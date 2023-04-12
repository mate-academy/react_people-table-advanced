import {
  Navigate,
  Outlet,
  Route,
  Routes,
} from 'react-router-dom';
import { PeoplePage } from './components/PeoplePage';
import { Navbar } from './components/Navbar';
import './App.scss';
import { HomePage } from './components/HomePage';
import { PageNotFount } from './components/PageNotFount';

export const App = () => {
  return (
    <div data-cy="app">
      <Navbar />

      <div className="section">
        <div className="container">
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/home" element={<Navigate to="/" replace />} />

            <Route path="/people" element={<Outlet />}>
              <Route index element={<PeoplePage />} />
              <Route path=":personId" element={<PeoplePage />} />
            </Route>

            <Route path="*" element={<PageNotFount />} />
          </Routes>
        </div>
      </div>
    </div>
  );
};
