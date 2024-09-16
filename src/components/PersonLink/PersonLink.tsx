import classNames from 'classnames';
import { Link, useLocation } from 'react-router-dom';
import { Person } from '../../types';

type Props = {
  person: Person | undefined;
};

export const PersonLink: React.FC<Props> = ({ person }) => {
  const { search } = useLocation();

  return (
    <Link
      to={`/people/${person?.slug}${search}`}
      className={classNames({
        'has-text-danger': person?.sex === 'f',
      })}
    >
      {person?.name}
    </Link>
  );
};
