import { Link } from 'react-router-dom';
import classNames from 'classnames';
import { Person } from '../types/Person';

export const PersonLink: React.FC<{ person: Person }> = ({ person }) => {
  const { name, sex, slug } = person;

  return (
    <Link
      className={classNames({ 'has-text-danger': sex === 'f' })}
      to={`../${slug}`}
    >
      {name}
    </Link>
  );
};
