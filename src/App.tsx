import './App.scss';
import { Routes, Route, Navigate } from 'react-router-dom';
import { Navbar } from './components/Navbar';
import { NotPage } from './components/Pages/NotPage';
import { HomePage } from './components/Pages/HomePage';
import { PeoplePage } from './components/Pages/PeoplePage';

export const App: React.FC = () => {
  return (
    <>
      <div data-cy="app">
        <Navbar />

        <div className="section">
          <div className="container">
            <Routes>
              <Route path="*" element={<NotPage />} />
              <Route path="/" element={<HomePage />} />
              <Route path="/home" element={<Navigate to="/" replace />} />
              <Route path="/people">
                <Route index element={<PeoplePage />} />
                <Route path=":slug" element={<PeoplePage />} />
              </Route>
            </Routes>
          </div>
        </div>
      </div>
    </>
  );
};
