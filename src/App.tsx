import './App.scss';
import { Navigate, Route, Routes } from 'react-router-dom';
import { HomePage } from './components/Homepage';
import { NavBar } from './components/NavBar';
import { Peoples } from './components/Peoples';

export const App = () => (
  <div data-cy="app">

    <main className="section">
      <div className="container">
        <NavBar />
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/people">
            <Route index element={<Peoples />} />
            <Route path=":slug" element={<Peoples />} />
          </Route>
          <Route path="/home" element={<Navigate to="/" replace />} />
          <Route
            path="*"
            element={<h1 className="title">Page not found</h1>}
          />
        </Routes>

      </div>
    </main>
  </div>
);
