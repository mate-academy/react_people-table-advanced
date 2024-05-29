import { FC } from 'react';
import { Link } from 'react-router-dom';
import { Person } from '../types';

interface Props {
  name: string;
  person?: Person;
}

const PersonName: FC<Props> = ({ name, person }) => {
  if (!person) {
    return <>{name}</>;
  }

  return (
    <Link
      className={person.sex === 'f' ? 'has-text-danger' : ''}
      to={`${person.slug}`}
    >
      {name}
    </Link>
  );
};

export default PersonName;
