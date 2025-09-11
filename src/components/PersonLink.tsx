import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import classNames from 'classnames';
import { Person } from '../types';

interface Props {
  personName: string | null;
  peoples: Person[];
}

export const PersonLink: React.FC<Props> = ({ personName, peoples }) => {
  const personData = peoples.find(p => p.name === personName);
  const { search } = useLocation();

  if (!personData || !personName) {
    return <span>{personName || '-'}</span>;
  }

  return (
    <Link
      className={classNames({ 'has-text-danger': personData.sex === 'f' })}
      to={`/people/${personData.slug}${search}`}
      data-cy="personLink"
    >
      {personName}
    </Link>
  );
};
