import { Navigate, Route, Routes } from 'react-router-dom';
import { App } from './App';
import { HomePage } from './components/HomePage';
import { PeoplePage } from './components/PeoplePage';
import { PeopleListProvider } from './store/PeopleContext';
import { PeopleTable } from './components/PeopleTable';
import { SearchParamsProvider } from './store/searchHelper';

export const Root = () => {
  return (
    <PeopleListProvider>
      <SearchParamsProvider>
        <Routes>
          <Route path="/" element={<App />}>
            <Route index element={<HomePage />} />
            <Route path="home" element={<Navigate to="/" />} />

            <Route path="people" element={<PeoplePage />}>
              <Route path=":slug?" element={<PeopleTable />} />
            </Route>

            <Route
              path="*"
              element={<h1 className="title">Page not found</h1>}
            />
          </Route>
        </Routes>
      </SearchParamsProvider>
    </PeopleListProvider>
  );
};
