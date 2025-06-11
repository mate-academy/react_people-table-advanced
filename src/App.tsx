import './App.scss';
import { Navigate, Route, Routes } from 'react-router-dom';

import HomePage from './components/HomePage';
import NotFoundPage from './components/NotFoundPage';
import { PeoplePage } from './components/PeoplePage';
import { Navbar }  from './components/Navbar';

export default function App() {
  return (
    <div data-cy="app">
      <Navbar />
      <main className="section">
        <div className="container">
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/home" element={<Navigate to={'/'} replace />} />

            <Route path="/people">
              <Route index element={<PeoplePage />} />
              <Route path=":slug" element={<PeoplePage />} />
            </Route>

            <Route path="*" element={<NotFoundPage />} />
          </Routes>
        </div>
      </main>
    </div>
  );
}
