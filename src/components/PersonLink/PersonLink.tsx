import React from 'react';
import { Person, Sex } from '../../types';
import cn from 'classnames';
import { Link, useLocation } from 'react-router-dom';

type Props = {
  person: Person;
};

const sexColorMap: Record<Sex, string> = {
  [Sex.Male]: 'has-text-link',
  [Sex.Female]: 'has-text-danger',
};

const PersonLink: React.FC<Props> = ({ person }) => {
  const location = useLocation();
  const colorClass = sexColorMap[person.sex] || 'has-text-grey';

  const pathname = `/people/${person.slug}`;

  return (
    <Link to={{ pathname, search: location.search }} className={cn(colorClass)}>
      {person.name}
    </Link>
  );
};

export default PersonLink;
