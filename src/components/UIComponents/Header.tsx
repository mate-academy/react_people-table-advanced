import { FC } from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import './Header.css';

export const Header: FC = () => {
  const { search } = useLocation();

  return (
    <header className="Header">
      <div className="container">
        <NavLink to="/">Home </NavLink>
        <NavLink to={{
          pathname: 'people',
          search,
        }}
        >
          People
        </NavLink>
      </div>
    </header>
  );
};
