import classNames from 'classnames';
import { useSearchParams } from 'react-router-dom';
import { SearchLink } from './SearchLink';
import { getSearchWith } from '../utils/searchHelper';
import { SearchParams } from '../types/SearchParamsEnum';
import { Sex } from '../types/Sex';

export const PeopleFilters = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const query = searchParams.get(SearchParams.Query) || '';
  const sex = searchParams.get(SearchParams.Sex) || '';
  const centuries = searchParams.getAll(SearchParams.Centuries) || [];

  const allCenturies = ['16', '17', '18', '19', '20'];

  const handleQuerySearch = (event: React.ChangeEvent<HTMLInputElement>) => {
    const search = getSearchWith(searchParams, {
      query: event.target.value || null,
    });

    setSearchParams(search);
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
        <SearchLink
          params={{ sex: Sex.Male }}
          className={classNames({ 'is-active': sex === Sex.Male })}
        >
          Male
        </SearchLink>
        <SearchLink
          params={{ sex: Sex.Female }}
          className={classNames({ 'is-active': sex === Sex.Female })}
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
            onChange={handleQuerySearch}
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
                params={{
                  centuries: centuries.includes(century)
                    ? centuries.filter(cent => century !== cent)
                    : [...centuries, century],
                }}
                key={century}
                data-cy="century"
                className={classNames('button mr-1', {
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
              data-cy="centuryALL"
              className={classNames('button is-success', {
                'is-outlined': centuries.length > 0,
              })}
            >
              All
            </SearchLink>
          </div>
        </div>
      </div>

      <div className="panel-block">
        <SearchLink
          params={{ sex: null, centuries: null, query: null }}
          className="button is-link is-outlined is-fullwidth"
        >
          Reset all filters
        </SearchLink>
      </div>
    </nav>
  );
};
