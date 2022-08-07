import classNames from 'classnames';
import React from 'react';
import { useSearchParams } from 'react-router-dom';
import { SearchLink } from '../Links/SearchLink';

type Props = {
  avalableCenturies: Array<string>
};

export const CenturyFilter: React.FC<Props> = ({ avalableCenturies }) => {
  const [searchParams] = useSearchParams();
  const centuries = searchParams.getAll('centuries');

  return (
    <>
      {avalableCenturies.map(century => (
        <SearchLink
          key={century}
          className={classNames('button', 'mr-1', {
            'is-info': centuries.includes(century),
          })}
          params={{
            centuries: centuries.includes(century)
              ? centuries.filter(c => c !== century)
              : [...centuries, century],
          }}
        >
          {century}
        </SearchLink>
      ))}
      <SearchLink
        className={classNames('button is-info is-fullwidth', {
          'is-outlined': centuries.length > 0,
        })}
        params={{ centuries: null }}
      >
        All
      </SearchLink>
    </>
  );
};
