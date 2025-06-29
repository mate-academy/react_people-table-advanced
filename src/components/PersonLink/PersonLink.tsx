import { Link } from 'react-router-dom';
import { Person } from '../../types';
import cn from 'classnames';

interface PersonLinkProps {
  name: string | null;
  people: Person[];
}
export const PersonLink = ({ name, people }: PersonLinkProps) => {
  if (!name) {
    return <>-</>;
  }

  const foundPerson = people.find(person => person.name === name);

  if (!foundPerson) {
    return <>{name}</>;
  }

  return (
    <Link
      to={`/people/${foundPerson.slug}`}
      className={cn({ 'has-text-danger': foundPerson.sex === 'f' })}
    >
      {name}
    </Link>
  );
};
