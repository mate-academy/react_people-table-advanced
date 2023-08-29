import cn from 'classnames';

export const getNavLinkClass = (
  { isActive }: { isActive: boolean },
) => cn('navbar-item', {
  'has-background-grey-lighter': isActive,
});
