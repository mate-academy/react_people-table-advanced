import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Person } from '../../types';
import cn from 'classnames';

interface Props {
  personName: string | null;
  allPeople: Person[];
}

export const PersonLink: React.FC<Props> = ({ personName, allPeople }) => {
  const { search } = useLocation();
  const personData = allPeople.find(humon => humon.name === personName);

  if (!personData || !personName) {
    return <span>{personName || '-'}</span>;
  }

  const isFemale = personData.sex === 'f';
  const personPath = `/people/${personData.slug}${search}`;

  return (
    <Link className={cn({ 'has-text-danger': isFemale })} to={personPath}>
      {personName}
    </Link>
  );
};
