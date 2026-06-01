import { Person } from '../types';
import { Link, useLocation } from 'react-router-dom';

type Props = {
  person: Person;
};

const PersonLink: React.FC<Props> = ({ person }) => {
  const location = useLocation();

  return (
    <Link
      to={{
        pathname: `/people/${person.slug}`,
        search: location.search,
      }}
      className={person.sex === 'f' ? 'has-text-danger' : ''}
    >
      {person.name}
    </Link>
  );
};

export default PersonLink;
