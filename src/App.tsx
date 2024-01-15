import {
  Routes, Route, Navigate,
} from 'react-router-dom';
import { PeopleTable } from './components/peopleTable';
import { PageNotFound } from './components/pageNotFound';
import { HomePage } from './components/homePage';

import './App.scss';
import { Navbar } from './components/Navbar';

export const App = () => (
  <div data-cy="app">

    <Navbar />

    <main className="section">
      <div className="container">
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/home" element={<Navigate to="/" replace />} />
          <Route path="/people">
            <Route index element={<PeopleTable />} />
            <Route path=":slug?" element={<PeopleTable />} />
          </Route>
          <Route path="*" element={<PageNotFound />} />
        </Routes>

      </div>
    </main>
  </div>
);
