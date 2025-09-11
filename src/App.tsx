import { PeoplePage } from './Pages/PeoplePage';
import { Navbar } from './components/Navbar';
import { Navigate, Route, Routes } from 'react-router-dom';
import './App.scss';
import { HomePage } from './Pages/HomePage';
import { NotFoundPage } from './Pages/NotFoundPage';
import { UsersProvider } from './Context/PeopleContext';

export const App = () => {
  return (
    <div data-cy="app">
      <Navbar />

      <div className="section">
        <div className="container">
          <Routes>
            <Route path="/home" element={<Navigate to="/" replace />} />

            <Route path="/" element={<HomePage />} />

            <Route path="people">
              <Route
                index
                element={
                  <UsersProvider>
                    <PeoplePage />
                  </UsersProvider>
                }
              />
              <Route
                path=":slug"
                element={
                  <UsersProvider>
                    <PeoplePage />
                  </UsersProvider>
                }
              />
            </Route>
            <Route path="*" element={<NotFoundPage />} />
          </Routes>
        </div>
      </div>
    </div>
  );
};
