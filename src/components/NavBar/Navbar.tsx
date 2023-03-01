import React from 'react';
import { NavItemType } from '../../types/NavItemType';
import { NavItem } from './NavItem';

interface Props {
  navItems: NavItemType[]
}

export const Navbar: React.FC<Props> = React.memo(({ navItems }) => {
  return (
    <nav
      data-cy="nav"
      className="navbar is-fixed-top has-shadow"
      role="navigation"
      aria-label="main navigation"
    >
      <div className="container">
        <div className="navbar-brand">
          {navItems.map(item => (
            <NavItem
              key={item.id}
              navItem={item.title}
              link={item.url}
            />
          ))}
        </div>
      </div>
    </nav>
  );
});
