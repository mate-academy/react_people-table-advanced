import cn from 'classnames';
import { useState } from 'react';
import { NavLink } from 'react-router-dom';

type Nav = 'home' | 'people';

type Props = {
  path: Nav
};

export const NavigationLink: React.FC<Props> = ({ path }) => {
  const [current, setCurrent] = useState<Nav>('home');

  return (
    <NavLink
      to={path === 'home' ? '/' : `/${path}`}
      onClick={() => setCurrent(path)}
      aria-current={current === path && 'page'}
      className={({ isActive }) => (
        cn('navbar-item', {
          'has-background-grey-lighter': isActive,
        }))}
    >
      {path[0].toUpperCase() + path.slice(1)}
    </NavLink>
  );
};
