import { Link } from 'react-router-dom';
import { Person } from '../../types/Person';

type Props = {
  name?: string | null;
  peopleList: Person[];
};

export const PersonLink = ({ name, peopleList }: Props) => {
  if (!name) {
    return <>-</>;
  }

  const person = peopleList.find(p => p.name === name);

  if (!person) {
    return <>{name}</>;
  }

  const isFemale = person.sex === 'f';
  const className = isFemale ? 'has-text-danger' : undefined;

  return (
    <Link to={`/people/${person.slug}`} className={className}>
      {person.name}
    </Link>
  );
};
