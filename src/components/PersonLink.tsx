import classNames from 'classnames';
import { Link, useSearchParams } from 'react-router-dom';
import { Person } from '../types';

type Props = {
  person: Person;
};

export const PersonLink: React.FC<Props> = ({ person }) => {
  const [searchParams] = useSearchParams();
  const search = searchParams.toString();

  return (
    <Link
      to={{
        pathname: `/people/${person.slug}`,
        search: search ? `?${search}` : '',
      }}
      className={classNames({
        'has-text-danger': person.sex === 'f',
      })}
    >
      {person.name}
    </Link>
  );
};
