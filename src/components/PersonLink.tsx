import { Link, useSearchParams } from 'react-router-dom';
import { Person } from '../types';
import classNames from 'classnames';

type Props = {
  person: Person;
};

export const PersonLink: React.FC<Props> = ({ person }) => {
  const { slug, sex, name } = person;
  const [searchParams] = useSearchParams();

  const searchQuery = searchParams.toString();

  return (
    <Link
      to={{
        pathname: `/people/${slug}`,
        search: searchQuery,
      }}
      className={classNames('person-link', {
        'has-text-danger': sex === 'f',
      })}
    >
      {name}
    </Link>
  );
};
