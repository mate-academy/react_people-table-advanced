import classNames from 'classnames';
import { Link, useLocation } from 'react-router-dom';
import { Person } from '../../types';

type Props = {
  person: Person;
};

export const PersonLink: React.FC<Props> = ({ person }) => {
  const { sex, name, slug } = person;
  const location = useLocation();

  return (
    <Link
      to={{
        pathname: `/people/${slug}`,
        search: location.search,
      }}
      className={classNames(
        { 'has-text-danger': sex === 'f' },
      )}
    >
      {name}
    </Link>
  );
};
