import { PeoplePage } from './components/PeoplePage';
import { Navbar } from './components/Navbar';
import { Navigate, Route, Routes } from 'react-router-dom';

import './App.scss';

export const App = () => {
  return (
    <div data-cy="app">
      <Navbar />

      <div className="section">
        <div className="container">
          <Routes>
            <Route
              path="/"
              element={<h1 className="title">Home Page</h1>}
            ></Route>
            <Route path="/home" element={<Navigate to={'/'} replace />}></Route>

            <Route path="/people">
              <Route index element={<PeoplePage />}></Route>
              <Route path=":slug" element={<PeoplePage />}></Route>
            </Route>

            <Route
              path="*"
              element={<h1 className="title">Page not found</h1>}
            ></Route>
          </Routes>
        </div>
      </div>
    </div>
  );
};
