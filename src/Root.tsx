import { Navigate, Route, Routes } from 'react-router-dom';
import { HashRouter as Router } from 'react-router-dom';
import { GlobalStateProvider } from './store';
import { PeoplePage } from './components/PeoplePage';
import { App } from './App';

export const Root = () => {
  return (
    <GlobalStateProvider>
      <Router>
        <Routes>
          <Route path="/" element={<App />}>
            <Route index element={<h1 className="title">Home Page</h1>} />
            <Route path="/home" element={<Navigate to="/" replace />} />
            <Route path="people">
              <Route index element={<PeoplePage />} />
              <Route path=":slug" element={<PeoplePage />} />
            </Route>
            <Route
              path="*"
              element={<h1 className="title">Page not found</h1>}
            />
          </Route>
        </Routes>
      </Router>
    </GlobalStateProvider>
  );
};
