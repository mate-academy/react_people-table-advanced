import { HashRouter, Navigate, Route, Routes } from 'react-router-dom';
import { App } from './App';
import { PeoplePage } from './components/PeoplePage';
import { PeopleFilters } from './components/PeopleFilters';

export const MainRoutes = () => {
  return (
    <HashRouter>
      <Routes>
        <Route path="/" element={<App />}>
          <Route path="/people" element={<PeoplePage />}>
            <Route index element={<PeopleFilters />} />
          </Route>
          <Route path="/people/:personId" element={<PeoplePage />}>
            <Route index element={<PeopleFilters />} />
          </Route>
          <Route path="home" element={<Navigate to="/" replace />} />
        </Route>
        <Route path="*" element={<App />} />
      </Routes>
    </HashRouter>
  );
};
