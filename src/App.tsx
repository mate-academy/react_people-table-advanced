import { Navigate, Route, Routes } from 'react-router-dom';

import './App.scss';

import Navbar from './components/Navbar/Navbar';
import Main from './components/Main/Main';
import NotFound from './components/NotFound/NotFound';
import { PeoplePage } from './components/People/PeoplePage';

export const App = () => {
  return (
    <div data-cy="app">
      <Navbar />

      <div className="section">
        <div className="container">
          <Routes>
            <Route path="*" element={<NotFound />} />
            <Route path="/" element={<Main />} />
            <Route path="/people">
              <Route index element={<PeoplePage />} />
              <Route path=":personSlug" element={<PeoplePage />} />
            </Route>
            <Route path="/home" element={<Navigate to="/" replace />} />
          </Routes>
        </div>
      </div>
    </div>
  );
};
