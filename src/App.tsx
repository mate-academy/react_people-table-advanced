import './App.scss';
import { Navigate, NavLink, Route, Routes } from 'react-router-dom';
import classNames from 'classnames';
import { NotFoundPage } from './components/notfoundpage/NotFoundPage';
import { PeoplePage } from './components/peoplepage/peoplepage';
import { HomePage } from './components/homepage/homepage';

export const App = () => {
  const getLinkClass = ({ isActive }: { isActive: boolean }) => {
    return classNames('navbar-item', {
      'has-background-grey-lighter': isActive,
    });
  };

  return (
    <>
      <div data-cy="app">
        <nav
          data-cy="nav"
          className="navbar is-fixed-top has-shadow"
          role="navigation"
          aria-label="main navigation"
        >
          <div className="container">
            <div className="navbar-brand">
              <NavLink className={getLinkClass} to={'/'}>
                Home
              </NavLink>

              <NavLink className={getLinkClass} to={'/people'}>
                People
              </NavLink>
            </div>
          </div>
        </nav>

        <main className="section">
          <div className="container">
            <Routes>
              <Route path="/" element={<HomePage />} />
              <Route path="/people">
                <Route index element={<PeoplePage />} />
                <Route path=":slug" element={<PeoplePage />} />
              </Route>
              <Route path="*" element={<NotFoundPage />} />
              <Route
                path="/home"
                element={<Navigate to={'/'} replace={true} />}
              />
            </Routes>
          </div>
        </main>
      </div>
    </>
  );
};
