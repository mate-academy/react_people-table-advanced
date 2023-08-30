import { Navigate, Route, Routes } from 'react-router-dom';
import { PeoplePage } from './components/PeoplePage';
import { Navbar } from './components/Navbar';

import './App.scss';
import { NotFoundPage } from './NotFoundPage';
import { HomePage } from './HomePage';
import { PeopleContextProvider } from './context.ts/PeopleContext';

export const App = () => {
  return (

    <div data-cy="app">
      <Navbar />
      <PeopleContextProvider>
        <div className="section">
          <div className="container">
            <Routes>
              <Route path="/" element={<HomePage />} />
              <Route path="/home" element={<Navigate to="/" />} />
              <Route path="/people" element={<PeoplePage />}>
                <Route path=":selectedSlug" element={<PeoplePage />} />
              </Route>
              <Route path="/*" element={<NotFoundPage />} />
            </Routes>

          </div>
        </div>
      </PeopleContextProvider>
    </div>

  );
};
