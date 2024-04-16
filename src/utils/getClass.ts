import cn from 'classnames';

export const getClass = ({ isActive }: { isActive: boolean }) =>
  cn('navbar-item', {
    'has-background-grey-lighter': isActive,
  });
