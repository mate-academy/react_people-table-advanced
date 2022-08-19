import classNames from 'classnames';

export const deleteClassName = (
  isActive: boolean,
  deletedClassName: string,
  defaultClassNames = '',
) => (
  classNames(
    defaultClassNames,
    { [deletedClassName]: !isActive },
  )
);
