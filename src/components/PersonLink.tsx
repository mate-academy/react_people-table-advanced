// src/components/PersonLink.tsx (inferred/updated to use Link with search preservation)

import classNames from 'classnames';
import { Link, useLocation } from 'react-router-dom';
import { Person } from '../types';

type Props = {
  parent: Person;
};

export const PersonLink: React.FC<Props> = ({ parent }) => {
  const { search } = useLocation();

  return (
    <Link
      to={`/people/${parent.slug}${search}`}
      className={classNames({
        'has-text-danger': parent.sex === 'f',
      })}
    >
      {parent.name}
    </Link>
  );
};
