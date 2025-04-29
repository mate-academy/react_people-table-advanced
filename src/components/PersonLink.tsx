import { Link } from 'react-router-dom';
import { Person } from '../types';
import classNames from 'classnames';

type Props = {
  person?: Person;
  name: string;
};

export const PersonLink: React.FC<Props> = ({ person, name }) => {
  if (!person) {
    return <span>{name}</span>;
  }

  return (
    <Link
      to={`/people/${person.slug}`}
      className={classNames({ 'has-text-danger': person.sex === 'f' })}
    >
      {name}
    </Link>
  );
};
