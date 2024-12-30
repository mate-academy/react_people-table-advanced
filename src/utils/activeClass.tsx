import classNames from 'classnames';

export const isActiveClass = (
  isActive: boolean,
  styles: string,
  activeStyles: string,
) => {
  return classNames(styles, { [activeStyles]: isActive });
};
