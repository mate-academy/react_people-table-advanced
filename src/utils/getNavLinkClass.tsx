import classNames from 'classnames';

export const getNavLinkClass = ({ isActive }: { isActive: boolean }) => {
  return classNames('navbar-item', { 'has-background-grey-lighter': isActive });
};
