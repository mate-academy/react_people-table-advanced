import { Link, useSearchParams } from 'react-router-dom';
import { Person } from '../../types';
import cn from 'classnames';

type PersonLinkProps = {
  person: Person;
};

export const PersonLink: React.FC<PersonLinkProps> = ({ person }) => {
  const [searchParams] = useSearchParams();
  const { sex, name, slug } = person;

  return (
    <Link
      to={{ pathname: `/people/${slug}`, search: searchParams.toString() }}
      className={cn({ 'has-text-danger': sex === 'f' })}
    >
      {name}
    </Link>
  );
};
