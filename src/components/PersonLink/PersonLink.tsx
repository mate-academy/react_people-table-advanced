import { Link, useSearchParams } from 'react-router-dom';
import classNames from 'classnames';
import { Person } from '../../types';

type Props = {
  person: Person;
  people: Person[];
};

export const PersonLink: React.FC<Props> = ({ person, people }) => {
  const [searchParams] = useSearchParams();
  const isWoman = person.sex === 'f';
  const exists = people.some(p => p.name === person.name);

  if (!exists) {
    return <span>{person.name}</span>;
  }

  return (
    <Link
      to={`/people/${person.slug}?${searchParams.toString()}`}
      className={classNames({ 'has-text-danger': isWoman })}
    >
      {person.name}
    </Link>
  );
};
