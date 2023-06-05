import { Link } from 'react-router-dom';
import classNames from 'classnames';
import { Person } from '../types';
import { PersonSex } from '../types/PersonSex';

export const findParent = (people: Person[], parentName: string | null) => {
  const parent = people.find(person => person.name === parentName);

  if (parent) {
    return (
      <Link
        className={classNames({
          'has-text-danger': parent.sex === PersonSex.Female,
        })}
        to={`/people/${parent.slug}`}
      >
        {parent.name}
      </Link>
    );
  }

  return parentName || '-';
};
