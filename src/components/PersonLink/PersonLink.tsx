import classNames from 'classnames';
import { Link, useSearchParams } from 'react-router-dom';
import { Sex } from '../../types/Sex';
import { Person } from '../../types/Person';

export const PersonLink = ({ person }: { person: Person }) => {
  const [searchParams] = useSearchParams();

  return (
    <Link
      to={{
        pathname: `/people/${person.slug}`,
        search: searchParams.toString(),
      }}
      className={classNames({
        'has-text-danger': person.sex === Sex.Female,
      })}
    >
      {person.name}
    </Link>
  );
};
