import classNames from 'classnames';
import { Link } from 'react-router-dom';
import { Sex } from '../../types/Sex';
import { Person } from '../../types/Person';

export const PersonLink = ({ person }: { person: Person }) => {
  return (
    <Link
      to={`/people/${person.slug}`}
      className={classNames({
        'has-text-danger': person.sex === Sex.Female,
      })}
    >
      {person.name}
    </Link>
  );
};
