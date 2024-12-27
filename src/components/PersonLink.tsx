import { Link, useLocation } from 'react-router-dom';
import { Person } from '../types';
import cn from 'classnames';

interface Props {
  person: Person;
}

export const PersonLink: React.FC<Props> = ({ person }) => {
  const { slug, sex, name } = person;
  const { search } = useLocation();

  return (
    <Link
      to={{
        pathname: `${slug}`,
        search,
      }}
      className={cn({ 'has-text-danger': sex === 'f' })}
    >
      {name}
    </Link>
  );
};
