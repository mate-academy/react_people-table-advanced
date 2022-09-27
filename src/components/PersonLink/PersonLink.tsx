import classNames from 'classnames';
import { Link, useLocation } from 'react-router-dom';

import { Person } from '../../types';

type TProps = {
  person: Person;
};

export const PersonLink: React.FC<TProps> = ({ person }) => {
  const location = useLocation();

  return (
    <Link
      to={`../${person.slug}${location.search}`}
      className={classNames({
        'has-text-danger': person.sex === 'f',
      })}
    >
      {person.name}
    </Link>
  );
};
