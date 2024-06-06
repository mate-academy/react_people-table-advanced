import classNames from 'classnames';
import { SearchLink } from './SearchLink';
import { useSearchParams } from 'react-router-dom';
import { getSearchWith } from '../utils/searchHelper';
import { allCenturies, Sex } from '../types/Constants';

export const PeopleFilters = () => {
  const [searchParams, setSearchParams] = useSearchParams();

  const sex = searchParams.get('sex');
  const query = searchParams.get('query') || '';
  const centuries = searchParams.getAll('centuries') || [];

  const handleQueryChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newSearch = getSearchWith(searchParams, {
      query: e.target.value.trim() || null,
    });

    setSearchParams(newSearch);
  };

  const handleCentriesChange = (century: string) => {
    const newCenturies = centuries.includes(century)
      ? centuries.filter(currentCentury => currentCentury !== century)
      : [...centuries, century];

    return newCenturies;
  };

  return (
    <nav className="panel">
      <p className="panel-heading">Filters</p>

      <p className="panel-tabs" data-cy="SexFilter">
        <SearchLink
          params={{ sex: null }}
          className={classNames({ 'is-active': sex === null })}
        >
          All
        </SearchLink>
        <SearchLink
          params={{ sex: Sex.man }}
          className={classNames({ 'is-active': sex === Sex.man })}
        >
          Male
        </SearchLink>
        <SearchLink
          params={{ sex: Sex.woman }}
          className={classNames({ 'is-active': sex === Sex.woman })}
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
            {allCenturies.map(century => (
              <SearchLink
                key={century}
                data-cy="century"
                params={{ centuries: handleCentriesChange(century) }}
                className={`button mr-1 ${centuries.includes(century) ? 'is-info' : ''}`}
              >
                {century}
              </SearchLink>
            ))}
          </div>

          <div className="level-right ml-4">
            <SearchLink
              data-cy="centuryALL"
              className={classNames('button mr-1 is-success', {
                'is-outlined': centuries.length,
              })}
              params={{ centuries: [] }}
            >
              All
            </SearchLink>
          </div>
        </div>
      </div>

      <div className="panel-block">
        <SearchLink
          className={classNames('button is-link is-outlined is-fullwidth')}
          params={{ sex: null, query: '', centuries: [] }}
        >
          Reset all filters
        </SearchLink>
      </div>
    </nav>
  );
};
