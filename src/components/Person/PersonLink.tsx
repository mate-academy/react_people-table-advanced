import cn from 'classnames';
import { NavLink, useLocation } from 'react-router-dom';

import { Person } from '../../types';

type Props = {
  person: Person;
};

const PersonLink: React.FC<Props> = ({ person }) => {
  const location = useLocation();

  return (
    <NavLink
      to={{
        pathname: `/people/${person.slug}`,
        search: location.search,
      }}
      className={cn({ 'has-text-danger': person.sex === 'f' })}
    >
      {person.name}
    </NavLink>
  );
};

export default PersonLink;
