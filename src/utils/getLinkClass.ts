import classNames from 'classnames';

type NavLinkClass = {
  isActive: boolean;
};

export const getLinkClass = ({ isActive }: NavLinkClass) =>
  classNames('navbar-item', { 'has-background-grey-lighter': isActive });
