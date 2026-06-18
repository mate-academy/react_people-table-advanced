import { Link, useLocation } from 'react-router-dom';
import cn from 'classnames';
import { Person } from '../types';

type Props = {
  name: string | null;
  people: Person[];
};

export const PersonLink: React.FC<Props> = ({ name, people }) => {
  const { search } = useLocation();

  if (!name) {
    return '-';
  }

  const foundPerson = people.find(person => person.name === name);

  if (foundPerson) {
    return (
      <Link
        className={cn(foundPerson.sex === 'f' && 'has-text-danger')}
        // to={`/people/${foundPerson.slug}`}
        to={{ pathname: `/people/${foundPerson.slug}`, search: search }}
      >
        {foundPerson.name}
      </Link>
    );
  } else {
    return name;
  }
};
