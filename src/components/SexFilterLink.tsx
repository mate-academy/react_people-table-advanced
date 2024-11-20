import React from 'react';
import classNames from 'classnames';
import { getSearchWith } from '../utils/searchHelper';
import { Link, useSearchParams } from 'react-router-dom';
import { SexFilter } from '../types/SexFilter';

interface Props {
  field: keyof typeof SexFilter;
  value: SexFilter;
}

export const SexFilterLink: React.FC<Props> = ({ field, value }) => {
  const [searchParams] = useSearchParams();
  const sex = searchParams.get('sex');

  return (
    <Link
      className={classNames({
        'is-active': sex === value || (!sex && value === 'all'),
      })}
      to={{
        search: getSearchWith(searchParams, {
          sex: value !== 'all' ? value : null,
        }),
      }}
    >
      {field}
    </Link>
  );
};
