import { Link } from 'react-router-dom';
import { Person } from '../../types/Person';

type Props = {
  person: Person
};

export const PersonLink: React.FC<Props> = ({ person }) => {
  return (
    <Link
      to={`/people/${person.slug}`}
      style={person.sex === 'm'
        ? ({ color: 'rgb(0, 71, 171)' })
        : ({ color: 'rgb(255, 0, 0)' })}
    >
      {person.name}
    </Link>
  );
};
