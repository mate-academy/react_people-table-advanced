import { Link } from 'react-router-dom';
import classNames from 'classnames';

import { Person } from '../types';

export const PersonLink = ({ person }: { person: Person }) => {
  return (
    <Link
      to={`../${person.slug}`}
      className={classNames({
        'has-text-danger': person.sex === 'f',
      })}
    >
      {person.name}
    </Link>
  );
};
