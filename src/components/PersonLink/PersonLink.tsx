import { Link } from 'react-router-dom';
import classNames from 'classnames';
import { Person } from '../../types';

interface Props {
  person: Person | undefined
}

export const PersonLink: React.FC<Props> = ({ person }) => {
  return (
    <Link
      to={`../${person?.slug}`}
      className={classNames({ 'has-text-danger': person?.sex === 'f' })}
    >
      {person?.name}
    </Link>

  );
};
