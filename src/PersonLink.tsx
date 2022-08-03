import { Link } from 'react-router-dom';
import { Person } from './react-app-env';

type Props = {
  person: Person,
};

export const PersonLink: React.FC<Props> = ({ person }) => {
  return (
    <Link
      style={{
        color: person.sex === 'm' ? 'rgb(0, 71, 171)' : 'rgb(255, 0, 0)',
      }}
      to={`/people/${person.slug}`}
      onClick={() => onSelectName(person.name)}
    >
      {person.name}
    </Link>
  );
};
