import { Link } from 'react-router-dom';
import cn from 'classnames';
import { Person } from '../types';
import { getPerson } from '../utils/getPerson';

type Props = {
  person: Person;
  children: React.ReactNode;
  isName?: boolean;
};

export const PersonLink: React.FC<Props> = ({
  person,
  children,
  isName = false,
}) => {
  const currentPerson = getPerson(person, children);

  if (!children) {
    return '-';
  }

  const doesNotParents = !person?.mother || !person.father;

  if (doesNotParents && !isName) {
    return children;
  }

  return (
    <Link
      className={cn({
        'has-text-danger': currentPerson?.sex === 'f',
      })}
      to={`/people/${currentPerson?.slug}`}
    >
      {children}
    </Link>
  );
};
