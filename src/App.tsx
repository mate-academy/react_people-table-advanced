import './App.scss';
import { PeoplePage } from './components/PeoplePage';
import { Navbar } from './components/Navbar';
import { Navigate, Route, Routes } from 'react-router-dom';

export const App = () => {
  return (
    <div data-cy="app">
      <Navbar />

      <div className="section container">
        <div className="container">
          <Routes>
            <Route path="/" element={<h1 className="title">Home Page</h1>} />
            <Route path="/home" element={<Navigate to="/" />} />
            <Route path="/people/:slug?/:?params?" element={<PeoplePage />} />

            <Route
              path="*"
              element={<h1 className="title">Page not found</h1>}
            />
          </Routes>
        </div>
      </div>
    </div>
  );
};
