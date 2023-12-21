import { Outlet, useLocation, useParams } from 'react-router-dom';
import './App.scss';
import { Navigation } from './components/Navigation/Navigation';

export const App = () => {
  const { slug } = useParams();
  const { pathname, search, state } = useLocation();

  return (
    <div data-cy="app">
      <Navigation />
      <p className="centre">{`slug ${slug} `}</p>
      <p className="centre">{`pathname ${pathname} `}</p>
      <p className="centre">{`search ${search} `}</p>
      <p className="centre">{`state ${state} `}</p>
      <main className="section">
        <div className="container">
          <Outlet />
        </div>
      </main>
    </div>
  );
};
