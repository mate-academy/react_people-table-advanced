import classNames from 'classnames';
import { Link, useLocation } from 'react-router-dom';
import { Person } from '../types';

export type Props = {
  person: Person | undefined;
};

export const PersonLink: React.FC<Props> = ({ person }) => {
  const location = useLocation();

  return (
    <Link
      to={{
        pathname: `/people/${person?.slug}`,
        search: location.search,
      }}
      className={classNames({ 'has-text-danger': person?.sex === 'f' })}
    >
      {person?.name}
    </Link>
  );
};
