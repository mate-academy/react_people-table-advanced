import { Navigate, Route, Routes } from 'react-router-dom';
import { HomePage } from './components/HomePage/HomePage';
import { MainNav } from './components/MainNav/MainNav';
import { PeoplePage } from './components/PeoplePage/PeoplePage';

export const App = () => {
  return (
    <div data-cy="app">
      <MainNav />

      <main className="section">
        <div className="container">
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="people">
              <Route index element={<PeoplePage />} />
              <Route path=":slug" element={<PeoplePage />} />
            </Route>
            <Route
              path="*"
              element={
                <h1 className="title">Page not found</h1>
              }
            />
            <Route
              path="/home"
              element={
                <Navigate to="/" replace />
              }
            />
          </Routes>
        </div>
      </main>
    </div>
  );
};
