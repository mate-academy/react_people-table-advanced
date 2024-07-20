import classNames from 'classnames';
import { ActiveLink } from '../types/ActiveLink';

export const getClassForLink = ({ isActive }: ActiveLink) =>
  classNames('navbar-item', {
    'has-background-grey-lighter': isActive,
  });
