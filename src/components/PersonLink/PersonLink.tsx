import classNames from 'classnames';
import { Link, useLocation, useResolvedPath } from 'react-router-dom';

import { Person } from '../../types';

type TProps = {
  person: Person;
};

export const PersonLink: React.FC<TProps> = ({
  person: {
    slug,
    sex,
    name,
  },
}) => {
  const { search } = useLocation();
  const parentPath = useResolvedPath('../').pathname;

  return (
    <Link
      to={{
        pathname: `${parentPath}${slug}`,
        search,
      }}
      className={classNames({
        'has-text-danger': sex === 'f',
      })}
    >
      {name}
    </Link>
  );
};
