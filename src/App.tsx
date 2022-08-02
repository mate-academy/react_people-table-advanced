import {
  Routes, Route, Link, Navigate,
} from 'react-router-dom';
import './App.scss';
import { HomePage } from './components/HomePage';
import { PeoplePage } from './components/PeoplePage';
import { NotFoundPage } from './components/NotFound';

const App = () => (
  <div className="App">
    <header>
      <nav className="navigation">
        <Link
          className="navigation__link"
          to="/"
        >
          Home
        </Link>
        <Link
          className="navigation__link"
          to="/people"
        >
          People
        </Link>
      </nav>
    </header>

    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/people" element={<PeoplePage />} />
      <Route path="/home" element={<Navigate to="/" />} />
      <Route path="*" element={<NotFoundPage />} />
    </Routes>
  </div>
);

export default App;
