import { Link, useLocation, useResolvedPath } from 'react-router-dom';
import classNames from 'classnames';

type Props = {
  to: string;
  name: string;
  sex: string
};

export const PersonLink: React.FC<Props> = ({ to, name, sex }) => {
  const location = useLocation();
  const parentPath = useResolvedPath('../').pathname;

  return (
    <Link
      to={{
        pathname: parentPath + to,
        search: location.search,
      }}
      className={classNames({ 'has-text-danger': sex === 'f' })}
    >
      {name}
    </Link>
  );
};
