import { Link, useSearchParams } from 'react-router-dom';
import cn from 'classnames';
import { Person } from '../types';
import { Gender } from '../types/Gender';

type PersonLinkProps = {
  person: Person;
};

export const PersonLink: React.FC<PersonLinkProps> = ({ person }) => {
  const { sex, name, slug } = person;
  const [searchParams] = useSearchParams();

  return (
    <Link
      to={{
        pathname: `/people/${slug}`,
        search: searchParams.toString(),
      }}
      className={cn({ 'has-text-danger': sex === Gender.Female })}
    >
      {name}
    </Link>
  );
};
