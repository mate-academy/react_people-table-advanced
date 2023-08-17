import classNames from 'classnames';
import { Person } from '../types';

export const setNavLinkClassName = ({ isActive }: { isActive: boolean }) => {
  return classNames('navbar-item', { 'has-background-grey-lighter': isActive });
};

export const setPersonLinkClassName = (person: Person) => {
  if (person.sex === 'f') {
    return 'has-text-danger';
  }

  return '';
};
