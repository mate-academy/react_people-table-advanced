import { PeoplePage } from './components/PeoplePage';
import { Navbar } from './components/Navbar';
import { useSearchParams, useLocation } from 'react-router-dom';

import './App.scss';
import { Navigate, Route, Routes } from 'react-router-dom';
import { HomePage } from './components/HomePage';
import { PageNotFound } from './components/PageNotFound';

export const App = () => {
  const [query] = useSearchParams();
  const { search } = useLocation();

  return (
    <div data-cy="app">
      <Navbar />

      <div className="section">
        {query && search}
        <div className="container">
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/home" element={<Navigate to="/" replace />} />
            <Route path="*" element={<PageNotFound />} />
            <Route path="people">
              <Route index element={<PeoplePage />} />
              <Route path=":personSlug" element={<PeoplePage />} />
            </Route>
          </Routes>
        </div>
      </div>
    </div>
  );
};
