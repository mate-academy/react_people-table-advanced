import classNames from 'classnames';
import { getSearchWith } from '../utils/searchHelper';
import { Link, useSearchParams } from 'react-router-dom';
import { CenturiesFilter } from '../types/CenturiesFilter';
import React from 'react';

interface Props {
  century: CenturiesFilter;
}

export const CenturyFilterLink: React.FC<Props> = ({ century }) => {
  const [searchParams] = useSearchParams();
  const centuries = searchParams.getAll('centuries');

  return (
    <Link
      data-cy="century"
      className={classNames('button mr-1', {
        'is-info': centuries.includes(century),
      })}
      to={{
        search: getSearchWith(searchParams, {
          centuries: centuries.includes(century)
            ? centuries.filter(c => c !== century)
            : [...centuries, century],
        }),
      }}
    >
      {century}
    </Link>
  );
};
