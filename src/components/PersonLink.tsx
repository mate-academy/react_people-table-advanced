import { Link, useSearchParams } from 'react-router-dom';
import { Person } from '../types';
import classNames from 'classnames';

type Props = {
  person: Person;
};

export const PersonLink: React.FC<Props> = ({ person }) => {
  const { slug, sex, name } = person;
  const [searchParams] = useSearchParams();

  const linkClass = classNames({
    'has-text-danger': sex === 'f',
  });

  return (
    <Link
      to={{
        pathname: `/${slug}`,
        search: searchParams.toString(),
      }}
      className={linkClass}
    >
      {name}
    </Link>
  );
};
