import './App.scss';
import { Navigate, Route, Routes, useLocation } from 'react-router-dom';
import { Home } from './pages/Home/Home';
import { NotFoundPage } from './pages/PageNotFound/NotFoundPage';
import { PeopleTable } from './pages/PeopleTable/PeopleTable';
import { MainLayout } from './layout/MainLayout';
import { useEffect, useState } from 'react';
import { Person } from './types';
import { getPeople } from './api/people';

export const App = () => {
  const [people, setPeople] = useState<Array<Person> | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [hasError, setHasError] = useState(false);
  const { pathname } = useLocation();

  useEffect(() => {
    if (!pathname.startsWith('/people')) {
      return;
    }

    setIsLoading(true);

    const fetchPeople = async () => {
      try {
        const data = await getPeople();

        setPeople(data);
      } catch {
        setHasError(true);
      } finally {
        setIsLoading(false);
      }
    };

    fetchPeople();
  }, [pathname]);

  return (
    <Routes>
      <Route path="/" element={<MainLayout />}>
        <Route index element={<Home />} />
        <Route
          path="people"
          element={
            <PeopleTable
              people={people}
              isLoading={isLoading}
              hasError={hasError}
            />
          }
        />
        <Route
          path="people/:slug"
          element={
            <PeopleTable
              people={people}
              isLoading={isLoading}
              hasError={hasError}
            />
          }
        />

        <Route path="home" element={<Navigate to="/" replace />} />
        <Route path="*" element={<NotFoundPage />} />
      </Route>
    </Routes>
  );
};
