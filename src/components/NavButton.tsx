import cn from 'classnames';
import { NavLink } from 'react-router-dom';

interface Props {
  children: string;
}

export const NavButton: React.FC<Props> = ({ children }) => {
  const slug = (children)
    .split(' ')
    .filter(word => word)
    .map(word => word.toLowerCase())
    .join('-');

  return (
    <NavLink
      className={({ isActive }) => cn('navbar-item is-capitalized', {
        'has-background-grey-lighter': isActive,
      })}
      to={`/${slug === 'home'
        ? ''
        : slug}`}
    >
      {children}
    </NavLink>
  );
};
