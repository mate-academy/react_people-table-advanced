import {
  Navigate, Route, Routes,
} from 'react-router-dom';
import { PeoplePage } from './Pages/PeoplePage/PeoplePage';
import { Navbar } from './components/Navbar';
import './App.scss';
import { HomePage } from './Pages/HomePage/HomePage';
import { NotFoundPage } from './Pages/HomePage/NotFoundPage/NotFoundPage';

export const App = () => {
  return (
    <div data-cy="app">
      <Navbar />
      <div className="section">
        <div className="container">
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/people">
              <Route index element={<PeoplePage />} />
              <Route path=":slug" element={<PeoplePage />} />
            </Route>
            <Route path="*" element={<NotFoundPage />} />
            <Route path="/home" element={<Navigate to="/" replace />} />
          </Routes>
        </div>
      </div>
    </div>
  );
};
