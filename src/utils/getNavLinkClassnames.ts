import cn from 'classnames';

export const getNavLinkClassnames = ({ isActive }: { isActive: boolean }) => {
  return cn('navbar-item', {
    'has-background-grey-lighter': isActive,
  });
};
