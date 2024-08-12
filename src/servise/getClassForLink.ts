import cn from 'classnames';

export const getClassForLink = ({
  isActive,
}: {
  isActive: boolean;
}): string => {
  return cn('navbar-item', { 'has-background-grey-lighter': isActive });
};
