import './App.scss';
import { Navigate, Route, Routes, useLocation } from 'react-router-dom';
import { HomePage } from './components/HomePage';
import { Navigation } from './components/Navigation';
import { PageNotFound } from './components/PageNotFound';
import { PeoplePage } from './components/PeoplePage';

export const App: React.FC = () => {
  const location = useLocation();

  return (
    <div data-cy="app">
      <Navigation />

      <main className="section">
        <div className="container">
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/home" element={<Navigate to={`/${location.search}`} replace />} />
            <Route path="/people" element={<PeoplePage />} />
            <Route path="/people/:slug" element={<PeoplePage />} />
            <Route path="*" element={<PageNotFound />} />
          </Routes>
        </div>
      </main>
    </div>
  );
};
