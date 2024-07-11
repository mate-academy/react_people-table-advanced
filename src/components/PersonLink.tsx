import classNames from 'classnames';
import { Link } from 'react-router-dom';
import { Person } from '../types';

type Props = {
  person: Person | undefined;
};

export const PersonLink: React.FC<Props> = ({ person }) => (
  <Link
    to={`/people/${person?.slug}`}
    className={classNames('', {
      'has-text-danger': person?.sex === 'f',
    })}
  >
    {person?.name}
  </Link>
);
