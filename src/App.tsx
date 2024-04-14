import { Navigate, Route, Routes } from 'react-router-dom';
import { PeoplePage } from './pages/PeoplePage/PeoplePage';
import { Navbar } from './components/Navbar/Navbar';
import { Layout } from './components/Layout';
import './App.scss';

export const App = () => {
  return (
    <div data-cy="app">
      <Navbar />

      <div className="section">
        <div className="container">
          <Routes>
            <Route path="/" element={<Layout />}>
              <Route path="/" element={<h1 className="title">Home Page</h1>} />
              <Route path="/home" element={<Navigate to="/" replace />} />
              <Route path="/people" element={<PeoplePage />}>
                <Route path=":personSlug" element={<PeoplePage />} />
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
};
