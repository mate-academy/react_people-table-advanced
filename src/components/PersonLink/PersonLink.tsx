import classNames from 'classnames';
import { Link, useLocation } from 'react-router-dom';
import { Person } from '../../types';

type Props = {
  person: Person,
};

export const PersonLink: React.FC<Props> = ({ person }) => {
  const { slug, sex, name } = person;
  const location = useLocation();

  return (
    <Link
      to={`../${slug + location.search}`}
      className={classNames({ 'has-text-danger': sex === 'f' })}
    >
      {name}
    </Link>
  );
};
