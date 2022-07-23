import React from 'react';
import {
  Link, useLocation,
} from 'react-router-dom';
import { Child } from '../../types/human';

type Props = {
  name: Child['name'] | Child['fatherName'] | Child['motherName'];
  slug: Child['slug'];
};

export const PersonName: React.FC<Props> = ({ name, slug }) => {
  const { search } = useLocation();
  const searchParams = new URLSearchParams(search);

  return (
    <Link
      to={`${slug}?${searchParams.toString()}`}
      style={{ color: 'inherit' }}
    >
      {name}
    </Link>
  );
};
