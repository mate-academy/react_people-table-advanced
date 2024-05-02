import cn from 'classnames';

export const setLinkClass = ({ isActive }: { isActive: boolean }) =>
  cn('navbar-item', { 'has-background-grey-lighter': isActive });
