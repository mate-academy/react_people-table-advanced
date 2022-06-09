import React from 'react';
import { Link, useLocation } from 'react-router-dom';

type Props = {
  name: string;
  slug: string;
  sex: string;
};

export const PersonName: React.FC<Props> = ({ name, slug, sex }) => {
  const { search } = useLocation();

  return (
    <Link
      to={{
        pathname: `/people/${slug}`,
        search,
      }}
      style={{ color: sex === 'f' ? '#ee3966' : '#3099a7' }}
    >
      {name}
    </Link>
  );
};
