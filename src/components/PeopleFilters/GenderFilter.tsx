import React from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import cn from 'classnames';

import { getSearchWith } from '../../utils/searchHelper';
import FilterParam from '../../types/Filter';
import { Gender } from '../../types';

const GenderFilterBase = () => {
  const [searchParams] = useSearchParams();
  const sexParam = searchParams.get(FilterParam.Sex);

  return (
    <p className="panel-tabs" data-cy="SexFilter">
      <Link
        className={cn({
          'is-active': sexParam === null,
        })}
        to={{
          search: getSearchWith(searchParams, {
            sex: null,
          }),
        }}
      >
        All
      </Link>
      <Link
        className={cn({
          'is-active': sexParam === Gender.Male,
        })}
        to={{
          search: getSearchWith(searchParams, {
            sex: Gender.Male,
          }),
        }}
      >
        Male
      </Link>
      <Link
        className={cn({
          'is-active': sexParam === Gender.Female,
        })}
        to={{
          search: getSearchWith(searchParams, {
            sex: Gender.Female,
          }),
        }}
      >
        Female
      </Link>
    </p>
  );
};

export const GenderFilter = React.memo(GenderFilterBase);
