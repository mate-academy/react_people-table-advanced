import classNames from 'classnames';
import { FC } from 'react';
import { NavLink } from 'react-router-dom';

interface Props {
  title: string;
  path: string;
  testRequired?: boolean;
}

export const NewNavLink: FC<Props> = ({ title, path, testRequired }) => (
  <NavLink
    aria-current={testRequired ? 'page' : undefined}
    className={
      ({ isActive }) => {
        return classNames('navbar-item',
          { 'has-background-grey-lighter': isActive });
      }
    }
    to={path}
  >
    {title}
  </NavLink>
);
