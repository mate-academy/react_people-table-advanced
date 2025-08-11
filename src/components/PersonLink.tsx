import { Link } from 'react-router-dom';
import { Person } from '.././types/Person';
import classNames from 'classnames';

type Props = {
  person: Person;
};

export const PersonLink: React.FC<Props> = ({ person }) => {
  const FEMALE = 'f';
  const isFemale = person.sex === FEMALE;

  return (
    <Link
      to={`/people/${person.slug}`}
      className={classNames({ 'has-text-danger': isFemale })}
    >
      {person.name}
    </Link>
  );
};
