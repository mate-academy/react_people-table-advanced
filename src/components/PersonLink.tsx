import classnames from 'classnames';
import { FC } from 'react';
import { Link, useLocation, useResolvedPath } from 'react-router-dom';

interface Props {
  sex: string;
  slug: string;
  name: string;
}

export const PersonLink: FC<Props> = ({
  sex,
  slug,
  name,
}) => {
  const location = useLocation();
  const parentPath = useResolvedPath('../').pathname;

  const isWoman = sex === 'f';

  return (
    <Link
      className={classnames({ 'has-text-danger': isWoman })}
      to={{
        pathname: parentPath + slug,
        search: location.search,
      }}
    >
      {name}
    </Link>
  );
};
