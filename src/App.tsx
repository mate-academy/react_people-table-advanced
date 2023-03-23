import { Navigate, Route, Routes } from 'react-router-dom';
import { Navbar } from './components/Navbar/Navbar';
import { TitlePage } from './components/Pages/TitlePage';

import './App.scss';
import { People } from './components/People/People/People';

export const App = () => {
  return (
    <div data-cy="app">
      <Navbar />

      <div className="section">
        <div className="container">
          <Routes>
            <Route path="/" element={<TitlePage title="Home Page" />} />
            <Route path="/people">
              <Route index element={(
                <>
                  <TitlePage title="People Page" />
                  <People />
                </>
              )} />
              <Route path=":slug" element={(
                <>
                  <TitlePage title="People Page" />
                  <People />
                </>
              )} />
            </Route>

            <Route
              path="/home"
              element={<Navigate to="/" replace />}
            />

            <Route path="*" element={<TitlePage title="Page not found" />}
            />
          </Routes>
        </div>
      </div>
    </div>
  );
};
