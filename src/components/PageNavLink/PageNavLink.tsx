import classNames from 'classnames';
import { NavLink, useLocation } from 'react-router-dom';

type Props = {
  to: string;
  text: string;
};

export const PageNavLink: React.FC<Props> = ({ to, text }) => {
  const { search } = useLocation();

  return (
    <NavLink
      className={({ isActive }) => classNames(
        'navbar-item',
        {
          'has-background-grey-lighter': isActive,
        },
      )}
      to={{
        pathname: to,
        search: text === 'Home'
          ? ''
          : search,
      }}
    >
      {text}
    </NavLink>
  );
};
