import classNames from 'classnames';
import { NavLink } from 'react-router-dom';

type Props = {
  link: string;
  text: string;
};

export const PageNavLink: React.FC<Props> = ({ link, text }) => {
  return (
    <NavLink
      aria-current="page"
      className={({ isActive }) => classNames(
        'navbar-item',
        { 'has-background-grey-lighter': isActive },
      )}
      to={link}
    >
      {text}
    </NavLink>
  );
};
