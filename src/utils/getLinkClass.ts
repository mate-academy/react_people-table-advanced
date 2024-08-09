import classNames from 'classnames';

interface Props {
  isActive: boolean;
}

export const getLinkClass = ({ isActive }: Props) =>
  classNames('navbar-item', {
    'has-background-grey-lighter': isActive,
  });
