import classNames from 'classnames';
import { FC } from 'react';
import { Link, useLocation, useResolvedPath } from 'react-router-dom';

type Props = {
  slug: string,
  text: string,
  sex: 'f' | 'm',
  isSelected: boolean,
};

export const PersonLink: FC<Props> = ({
  slug,
  text,
  sex,
  isSelected,
}) => {
  const location = useLocation();
  const parentPath = useResolvedPath('../').pathname;

  return (
    <Link
      to={{
        pathname: isSelected ? parentPath : parentPath + slug,
        search: location.search,
      }}
      className={classNames(
        {
          'has-text-danger': sex === 'f',
        },
      )}
    >
      {text}
    </Link>
  );
};
