import { Routes, Route, Navigate } from 'react-router-dom';
import { HomePage } from './pages/HomePage';
import { App } from './App';
import { PeoplePage } from './pages/PeoplePage';
import { PageNotFound } from './pages/PageNotFound';
import { PeopleContextProvider } from './components/PeopleContext';

export const Root = () => {
  return (
    <PeopleContextProvider>
      <Routes>
        <Route path="/" element={<App />}>
          <Route index element={<HomePage />} />
          <Route path="home" element={<Navigate to="/" replace />} />
          <Route path="people">
            <Route path=":slug?" element={<PeoplePage />} />
          </Route>
          <Route path="*" element={<PageNotFound />} />
        </Route>
      </Routes>
    </PeopleContextProvider>
  );
};
