import React from 'react';
import classNames from 'classnames';
import { Link } from 'react-router-dom';
import { getSearchWith } from '../utils/searchHelper';

enum Gender {
  All = '',
  Male = 'm',
  Female = 'f',
}

type Props = {
  gender: string;
  searchParams: URLSearchParams;
};

export const GenderFilter: React.FC<Props> = ({ gender, searchParams }) => {
  const getLocationString = (
    url: string,
    params: { [key: string]: string | null },
    search: string | URLSearchParams,
  ): string => {
    const searchLine = getSearchWith(new URLSearchParams(search || ''), params);

    if (searchLine) {
      return url + '?' + searchLine;
    } else {
      return url;
    }
  };

  return (
    <p className="panel-tabs" data-cy="SexFilter">
      {Object.keys(Gender).map(key => (
        <Link
          key={key}
          className={classNames({
            'is-active': gender === Gender[key as keyof typeof Gender],
          })}
          to={getLocationString(
            '/people',
            { sex: Gender[key as keyof typeof Gender] },
            searchParams,
          )}
        >
          {key === 'All' ? 'All' : key}
        </Link>
      ))}
    </p>
  );
};
