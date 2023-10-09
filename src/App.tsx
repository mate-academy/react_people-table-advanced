import { Navigate, Route, Routes } from 'react-router-dom';
import { PeoplePage } from './components/PeoplePage';
import { Navbar } from './components/Navbar';

import './App.scss';

const NotFoundPage = () => <h1 className="title">Page not found</h1>;

export const App = () => {
  return (
    <div data-cy="app">
      <Navbar />

      <div className="section">
        <div className="container">
          <div className="block">
            <div className="box table-container">

              <Routes>
                <Route
                  path="/"
                  element={<h1 className="title">Home Page</h1>}
                />
                <Route path="/home" element={<Navigate to="/" />} />
                <Route path="/people" element={<PeoplePage />} />
                <Route path="/people/:slug" element={<PeoplePage />} />
                <Route path="*" element={<NotFoundPage />} />
              </Routes>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
