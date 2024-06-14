import * as Router from 'react-router-dom';
import { PeoplePage } from './components/PeoplePage';
import { App } from './App';

export const Root = () => {
  const { HashRouter, Routes, Route } = Router;

  return (
    <HashRouter>
      <Routes>
        <Route path="/" element={<App />}>
          <Route index element={<h1 className="title">Home Page</h1>} />
          <Route path="people" element={<PeoplePage />} />
          <Route path="people/:tabId" element={<PeoplePage />} />
          <Route path="home" element={<Router.Navigate to="/" />} />
          <Route path="*" element={<h1 className="title">Page not found</h1>} />
        </Route>
      </Routes>
    </HashRouter>
  );
};
