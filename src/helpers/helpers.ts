import classNames from 'classnames';
import { Person } from '../types';

export const findPersonSlugByName = (
  name: string | null,
  peopleList: Person[],
): string | null => {
  const person = peopleList.find(personObj => personObj.name === name);

  return person ? person.slug : null;
};

export const isLinkActive = ({ isActive }: { isActive: boolean }) => {
  return classNames('navbar-item', {
    'has-background-grey-lighter': isActive,
  });
};
