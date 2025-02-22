import { Link } from 'react-router-dom';
import { Person } from '../types';
import cn from 'classnames';

export const findParent = (parentName: string, people: Person[]) => {
  const parent = people.find(person => person.name === parentName);

  if (!parent) {
    return parentName;
  }

  return (
    <Link
      to={`../${parent.slug}`}
      className={cn({ 'has-text-danger': parent.sex === 'f' })}
    >
      {parent.name}
    </Link>
  );
};
