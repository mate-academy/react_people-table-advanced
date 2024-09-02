import './App.scss';
import { HomePage } from './pages/HomePage/HomePage';
import { Navigate, Route, Routes } from 'react-router-dom';
import { NotFound } from './pages/NotFound/NotFound';
import { NavBar } from './components/NavBar/NavBar';
import { PeoplePage } from './pages/PeoplePage/PeoplePage';

export const App = () => {
  return (
    <div data-cy="app">
      <NavBar />

      <div className="section">
        <div className="container">
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="home" element={<Navigate to="/" replace />} />
            <Route path="/people">
              <Route index element={<PeoplePage />} />
              <Route path=":personSlug" element={<PeoplePage />} />
            </Route>
            <Route path="*" element={<NotFound />} />
          </Routes>
        </div>
      </div>
    </div>
  );
};
