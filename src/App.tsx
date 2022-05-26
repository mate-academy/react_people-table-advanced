import './App.scss';
import 'bulma/css/bulma.min.css';
import {
  Routes, Route, Navigate, Link,
} from 'react-router-dom';
import PeoplePage from './components/PeoplePage/PeoplePage';
import HomePage from './components/HomePage/HomePage';

const App = () => (
  <div className="App">
    <header>
      <nav className="navbar">
        <Link className="navbar-item" to="/">Home page</Link>
        <Link className="navbar-item" to="/people">People page</Link>
      </nav>
    </header>
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="people" element={<PeoplePage />}>
        <Route path=":slug" element={<PeoplePage />} />
      </Route>
      <Route path="*" element={<p>Page not found</p>} />
      <Route path="/home" element={<Navigate replace to="/" />} />
    </Routes>
  </div>
);

export default App;
