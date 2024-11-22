import React from 'react';
import { Link, useLocation } from 'react-router-dom';

interface PersonLinkProps {
  name: string;
  sex: string;
  slug: string;
}

export const PersonLink: React.FC<PersonLinkProps> = ({ name, sex, slug }) => {
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);

  const currentCentury = searchParams.getAll('centuries');
  const currentSort = searchParams.get('sort');
  const currentOrder = searchParams.get('order');

  const newSearchParams = new URLSearchParams();

  if (currentCentury) {
    currentCentury.forEach(century => {
      newSearchParams.append('centuries', century);
    });
  }

  if (currentSort) {
    newSearchParams.set('sort', currentSort);
  }

  if (currentOrder) {
    newSearchParams.set('order', currentOrder);
  }

  const linkTo = `/people/${slug}${newSearchParams.toString() ? `?${newSearchParams.toString()}` : ''}`;

  return (
    <Link to={linkTo} className={sex === 'f' ? 'has-text-danger' : ''}>
      {name}
    </Link>
  );
};
