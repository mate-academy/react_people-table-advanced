import { Link, useLocation } from 'react-router-dom';
import { Person } from '../../types';
import cn from 'classnames';

type Props = {
  person: Person;
};
export const PersonLink: React.FC<Props> = ({ person }) => {
  const { name, sex, slug } = person;
  const location = useLocation();

  return (
    <Link
      to={{
        pathname: `/people/${slug}`,
        search: location.search,
      }}
      className={cn({ 'has-text-danger': sex === 'f' })}
    >
      {name}
    </Link>
  );
};
