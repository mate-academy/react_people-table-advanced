import classNames from 'classnames';

export const applyClassNames = (
  isActive: boolean,
  activeClassName: string,
  defaultClassName = '',
) => (
  classNames(
    defaultClassName,
    { [activeClassName]: isActive },
  )
);
