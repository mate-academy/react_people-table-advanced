import { Suspense, lazy } from 'react';
import { Routes, Route } from 'react-router-dom';
import { Navbar } from './components/Navbar';
import './App.scss';
import { Loader } from './components/Loader';

const PeoplePage = lazy(() => import('./components/PeoplePage'));

export const App = () => {
  return (
    <div data-cy="app">
      <Navbar />

      <div className="section">
        <div className="container">
          <Suspense fallback={<Loader />}>
            <Routes>
              <Route path="/" element={<h1 className="title">Home Page</h1>} />
              <Route path="/people">
                <Route index element={<PeoplePage />} />
                <Route path=":slug" element={<PeoplePage />} />
              </Route>
              <Route
                path="*"
                element={
                  <h1 className="title">Page not found</h1>
                }
              />
            </Routes>
          </Suspense>
        </div>
      </div>
    </div>
  );
};
