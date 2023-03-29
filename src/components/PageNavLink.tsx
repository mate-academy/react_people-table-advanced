import classNames from 'classnames';
import { NavLink, To } from 'react-router-dom';

type PageNavLinkProps = {
  to: To;
  text: string;
};

export const PageNavLink: React.FC<PageNavLinkProps> = ({
  to,
  text,
}) => (
  <NavLink
    to={to}
    className={({ isActive }) => classNames('navbar-item', {
      'has-background-grey-lighter': isActive,
    })}
  >
    {text}
  </NavLink>
);
