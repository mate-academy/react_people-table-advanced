import './App.scss';
import { Navigate, Route, Routes } from 'react-router-dom';
import PeoplePage from './components/PeoplePage/PeoplePage';
import NotFoundPage from './components/NotFoundPage/NotFoundPage';
import HomePage from './components/HomePage/HomePage';
import NavBar from './components/NavBar/NavBar';

export const App = () => {
  return (
    <div data-cy="app">
      <NavBar />
      <main className="section">
        <div className="container">
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/home" element={<Navigate to="/" replace />} />

            <Route path="people">
              <Route path=":slug?" element={<PeoplePage />} />
            </Route>

            <Route path="*" element={<NotFoundPage />} />
          </Routes>
        </div>
      </main>
    </div>
  );
};
