import { Navigate, Route, Routes } from 'react-router-dom';
import { PeoplePage } from './components/PeoplePage';
import { DefaultPage } from './components/DefaultPage';
import { App } from './App';

export const Root = () => (
  <Routes>
    <Route path="/" element={<App />}>
      <Route index element={<DefaultPage title={'Home Page'} />} />
      <Route path="home" element={<Navigate to="/" replace />} />
      <Route path="people">
        <Route index element={<PeoplePage />} />
        <Route path=":slug" element={<PeoplePage />} />
      </Route>
      <Route path="*" element={<DefaultPage title={'Page not found'} />} />
    </Route>
  </Routes>
);
