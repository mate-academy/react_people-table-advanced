import React from 'react';
import { useEffect, useState } from 'react';
import { NavLink, useLocation } from 'react-router-dom';

export const NavBar = () => {
  const location = useLocation();
  const [isActive, setIsActive] = useState<string>('');

  useEffect(() => {
    const currentLink = location.pathname;

    if (currentLink === '/' || currentLink === '/home') {
      setIsActive('home');
    } else if (currentLink.startsWith('/people')) {
      setIsActive('people');
    } else {
      setIsActive('');
    }
  }, [location]);

  const handleClick = (link: string) => {
    setIsActive(link);
  };

  return (
    <nav
      data-cy="nav"
      className="navbar is-fixed-top has-shadow"
      role="navigation"
      aria-label="main navigation"
    >
      <div className="container">
        <div className="navbar-brand">
          <NavLink
            className={`navbar-item ${isActive === 'home' && 'has-background-grey-lighter'}`}
            to="/"
            onClick={() => handleClick('home')}
          >
            Home
          </NavLink>

          <NavLink
            className={`navbar-item ${isActive === 'people' && 'has-background-grey-lighter'}`}
            to="/people"
            onClick={() => handleClick('people')}
          >
            People
          </NavLink>
        </div>
      </div>
    </nav>
  );
};
