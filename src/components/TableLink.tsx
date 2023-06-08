import classNames from 'classnames';
import { Link, useLocation, useResolvedPath } from 'react-router-dom';

type Props = {
  slug: string,
  name: string,
  sex: string,
};

export const TableLink: React.FC<Props> = ({ slug, name, sex }) => {
  const parentPath = useResolvedPath('../').pathname;
  const location = useLocation();

  return (
    <Link
      to={{
        pathname: parentPath + slug,
        search: location.search,
      }}
      className={classNames({ 'has-text-danger': sex === 'f' })}
    >
      {name}
    </Link>
  );
};
