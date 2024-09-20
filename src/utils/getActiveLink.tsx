import classNames from 'classnames';

export const getActiveLink = ({ isActive }: { isActive: boolean }) =>
  classNames('navbar-item', { 'has-background-grey-lighter': isActive });
