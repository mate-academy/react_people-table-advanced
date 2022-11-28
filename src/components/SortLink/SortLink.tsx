import React from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import { getSearchWith } from '../../utils/searchHelper';

type Props = {
  gender: string | null,
  children: string,
};

export const SortLink: React.FC<Props> = ({
  children,
  gender,
}) => {
  const [searchParams] = useSearchParams();
  const sex = searchParams.get('sex') || null;

  return (
    <Link
      to={{
        search: getSearchWith(searchParams, { sex: gender }),
      }}
      className={sex === gender ? 'is-active' : ''}
    >
      {children}
    </Link>
  );
};
