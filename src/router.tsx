import { HashRouter, Navigate, Route, Routes } from 'react-router-dom';
import { App } from './App';
import { PeoplePage } from './components/PeoplePage';
import { PeopleFilters } from './components/PeopleFilters';
import { PageNotFound } from './components/PageNotFound';
import { Navbar } from './components/Navbar';

export const MainRoutes = () => {
  return (
    <HashRouter>
      <Routes>
        <Route path="/" element={<Navbar />}>
          <Route index element={<App />} />
          <Route path="people" element={<PeoplePage />}>
            <Route index element={<PeopleFilters />} />
            <Route path=":personId" element={<PeopleFilters />} />
          </Route>
          <Route path="home" element={<Navigate to="/" replace />} />
          <Route path="*" element={<PageNotFound />} />
        </Route>
      </Routes>
    </HashRouter>
  );
};
