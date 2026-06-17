import { Link } from 'react-router-dom';
import cn from 'classnames';
import { Person } from '../types';

type Props = {
  name: string | null;
  people: Person[];
};

export const PersonLink: React.FC<Props> = ({ name, people }) => {
  if (!name) {
    return '-';
  }

  const foundPerson = people.find(person => person.name === name);

  if (foundPerson) {
    return (
      <Link
        className={cn(foundPerson.sex === 'f' && 'has-text-danger')}
        to={`/people/${foundPerson.slug}`}
      >
        {foundPerson.name}
      </Link>
    );
  } else {
    return name;
  }
};
