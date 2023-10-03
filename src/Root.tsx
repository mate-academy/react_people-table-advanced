import {
  Navigate, Route, HashRouter as Router, Routes,
} from 'react-router-dom';
import { HomePage } from './Pages/HomePage';
import { People } from './Pages/People';
import { App } from './App';
import { DefaultPage } from './Pages/DefaultPage';

export const Root = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<App />}>
          <Route index element={<HomePage />} />
          <Route path="/home" element={<Navigate to="/" replace />} />
          <Route path="/people">
            <Route path=":personSlug?" element={<People />} />
          </Route>
          <Route path="*" element={<DefaultPage />} />
        </Route>
      </Routes>
    </Router>
  );
};
