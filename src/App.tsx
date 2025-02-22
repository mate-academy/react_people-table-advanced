import { PeoplePage } from './components/PeoplePage';

import './App.scss';
import { Route, Routes } from 'react-router-dom';
import { Layout } from './components/Layout';

export const App = () => {
  return (
    <div data-cy="app">
      <Routes>
        <Route element={<Layout />}>
          <Route path="/" element={<h1 className="title">Home Page</h1>} />
          <Route path="people">
            <Route index element={<PeoplePage />} />
            <Route path=":peopleId" element={<PeoplePage />} />
          </Route>
          <Route path="*" element={<h1 className="title">Page not found</h1>} />
        </Route>
      </Routes>
    </div>
  );
};
