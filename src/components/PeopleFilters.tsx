import classNames from 'classnames';
import { SearchLink } from './SearchLink';
import { useSearchParams } from 'react-router-dom';
import { useCallback, useMemo } from 'react';

export const PeopleFilters = () => {
  const [searchParams, setSearchParams] = useSearchParams();

  const sexSearchParams = useMemo(
    () => searchParams.get('sex'),
    [searchParams],
  );
  const centuries = useMemo(
    () => searchParams.getAll('centuries'),
    [searchParams],
  );

  const centuriesSearchParams = useCallback(
    (centuryItem: string) => {
      const values = centuries.includes(centuryItem)
        ? centuries.filter(item => item !== centuryItem)
        : [...centuries, centuryItem];

      return {
        centuries: values,
      };
    },
    [centuries],
  );

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;

    if (value) {
      searchParams.set('search', value);
    } else {
      searchParams.delete('search');
    }

    setSearchParams(searchParams);
  };

  return (
    <nav className="panel">
      <p className="panel-heading">Filters</p>

      <p className="panel-tabs" data-cy="SexFilter">
        <SearchLink
          className={classNames({ 'is-active': !sexSearchParams })}
          params={{ sex: null }}
        >
          All
        </SearchLink>
        <SearchLink
          className={classNames({ 'is-active': sexSearchParams === 'm' })}
          params={{ sex: 'm' }}
        >
          Male
        </SearchLink>
        <SearchLink
          className={classNames({ 'is-active': sexSearchParams === 'f' })}
          params={{ sex: 'f' }}
        >
          Female
        </SearchLink>
      </p>

      <div className="panel-block">
        <p className="control has-icons-left">
          <input
            data-cy="NameFilter"
            type="search"
            className="input"
            placeholder="Search"
            onChange={handleSearch}
          />

          <span className="icon is-left">
            <i className="fas fa-search" aria-hidden="true" />
          </span>
        </p>
      </div>

      <div className="panel-block">
        <div className="level is-flex-grow-1 is-mobile" data-cy="CenturyFilter">
          <div className="level-left">
            {['16', '17', '18', '19', '20'].map(c => (
              <SearchLink
                key={c}
                data-cy="century"
                className={classNames('button mr-1', {
                  'is-info': centuries.includes(c),
                })}
                params={centuriesSearchParams(c)}
              >
                {c}
              </SearchLink>
            ))}
          </div>

          <div className="level-right ml-4">
            <SearchLink
              data-cy="centuryALL"
              className={classNames('button is-success', {
                'is-outlined': centuries.length,
              })}
              params={{ centuries: null }}
            >
              All
            </SearchLink>
          </div>
        </div>
      </div>

      <div className="panel-block">
        <a className="button is-link is-outlined is-fullwidth" href="#/people">
          Reset all filters
        </a>
      </div>
    </nav>
  );
};
