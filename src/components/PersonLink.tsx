import {
  Link,
  useLocation,
  useParams,
  useResolvedPath,
} from 'react-router-dom';
import classNames from 'classnames';

type Props = {
  to: string;
  name: string;
  sex: string
};

export const PersonLink: React.FC<Props> = ({ to, name, sex }) => {
  const location = useLocation();
  const parentPath = useResolvedPath('../').pathname;
  const { slug } = useParams();

  return (
    <Link
      to={{
        pathname: slug === to ? parentPath : parentPath + to,
        search: location.search,
      }}
      className={classNames({ 'has-text-danger': sex === 'f' })}
    >
      {name}
    </Link>
  );
};
