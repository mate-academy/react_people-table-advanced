import { Link, useLocation, useResolvedPath } from 'react-router-dom';
import classNames from 'classnames';
import { Person } from 'types';
import React from 'react';

type Props = {
  parentName: string | null;
  peopleFromServer: Person[];
  slug: string;
  fullName: string;
  sex: string;
};

export const RelativeLink: React.FC<Partial<Props>> = React.memo(({
  peopleFromServer,
  parentName,
  slug,
  fullName,
  sex,
}) => {
  const location = useLocation();
  const parentPath = useResolvedPath('../').pathname;
  const parent = React.useMemo(() => {
    if (parentName && peopleFromServer) {
      return peopleFromServer.find(person => person.name === parentName);
    }

    return null;
  }, [peopleFromServer, parentName]);

  const link = slug || parent?.slug;
  const name = fullName || parentName;

  const renderLink = React.useCallback(() => {
    const isSlugIncluded = location.pathname.includes(link || '');
    const linkPath = isSlugIncluded ? '' : `${parentPath}${link}`;

    const linkClassName = classNames({
      'has-text-danger': parent?.sex === 'f' || sex === 'f',
    });

    return (
      <Link
        to={{
          pathname: linkPath,
          search: location.search,
        }}
        className={linkClassName}
      >
        {name}
      </Link>
    );
  }, [location.pathname, location.search, parent, parentPath]);

  if (fullName) {
    return (
      <td>
        {renderLink()}
      </td>
    );
  }

  return (
    <td>
      {parent ? renderLink() : parentName || '-'}
    </td>
  );
});
