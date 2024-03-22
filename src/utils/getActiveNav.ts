import cn from 'classnames';

type ActiveNav = {
  isActive: boolean;
};

export const getActiveNav = ({ isActive }: ActiveNav) => {
  return cn('navbar-item', { 'has-background-grey-lighter': isActive });
};
