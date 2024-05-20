import cn from 'classnames';

export const getActiveClassName = ({ isActive }: { isActive: boolean }) => {
  return cn('navbar-item', {
    'has-background-grey-lighter': isActive,
  });
};
