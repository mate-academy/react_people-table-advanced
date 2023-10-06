import classNames from 'classnames';
import { Link } from '../types';

export const getNavLinkClassNames = ({ isActive }: Link) => {
  return classNames(
    'navbar-item',
    {
      'has-background-grey-lighter': isActive,
    },
  );
};
