import { Link } from 'react-router-dom';
import { GENDER_FEMALE } from '../utils/vars';
import { Person } from '../types';

type Props = {
  person: Person,
};

export const PersonLink: React.FC<Props> = ({ person }) => {
  return (
    <Link
      to={`${person.slug}`}
      replace
      className={person.sex === GENDER_FEMALE ? 'has-text-danger' : ''}
    >
      {person.name}
    </Link>
  );
};
