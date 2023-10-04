import cn from 'classnames';
import { Link } from 'react-router-dom';
import { Person } from '../types';
import { SEX_FEMALE } from '../utils/constants';

type Props = {
  person: Person
};

export const PersonLink: React.FC<Props> = ({ person }) => (
  <Link
    to={person.slug}
    className={cn({
      [person.sex === SEX_FEMALE ? 'has-text-danger' : 'has-text-link']: true,
    })}
  >
    {person.name}
  </Link>
);
