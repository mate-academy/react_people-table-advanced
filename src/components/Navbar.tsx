import { NavLinkItem } from './NavLinkItem';

export enum NavLinks {
  Home,
  People,
}

const links = Object.keys(NavLinks).filter(key =>
  isNaN(Number(key)),
) as (keyof typeof NavLinks)[];

export const Navbar = () => {
  return (
    <nav
      data-cy="nav"
      className="navbar is-fixed-top has-shadow"
      role="navigation"
      aria-label="main navigation"
    >
      <div className="container">
        <div className="navbar-brand">
          {links.map(link => (
            <NavLinkItem key={link} link={link} />
          ))}
        </div>
      </div>
    </nav>
  );
};
