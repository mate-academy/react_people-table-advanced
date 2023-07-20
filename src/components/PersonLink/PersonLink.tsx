import { NavLink, useLocation } from 'react-router-dom';
import classNames from 'classnames';
import { Person } from '../../types';

type Props = {
  person: Person,
};
export const PersonLink: React.FC<Props> = ({ person }) => {
  const location = useLocation();

  return (
    <NavLink
      className={classNames({
        'has-text-danger': person.sex === 'f',
      })}
      to={{
        pathname: `/people/${person.slug}`,
        search: location.search,
      }}
    >
      {person.name}
    </NavLink>
  );
};
