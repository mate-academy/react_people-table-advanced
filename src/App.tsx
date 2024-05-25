import { Navigate, Route, Routes } from 'react-router-dom';
import './App.scss';
import { Navbar } from './components/Navbar';
import { PeoplePage } from './components/PeoplePage';

export const App = () => (
  <div data-cy="app">
    <Navbar />

    <div className="section">
      <div className="container">
        <Routes>
          <Route path="/">
            <Route index element={<h1 className="title">Home Page</h1>} />
            <Route path="home" element={<Navigate to="/" replace={true} />} />
            <Route path="people" element={<PeoplePage />}>
              <Route path=":slug" element={<PeoplePage />} />
            </Route>
            <Route
              path="*"
              element={<h1 className="title">Page not found</h1>}
            />
          </Route>
        </Routes>
      </div>
    </div>
  </div>
);
