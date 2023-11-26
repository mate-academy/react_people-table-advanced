import { Link, useSearchParams } from 'react-router-dom';
import classNames from 'classnames';
import { SearchLink } from './SearchLink';
import { SearchParams, getSearchWith } from '../utils/searchHelper';

const CENTURIES_ARRAY = ['16', '17', '18', '19', '20'];
const SEXES_ARRAY = [
  { fullSex: 'Male', shortSex: 'm' },
  { fullSex: 'Female', shortSex: 'f' },
];

export const PeopleFilters = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const query = searchParams.get('query') || '';
  const centuries = searchParams.getAll('centuries') || [];
  const sex = searchParams.get('sex') || '';

  const setSearchWith = (params: SearchParams) => {
    const search = getSearchWith(searchParams, params);

    setSearchParams(search);
  };

  const handleQueryChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchWith({ query: event.target.value || null });
  };

  const getCenturiesParams = (century: string, currentCenturies: string[]) => {
    const updatedCenturies = currentCenturies.includes(century)
      ? currentCenturies.filter((currentCentury) => currentCentury !== century)
      : [...currentCenturies, century];

    return { centuries: updatedCenturies };
  };

  const handleClearAll = () => {
    return getSearchWith(new URLSearchParams(), {});
  };

  return (
    <nav className="panel">
      <p className="panel-heading">Filters</p>

      <p className="panel-tabs" data-cy="SexFilter">
        <SearchLink
          params={{ sex: null }}
          className={classNames({ 'is-active': !sex })}
        >
          All
        </SearchLink>

        {SEXES_ARRAY.map(sexType => (
          <SearchLink
            params={{ sex: sexType.shortSex }}
            className={classNames({ 'is-active': sex === sexType.shortSex })}
          >
            {sexType.fullSex}
          </SearchLink>
        ))}
      </p>

      <div className="panel-block">
        <p className="control has-icons-left">
          <input
            data-cy="NameFilter"
            type="search"
            className="input"
            placeholder="Search"
            value={query}
            onChange={handleQueryChange}
          />

          <span className="icon is-left">
            <i className="fas fa-search" aria-hidden="true" />
          </span>
        </p>
      </div>

      <div className="panel-block">
        <div className="level is-flex-grow-1 is-mobile" data-cy="CenturyFilter">
          <div className="level-left">
            {CENTURIES_ARRAY.map(century => (
              <SearchLink
                params={getCenturiesParams(century, centuries)}
                data-cy="century"
                className={classNames('button', 'mr-1', {
                  'is-info': centuries.includes(century),
                })}
              >
                {century}
              </SearchLink>
            ))}
          </div>

          <div className="level-right ml-4">
            <SearchLink
              params={{ centuries: null }}
              data-cy="century"
              className={classNames('button', 'mr-1', {
                'is-info': !centuries.length,
              })}
            >
              All
            </SearchLink>
          </div>
        </div>
      </div>

      <div className="panel-block">
        <Link
          to={{ search: handleClearAll() }}
          className="button is-link is-outlined is-fullwidth"
        >
          Reset all filters
        </Link>
      </div>
    </nav>
  );
};
