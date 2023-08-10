import cn from 'classnames';

export const activeLink = (
  { isActive }: { isActive: boolean; },
) => cn('navbar-item', {
  'has-background-grey-lighter': isActive,
});
