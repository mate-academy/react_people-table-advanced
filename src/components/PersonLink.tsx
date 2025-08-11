import cN from 'classnames';
import { Link, useLocation } from 'react-router-dom';
import { Person } from '../types';

interface Props {
  person: Person;
}

export const PersonLink: React.FC<Props> = ({ person }) => {
  const { name, sex, slug } = person;
  const currentSearch = useLocation().search;

  return (
    <Link
      className={cN({ 'has-text-danger': sex === 'f' })}
      to={{ pathname: `/people/${slug}`, search: currentSearch }}
    >
      {name}
    </Link>
  );
};
