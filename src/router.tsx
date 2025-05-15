import { HashRouter, Navigate, Route, Routes } from 'react-router-dom';
import { App } from './App';
import { PeoplePage } from './components/PeoplePage';
import { Navbar } from './components/Navbar';
import { PageNotFound } from './components/PageNotFaund';
import { PeopleFilters } from './components/PeopleFilters';

export const MainRoutes = () => {
  return (
    <HashRouter>
      <Routes>
        <Route path="/" element={<Navbar />}>
          <Route index element={<App />} />
          <Route path="/people" element={<PeoplePage />}>
            <Route index element={<PeopleFilters />} />
            <Route path=":personId" element={<PeoplePage />} />
          </Route>
          <Route path="home" element={<Navigate to="/" replace />} />
        </Route>
        <Route
          path="*"
          element={
            <>
              <Navbar />
              <PageNotFound />
            </>
          }
        />
      </Routes>
    </HashRouter>
  );
};
