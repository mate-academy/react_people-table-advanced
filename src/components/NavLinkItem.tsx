import classNames from 'classnames';
import { useLocation, useSearchParams } from 'react-router-dom';
import { NavLinks } from './Navbar';

interface Props {
  link: keyof typeof NavLinks;
}

export const NavLinkItem: React.FC<Props> = ({ link }) => {
  const [params] = useSearchParams();
  const { pathname } = useLocation();

  const lowCaseLink = link.toLowerCase();
  const urlSearchParams = params.toString().length ? `?${params}` : '';

  const pathWithParams = `#/${lowCaseLink}${urlSearchParams}`;
  const isActive =
    pathname.includes(lowCaseLink) || (pathname === '/' && link === 'Home');

  return (
    <a
      key={link}
      aria-current="page"
      href={link === 'Home' ? '#/' : pathWithParams}
      className={classNames('navbar-item', {
        'has-background-grey-lighter': isActive,
      })}
    >
      {link}
    </a>
  );
};
