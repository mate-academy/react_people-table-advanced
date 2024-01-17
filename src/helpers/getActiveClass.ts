import classNames from 'classnames';

type ClassType = {
  isActive: boolean;
};

export const getActiveClass = ({ isActive }: ClassType) => classNames(
  'navbar-item', {
    'has-background-grey-lighter': isActive,
  },
);
