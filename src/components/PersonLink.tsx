import { Link } from 'react-router-dom';
import classNames from 'classnames';

import { Person } from '../types';

export const PersonLink: React.FC<{ person: Person }> = ({ person }) => (
  <Link
    className={classNames({
      'has-text-danger': person.sex === 'f',
    })}
    to={`/people/${person.slug}`}
  >
    {person.name}
  </Link>
);
