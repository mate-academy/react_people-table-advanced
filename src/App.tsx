import { Navigate, Route, Routes } from 'react-router-dom';
import { People } from './pages/People';
import { NavBar } from './layouts/NavBar';
import { Home } from './pages/Home';
import { NotFound } from './pages/NotFound';
import './App.scss';

export const App = () => {
  return (
    <div data-cy="app">
      <NavBar />

      <main className="section">
        <div className="container">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="home" element={<Navigate to="/" replace />} />
            <Route path="people">
              <Route index element={<People />} />
              <Route path=":slug" element={<People />} />
            </Route>
            <Route path="*" element={<NotFound />} />
          </Routes>
        </div>
      </main>
    </div>
  );
};
