import { HomePage } from './components/HomePage/HomePage';

import './App.scss';
import { Navigate, Route, Routes } from 'react-router-dom';
import { PageNotFound } from './components/PageNotFound/PageNotFound';
import { PeopleProvider } from './providers/PeopleProvider';
import { PeoplePage } from './components/PeoplePage/PeoplePage';
import { Navbar } from './components/Navbar/Navbar';

export const App = () => (
  <div data-cy="app">
    <Navbar />
    <PeopleProvider>
      <main className="section">
        <div className="container">
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/home" element={<Navigate replace to="/" />} />
            <Route path="/people">
              <Route index element={<PeoplePage />} />
              <Route path=":slug" element={<PeoplePage />} />
            </Route>
            <Route path="*" element={<PageNotFound />} />
          </Routes>
        </div>
      </main>
    </PeopleProvider>
  </div>
);
