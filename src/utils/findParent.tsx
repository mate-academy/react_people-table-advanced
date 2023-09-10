import cn from 'classnames';
import { Link } from 'react-router-dom';
import { Person } from '../types';

export const findParent = (people: Person[], parent: string | null) => {
  const parentSelected = people.find(human => human.name === parent);

  if (parentSelected) {
    return (
      <Link
        to={`/people/${parentSelected.slug}`}
        className={cn({
          'has-text-danger': parentSelected.sex === 'f',
        })}
      >
        {parentSelected.name}
      </Link>
    );
  }

  return parent || '-';
};
