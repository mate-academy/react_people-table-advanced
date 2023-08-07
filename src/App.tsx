import {
  Navigate, Route, Routes,
} from 'react-router-dom';
import './App.scss';
import { Navbar } from './components/Navbar';
import { PeoplePage } from './pages/PeoplePage';

export const App = () => {
  return (
    <div data-cy="app">
      <Navbar />

      <main className="section">

        <div className="container">
          <Routes>
            <Route path="/" element={<h1 className="title">Home Page</h1>} />
            <Route path="/home" element={<Navigate to="/" />} />

            <Route path="people">
              <Route index element={<PeoplePage />} />
              <Route path=":selectedSlug" element={<PeoplePage />} />
            </Route>

            <Route
              path="*"
              element={<h1 className="title">Page not found</h1>}
            />
          </Routes>
        </div>
      </main>
    </div>
  );
};
