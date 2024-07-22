import classNames from 'classnames';

export const getLinkClass = ({ isActive }: { isActive: boolean }) =>
  classNames('navbar-item', {
    'has-background-grey-lighter': isActive,
  });

export const getCentury = (year: number): string => {
  const century = Math.floor((year - 1) / 100) + 1;

  return century.toString();
};
