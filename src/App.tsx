import { Navigate, Route, Routes } from 'react-router-dom';

import Header from './components/Header/Header';
import HomePage from './pages/HomePage/HomePage';
import PeoplePage from './pages/PeoplePage/PeoplePage';

import './App.scss';
import ErrorPage from './pages/ErrorPage/ErrorPage';

const App = () => (
  <div data-cy="app">
    <Header />

    <main className="section">
      <div className="container">
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="home" element={<Navigate to="/" replace={true} />} />
          <Route path="/people" element={<PeoplePage />}>
            <Route path=":personSlug" element={<PeoplePage />} />
          </Route>
          <Route path="*" element={<ErrorPage />} />
        </Routes>
      </div>
    </main>
  </div>
);

export default App;
