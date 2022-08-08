import { Link, useLocation } from 'react-router-dom';
import { Person } from './types/Person';

type Props = {
  person: Person,
};

export const PersonLink: React.FC<Props> = ({ person }) => {
  const { search } = useLocation();

  return (
    <Link
      style={{
        color: person.sex === 'm' ? 'rgb(0, 71, 171)' : 'rgb(255, 0, 0)',
      }}
      to={{
        pathname: `/people/${person.slug}`,
        search,
      }}
    >
      {person.name}
    </Link>
  );
};
