import { Link, useSearchParams } from 'react-router-dom';
import { Person } from '../types/Person/Person';
import classNames from 'classnames';
type Props = {
  person: Person;
};

export const PersonLink: React.FC<Props> = ({ person }) => {
  const [searchParams] = useSearchParams();

  return (
    <Link
      className={classNames({ 'has-text-danger': person.sex === 'f' })}
      to={{
        pathname: `/people/${person.slug}`,
        search: searchParams.toString(),
      }}
    >
      {person.name}
    </Link>
  );
};
