import { Link, useSearchParams } from 'react-router-dom';
import cn from 'classnames';
import { Person } from '../types';

type Props = {
  person: Person;
};

const PersonLink: React.FC<Props> = ({ person }) => {
  const [searchParams] = useSearchParams();
  const isFemale = person.sex === 'f';

  return (
    <Link
      to={{
        pathname: `/people/${person.slug}`,
        search: searchParams.toString(),
      }}
      className={cn({ 'has-text-danger': isFemale })}
    >
      {person.name}
    </Link>
  );
};

export default PersonLink;
