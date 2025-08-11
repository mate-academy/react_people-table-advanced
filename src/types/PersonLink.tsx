import { Link, useSearchParams } from 'react-router-dom';
import classNames from 'classnames';
import { Person } from './Person';

type Props = {
  person: Person;
};

export const PersonLink: React.FC<Props> = ({ person }) => {
  const [searchParams] = useSearchParams();

  return (
    <Link
      to={{ pathname: person.slug, search: searchParams.toString() }}
      className={classNames({ 'has-text-danger': person.sex === 'f' })}
    >
      {person.name}
    </Link>
  );
};
