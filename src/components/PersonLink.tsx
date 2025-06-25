import cn from 'classnames';
import { Link } from 'react-router-dom';
import { Person } from '../types';

type Props = {
  name: string | null;
  people: Person[];
};

export const PersonLink = ({ name, people }: Props) => {
  if (!name) {
    return '-';
  }

  const foundPerson = people.find(person => person.name === name);

  if (!foundPerson) {
    return name;
  }

  return (
    <Link
      className={cn({ 'has-text-danger': foundPerson.sex === 'f' })}
      to={`/people/${foundPerson.slug}`}
    >
      {name}
    </Link>
  );
};
