import cn from 'classnames';
import { NavLink, useLocation } from 'react-router-dom';

import { Person } from '../../types';

type Props = {
  person: Person;
};

const PersonLink: React.FC<Props> = ({ person: { slug, sex, name } }) => {
  const location = useLocation();

  return (
    <NavLink
      to={{
        pathname: `/people/${slug}`,
        search: location.search,
      }}
      className={cn({ 'has-text-danger': sex === 'f' })}
    >
      {name}
    </NavLink>
  );
};

export default PersonLink;
