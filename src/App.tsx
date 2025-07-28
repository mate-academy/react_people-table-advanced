import './App.scss';
import { Navigate, Route, Routes } from 'react-router-dom';
import { PeoplePage } from './components/PeoplePage';
import { HomePage } from './components/HomePage';
import { NotFoundPage } from './components/NotFoundPage';
import { Navbar } from './components/Navbar';

export const App = () => {
  return (
    <div data-cy="app">
      <Navbar />
      <div className="section">
        <div className="container">
          <Routes>
            <Route element={<HomePage />} path="/" />
            <Route element={<Navigate to="/" replace={true} />} path="/home" />
            <Route path="/people">
              <Route path=":selectedPerson?" element={<PeoplePage />} />
            </Route>
            <Route element={<NotFoundPage />} path="*" />
          </Routes>
        </div>
      </div>
    </div>
  );
};
