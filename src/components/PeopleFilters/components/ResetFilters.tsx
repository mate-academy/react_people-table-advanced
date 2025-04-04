import { useSearchParams } from 'react-router-dom';
import classNames from 'classnames';
import { getSearchWith } from '../../../utils/searchHelper';

export const ResetFilters = () => {
  const [searchParams, setSearchParams] = useSearchParams();

  const isFiltersExist =
    searchParams.has('sex') ||
    searchParams.has('centuries') ||
    searchParams.has('query');

  return (
    <div className="panel-block">
      <a
        className={classNames('button is-link is-fullwidth', {
          'is-outlined': isFiltersExist,
        })}
        onClick={() =>
          setSearchParams(
            getSearchWith(searchParams, {
              sex: null,
              centuries: null,
              query: null,
            }),
          )
        }
      >
        Reset all filters
      </a>
    </div>
  );
};
