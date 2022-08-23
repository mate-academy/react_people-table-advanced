import './App.scss';
import 'bulma/css/bulma.min.css';
import '@fortawesome/fontawesome-free/css/all.css';
import { Navigate, Route, Routes } from 'react-router-dom';
import { Navbar } from './components/Navbar';
import { HomePage } from './pages/HomePage/HomePage';
import { NotfoundPage } from './pages/NotfoundPage';
import { PeoplePage } from './pages/PeoplePage';
import { NewPerson } from './components/NewPerson';
import { PeopleProvider } from './components/PeopleProvider/PeopleProvider';

export const App: React.FC = () => {
  return (
    <div data-cy="app">
      <Navbar />

      <main className="section">
        <div className="container">
          <PeopleProvider>
            <Routes>
              <Route
                path="/"
                element={<HomePage />}
              />
              <Route
                path="people"
                element={(
                  <PeoplePage />
                )}
              >
                <Route
                  path=":slug"
                  element={(
                    <PeoplePage />
                  )}
                />
              </Route>
              <Route
                path="people/new"
                element={(
                  <NewPerson />
                )}
              />
              <Route path="*" element={<NotfoundPage />} />
              <Route path="/home" element={<Navigate to="/" />} />
            </Routes>
          </PeopleProvider>
        </div>
      </main>
    </div>
  );
};
