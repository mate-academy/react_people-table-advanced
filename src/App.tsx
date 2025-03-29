import './App.scss';
import { Navigate, Route, Routes } from 'react-router-dom';
import { HomePage } from './components/HomePage/HomePage';
import { PeoplePage } from './components/PeoplePage/PeoplePage';
import { NotFoundPage } from './components/NotFoundPage/NotFoundPage';
import { Navbar } from './components/Navbar';
// eslint-disable-next-line max-len
import { NavigationProvider } from './components/NavigationContext/NavigationContext';

export const App = () => {
  return (
    <div data-cy="app">
      <NavigationProvider>
        <Navbar />
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/people" element={<PeoplePage />} />
          <Route path="/people/:slug" element={<PeoplePage />} />
          <Route path="/home" element={<Navigate to="/" replace={true} />} />
          <Route path="*" element={<NotFoundPage />} />
        </Routes>
      </NavigationProvider>
    </div>
  );
};
