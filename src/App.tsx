import { Navigate, Route, Routes } from 'react-router-dom'

import { HomePage } from './components/HomePage'
import { Navbar } from './components/Navbar'
import { NotFoundPage } from './components/NotFoundPage'
import { PeoplePage } from './components/PeoplePage'

import './App.scss'

export const App = () => {
  return (
    <div data-cy="app">
      <Navbar />
      <div className="section">
        <div className="container">
          <Routes>
            <Route path="/home" element={<Navigate to="/" replace />} />
            <Route path="/" element={<HomePage />} />
            <Route path="/people" element={<PeoplePage />} />
            <Route path="/people/:slug" element={<PeoplePage />} />
            <Route path="*" element={<NotFoundPage />} />
          </Routes>
        </div>
      </div>
    </div>
  );
};
