import classNames from 'classnames';
import { useSearchParams } from 'react-router-dom';
import { CENTURIES, FILTER_BY_SEX } from '../../utils/constants';
import { SearchLink } from '../SearchLink/SearchLink';
import { getSearchWith } from '../../utils/searchHelper';
import { SearchingParams } from '../../types/SearchingParams';

export const PeopleFilters = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const sex = searchParams.get(SearchingParams.Sex) || '';
  const query = searchParams.get(SearchingParams.Query) || '';
  const centuries = searchParams.getAll(SearchingParams.Centuries) || [];

  const handleQueryChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchParams(
      getSearchWith(searchParams, {
        query: event.target.value || null,
      }),
    );
  };

  return (
    <nav className="panel">
      <p className="panel-heading">Filters</p>

      <p className="panel-tabs" data-cy="SexFilter">
        {FILTER_BY_SEX.map(filter => (
          <SearchLink
            className={classNames({ 'is-active': sex === filter.searchParam })}
            params={{ sex: filter.searchParam || null }}
          >
            {filter.content}
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
            {CENTURIES.map(century => {
              const newCenturies = centuries.includes(century)
                ? centuries.filter(cent => cent !== century)
                : [...centuries, century];

              return (
                <SearchLink
                  key={century}
                  data-cy="century"
                  className={classNames('button', 'mr-1', {
                    'is-info': centuries.includes(century),
                  })}
                  params={{ centuries: newCenturies }}
                >
                  {century}
                </SearchLink>
              );
            })}
          </div>

          <div className="level-right ml-4">
            <SearchLink
              data-cy="centuryALL"
              className={classNames(
                'button',
                'is-success',
                { 'is-outlined': centuries.length },
              )}
              params={{ centuries: [] }}
            >
              All
            </SearchLink>
          </div>
        </div>
      </div>

      <div className="panel-block">
        <SearchLink
          className="button is-link is-outlined is-fullwidth"
          params={{
            query: null,
            sex: null,
            centuries: [],
          }}
        >
          Reset all filters
        </SearchLink>
      </div>
    </nav>
  );
};
