import classNames from 'classnames';
import { FC } from 'react';
import { NavLink, useLocation } from 'react-router-dom';

type Props = {
  to: string;
  content: string;
};

export const PageNavLink: FC<Props> = ({ to, content }) => {
  const location = useLocation();

  const isHome = content === 'Home';

  return (
    <NavLink
      className={({ isActive }) => classNames(
        'navbar-item',
        { 'has-background-grey-lighter': isActive },
      )}
      to={({
        pathname: to,
        search: isHome ? '' : location.search,
      })}
    >
      {content}
    </NavLink>
  );
};
