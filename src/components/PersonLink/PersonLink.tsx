import { Link, useLocation } from 'react-router-dom';
import classNames from 'classnames';

type Props = {
  to: string;
  name: string | null;
  sex?: string;
};

export const PersonLink: React.FC<Props> = ({ to, name, sex }) => {
  const location = useLocation();

  return (
    <Link
      to={{
        pathname: `/people/${to}`,
        search: location.search,
      }}
      className={classNames({
        'has-text-danger': (sex === 'f'),
      })}
    >
      {name}
    </Link>
  );
};
