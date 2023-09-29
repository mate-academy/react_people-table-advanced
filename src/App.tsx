import { HashRouter, Route } from 'react-router-dom';
import { PeoplePage } from './components/PeoplePage';
import { Navbar } from './components/Navbar';
import './App.scss';

export const App = () => {
  return (
    <HashRouter>
      <div data-cy="app">
        <Navbar />
        <div className="section">
          <div className="container">
            <Route path="#/people">
              <div className="block">
                <div className="box table-container">
                  <PeoplePage />
                </div>
              </div>
            </Route>
            <Route path="/">
              <h1 className="title">Home Page</h1>
            </Route>
            <Route>
              <h1 className="title">Page not found</h1>
            </Route>
          </div>
        </div>
      </div>
    </HashRouter>
  );
};
