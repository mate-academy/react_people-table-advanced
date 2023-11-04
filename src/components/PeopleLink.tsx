import { NavLink } from 'react-router-dom';
import classNames from 'classnames';
import { Person } from '../types';

type Props = {
  person: Person,
};

export const PeopleLink: React.FC<Props> = ({ person }) => {

  const {
    name,
    slug,
    sex
  } = person;

  return (
    <NavLink
      className={classNames({ 'has-text-danger': sex === 'f' })}
      to={`/people/${slug}`}
    >
      {name}
    </NavLink>
  );
};
