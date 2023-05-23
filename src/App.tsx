import { Navigate, Route, Routes } from 'react-router-dom';
import { PeoplePage } from './components/PeoplePage';
import { Navbar } from './components/Navbar';
import './App.scss';

export const App = () => {
  return (
    <div data-cy="app">
      <Navbar />

      <Routes>
        <Route
          path="/"
          element={(
            <div className="section">
              <div className="container">
                <h1 className="title">Home Page</h1>
              </div>
            </div>
          )}
        />
        <Route path="/home" element={<Navigate to="/" replace />} />
        <Route path="/people">
          <Route
            index
            element={
              <PeoplePage />
            }
          />

          <Route
            path=":slug"
            element={
              <PeoplePage />
            }
          />
        </Route>
      </Routes>
    </div>
  );
};
