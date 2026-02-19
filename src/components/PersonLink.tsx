import classNames from 'classnames';
import { Link } from 'react-router-dom';
import { Person } from '../types/Person';

type Props = {
  person: Person;
  search: string;
};

export const PersonLink: React.FC<Props> = ({ person, search }) => {
  return (
    <Link
      to={{ pathname: `/people/${person.slug}`, search }}
      className={classNames({ 'has-text-danger': person.sex === 'f' })}
    >
      {person.name}
    </Link>
  );
};
