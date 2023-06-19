import { NavLink } from 'react-router-dom';
import classNames from 'classnames';
import { Person } from '../../types';

type Props = {
  person: Person,
};
export const PersonLink: React.FC<Props> = ({ person }) => (
  <NavLink
    className={classNames({
      'has-text-danger': person.sex === 'f',
    })}
    to={`/people/${person.slug}`}
  >
    {person.name}
  </NavLink>
);
