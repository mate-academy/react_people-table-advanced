import { PeoplePage } from './components/People/PeoplePage';
import { Navbar } from './components/Navbar';

import './App.scss';
import { Navigate, Route, Routes } from 'react-router-dom';
import Home from './components/Home/Home';
import NoPeople from './components/NoPeople/NoPeople';

export const App = () => {
  return (
    <div data-cy="app">
      <Navbar />

      <div className="section">
        <div className="container">
          <Routes>
            <Route index element={<Home />} />
            <Route path="home" element={<Navigate to="/" replace />} />
            <Route path="people" element={<PeoplePage />}>
              <Route path=":slug" />
            </Route>
            <Route path="*" element={<NoPeople />} />
          </Routes>
        </div>
      </div>
    </div>
  );
};
