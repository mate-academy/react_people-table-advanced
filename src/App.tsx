import { Routes, Route, Navigate, Outlet } from 'react-router-dom';
import { Navbar } from './components/Navbar';
import { HomePage } from './Pages/HomePage';
import { PeoplePage } from './Pages/PeoplePage';
import { NotFoundPage } from './Pages/NotFoundPage';
import { UsersProvider } from './Context/PeopleContext';
import './App.scss';

export const App = () => {
  return (
    <div data-cy="app">
      <Navbar />

      <div className="section">
        <div className="container">
          <Routes>
            <Route path="/home" element={<Navigate to="/" replace />} />

            <Route path="/" element={<HomePage />} />

            <Route
              path="people"
              element={
                <UsersProvider>
                  <Outlet />
                </UsersProvider>
              }
            >
              <Route index element={<PeoplePage />} />
              <Route path=":slug" element={<PeoplePage />} />
            </Route>

            {/* 404 */}
            <Route path="*" element={<NotFoundPage />} />
          </Routes>
        </div>
      </div>
    </div>
  );
};
