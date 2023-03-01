import { Navigate, Route, Routes } from 'react-router-dom';
import { PagePeople } from './components/pages/PagePeople';
import { Navbar } from './components/Navbar';
import { PageHome } from './components/pages/PageHome';
import { PageNotFound } from './components/pages/PageNotFound';

import './App.scss';

export const App = () => {
  return (
    <div data-cy="app">
      <Navbar />

      <div className="section">
        <div className="container">
          <Routes>
            <Route path="/" element={<PageHome />} />
            <Route path="home" element={<Navigate to="/" replace />} />
            <Route path="*" element={<PageNotFound />} />

            <Route path="people">
              <Route index element={<PagePeople />} />
              <Route path=":slug" element={<PagePeople />} />
            </Route>
          </Routes>
        </div>
      </div>
    </div>
  );
};
