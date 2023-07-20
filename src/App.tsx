import {
  Navigate,
  Route,
  Routes,
  useLocation,
} from 'react-router-dom';

import './App.scss';
import { Navbar } from './components/NavBar';
import { PeoplePage } from './pages/PeoplePage';
import { HomePage } from './pages/HomePage';
import { ErrorPage } from './pages/ErrorPage';

export const App = () => {
  const location = useLocation();

  return (
    <div data-cy="app">
      <Navbar />

      <div>
        <p className="title is-active">{location.pathname}</p>
        <p className="title is-info">{location.search}</p>
      </div>

      <main className="section">
        <div className="container">
          <Routes>
            <Route path="/" element={<HomePage />} />

            <Route
              path="home"
              element={<Navigate to="/" replace />}
            />

            <Route path="people">
              <Route index element={<PeoplePage />} />
              <Route path=":slug" element={<PeoplePage />} />
            </Route>

            <Route path="*" element={<ErrorPage />} />
          </Routes>
        </div>
      </main>
    </div>
  );
};
