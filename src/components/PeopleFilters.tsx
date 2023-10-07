import classNames from 'classnames';
import { useSearchParams } from 'react-router-dom';
import { getSearchWith } from '../utils/searchHelper';
import { CENTURIES_LINK } from '../utils/variables';
import { Gender } from '../types/Gender';
import { QueryParamsType } from '../types/QueryParamsType';
import { SearchLink } from './SearchLink';

export const PeopleFilters = () => {
  const [searchParams, setSearchParams] = useSearchParams();

  const query = searchParams.get(QueryParamsType.Query) || '';
  const sex = searchParams.get(QueryParamsType.Sex) || '';
  const centuries = searchParams.getAll(QueryParamsType.Centuries) || [];

  function handleQueryChange(event: React.ChangeEvent<HTMLInputElement>) {
    const params = { query: event.target.value || null };
    const search = getSearchWith(searchParams, params);

    setSearchParams(search);
  }

  return (
    <nav className="panel">
      <p className="panel-heading">Filters</p>

      <p className="panel-tabs" data-cy="SexFilter">
        <SearchLink
          className={classNames({ 'is-active': !sex })}
          params={{ sex: null }}
        >
          All
        </SearchLink>
        <SearchLink
          className={classNames({ 'is-active': sex === Gender.Male })}
          params={{ sex: Gender.Male }}
        >
          Male
        </SearchLink>
        <SearchLink
          className={classNames({ 'is-active': sex === Gender.Female })}
          params={{ sex: Gender.Female }}
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
            {CENTURIES_LINK.map(century => {
              const isActive = centuries.includes(century);
              const newCentury = isActive
                ? centuries.filter(cent => cent !== century)
                : [...centuries, century];

              return (
                <SearchLink
                  key={century}
                  data-cy="century"
                  params={{ centuries: newCentury }}
                  className={classNames(
                    'button',
                    'mr-1',
                    { 'is-info': isActive },
                  )}
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
                { 'is-outlined': !!centuries.length },
              )}
              params={{ centuries: null }}
            >
              All
            </SearchLink>
          </div>
        </div>
      </div>
      <div className="panel-block">
        <SearchLink
          className="button is-link is-outlined is-fullwidth"
          params={{ sex: null, centuries: [], query: null }}
        >
          Reset all filters
        </SearchLink>
      </div>
    </nav>
  );
};
