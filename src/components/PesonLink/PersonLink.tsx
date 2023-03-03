import React from 'react';
import classNames from 'classnames';
import { Link, useLocation, useResolvedPath } from 'react-router-dom';
import { Person } from '../../types';

type Props = {
  person: Person,
};

export const PersonLink = React.memo<Props>(({ person }) => {
  const { slug, name, sex } = person;
  const location = useLocation();
  const rootPath = useResolvedPath('/people/').pathname;

  return (
    <Link
      to={{
        pathname: rootPath + slug,
        search: location.search,
      }}
      className={(
        classNames({ 'has-text-danger': sex === 'f' })
      )}
    >
      {name}
    </Link>
  );
});
