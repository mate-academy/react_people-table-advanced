import { Navigate, Route, Routes } from 'react-router-dom';
import './App.scss';
import { NavMenu } from './components/NavMenus';
import { HomePage } from './pages/HomePage';
import { PeoplePage } from './pages/PeoplePage';
import { ErrorPage } from './pages/ErrorPage';

export const App = () => (
  <div data-cy="app">

    <NavMenu />

    <main className="section">
      <div className="container">
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="home" element={<Navigate to="/" replace />} />

          <Route path="people">
            <Route path=":personSlug?" element={<PeoplePage />} />
          </Route>

          <Route path="*" element={<ErrorPage />} />
        </Routes>
      </div>
    </main>
  </div>
);
