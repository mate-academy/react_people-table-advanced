import * as Router from 'react-router-dom';
import { PeoplePage } from './components/PeoplePage';
import { App } from './App';

export const Root = () => {
  return (
    <Router.HashRouter>
      <Router.Routes>
        <Router.Route path="/" element={<App />}>
          <Router.Route index element={<h1 className="title">Home Page</h1>} />
          <Router.Route path="people" element={<PeoplePage />} />
          <Router.Route path="people/:tabId" element={<PeoplePage />} />
          <Router.Route path="home" element={<Router.Navigate to="/" />} />
          <Router.Route
            path="*"
            element={<h1 className="title">Page not found</h1>}
          />
        </Router.Route>
      </Router.Routes>
    </Router.HashRouter>
  );
};
