import { useSearchParams } from 'react-router-dom';
import classNames from 'classnames';
import { getSearchWith } from '../../../utils/searchHelper';
import React, { useCallback } from 'react';

interface Props {
  setQuery: React.Dispatch<React.SetStateAction<string>>;
}

export const ResetFilters: React.FC<Props> = ({ setQuery }) => {
  const [searchParams, setSearchParams] = useSearchParams();

  const isFiltersExist =
    searchParams.has('sex') ||
    searchParams.has('centuries') ||
    searchParams.has('query');

  const handleReset = useCallback(() => {
    setSearchParams(
      getSearchWith(searchParams, {
        sex: null,
        centuries: null,
        query: null,
      }),
    );
    setQuery('');
  }, [setQuery, setSearchParams, searchParams]);

  return (
    <div className="panel-block">
      <a
        className={classNames('button is-link is-fullwidth', {
          'is-outlined': isFiltersExist,
        })}
        onClick={handleReset}
      >
        Reset all filters
      </a>
    </div>
  );
};
