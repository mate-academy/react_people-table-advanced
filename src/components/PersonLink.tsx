import { Link } from 'react-router-dom';
import cn from 'classnames';
import { Person } from '../types';
import { getPerson } from '../utils/getPerson';

type Props = {
  person: Person;
  children: React.ReactNode;
};

export const PersonLink: React.FC<Props> = ({ person, children }) => {
  const currentPerson = getPerson(person, children);

  if (!children) {
    return '-';
  }

  return (
    <Link
      className={cn({
        'has-text-danger': person.sex === 'f',
      })}
      to={`/people/${currentPerson?.slug}`}
    >
      {children}
    </Link>
  );
};
