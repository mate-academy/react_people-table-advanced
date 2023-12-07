import classNames from 'classnames';

// eslint-disable-next-line max-len
export const getLinkClass = ({ isActive } : { isActive: boolean }) => classNames(
  'navbar-item',
  { 'has-background-grey-lighter': isActive },
);
