import React from 'react';
import {
  Link, useLocation,
} from 'react-router-dom';
import { Child } from '../../types/human';

type Props = {
  name: Child['name'] | Child['fatherName'] | Child['motherName'];
  slug: Child['slug'];
};
// const searchParams = new URLSearchParams(search);

export const PersonName: React.FC<Props> = ({ name, slug }) => {
  const { search } = useLocation();

  return (
    <Link
      to={{
        pathname: `/people/${slug}`,
        search,
      }}
      style={{ color: 'inherit' }}
    >
      {name}
    </Link>
  );
};
