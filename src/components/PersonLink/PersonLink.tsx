import { Link, useLocation } from 'react-router-dom';
import classnames from 'classnames';
import { Person } from '../../types';

type Props = {
  person: Person;
};

export const PersonLink: React.FC<Props> = ({ person }) => {
  const { name, slug, sex } = person;
  const { search } = useLocation();

  return (
    <Link
      className={classnames({
        'has-text-danger': sex === 'f',
      })}
      to={{
        pathname: `/people/${slug}`,
        search,
      }}
    >
      {name}
    </Link>
  );
};
