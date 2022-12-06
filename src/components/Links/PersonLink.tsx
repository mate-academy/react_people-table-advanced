import classNames from 'classnames';
import { FC, useContext } from 'react';
import { Link, useLocation, useResolvedPath } from 'react-router-dom';
import { slugContext } from '../slugContext';

type PersonLinkProps = {
  slug: string,
  sex: string,
  name: string | null,
};

export const PersonLink: FC<PersonLinkProps> = ({
  slug, sex, name,
}) => {
  const { setSelectedSlug } = useContext(slugContext);
  const location = useLocation();
  const path = useResolvedPath('../').pathname;

  return (
    <Link
      to={{
        pathname: path + slug,
        search: location.search,
      }}
      className={classNames(
        { 'has-text-danger': sex === 'f' },
      )}
      onClick={() => (setSelectedSlug
        ? (slug)
        : '')}
    >
      {name || '-'}
    </Link>
  );
};
