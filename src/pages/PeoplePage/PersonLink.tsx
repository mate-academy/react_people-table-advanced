import classNames from 'classnames';
import { Link } from 'react-router-dom';
import { Person } from '../../types/Person';

export type Props = {
  person: Person;
};

export const PersonLink: React.FC<Props> = ({ person }) => (
  <Link
    to={`../${person.slug}`}
    className={classNames({ 'has-text-danger': person.sex === 'f' })}
    style={person.sex === 'f' ? { color: 'red' } : {}}
  >
    {person.name}
  </Link>
);
