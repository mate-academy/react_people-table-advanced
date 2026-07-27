import { Route, Routes, Navigate } from 'react-router-dom';
import { Navbar } from './components/Navbar';
import { PeoplePage } from './components/PeoplePage';

export const HomePage = () => {
  return <h1 className="title">Home Page</h1>;
};

export const NotFoundPage = () => {
  return <h1 className="title">Page not found</h1>;
};

export const App = () => {
  return (
    <div className="section" data-cy="app">
      <Navbar />

      <div className="container">
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/home" element={<Navigate to="/" replace />} />

          <Route path="/people">
            <Route index element={<PeoplePage />} />
            <Route path=":slug" element={<PeoplePage />} />
          </Route>

          <Route path="*" element={<NotFoundPage />} />
        </Routes>
      </div>
    </div>
  );
};
