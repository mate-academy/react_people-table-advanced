import { NavLink } from 'react-router-dom';

import { Person } from '../types';

type Props = {
  person: Person;
};

export const PersonLink: React.FC<Props> = ({ person }: Props) => {
  const { sex, slug, name } = person;

  return (
    <NavLink
      className={sex === 'f' ? 'has-text-danger' : ''}
      to={`/people/${slug}`}
    >
      {name}
    </NavLink>
  );
};
