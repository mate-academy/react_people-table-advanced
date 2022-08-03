import React from 'react';
import {
  Link, useLocation,
} from 'react-router-dom';
import { Child } from '../../types/human';

type Props = {
  name: Child['name'] | Child['fatherName'] | Child['motherName'];
  personSlug: Child['slug'];
};

export const PersonName: React.FC<Props> = ({ name, personSlug }) => {
  const { search } = useLocation();

  return (
    <Link
      to={{
        pathname: `/people/${personSlug}`,
        search,
      }}
      style={{ color: 'inherit' }}
    >
      {name}
    </Link>
  );
};
