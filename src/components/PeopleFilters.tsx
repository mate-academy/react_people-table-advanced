import { useSearchParams } from 'react-router-dom';
import classNames from 'classnames';

import { getSearchWith, SearchParams } from '../utils/searchHelper';
import { SexFilter } from '../types/Filters';
import { SearchLink } from './SearchLink';

export const PeopleFilters = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const sex = (searchParams.get('sex') as SexFilter) || SexFilter.All;
  const query = searchParams.get('query') || '';
  const centuries = searchParams.getAll('centuries') || [];

  function setSearchWith(paramsToSet: SearchParams) {
    const search = getSearchWith(searchParams, paramsToSet);

    setSearchParams(search);
  }

  const handleNameFilter = (event: React.ChangeEvent<HTMLInputElement>) =>
    setSearchWith({ query: event.target.value.trim() || '' });

  function getCenturies(from: number, to: number) {
    const cent = [];

    for (let i = from; i <= to; i++) {
      cent.push(i);
    }

    return cent;
  }

  const reset = {
    sex: null,
    query: null,
    centuries: null,
  };

  return (
    <nav className="panel">
      <p className="panel-heading">Filters</p>

      <p className="panel-tabs" data-cy="SexFilter">
        <SearchLink
          className={classNames({ 'is-active': sex === SexFilter.All })}
          params={{ sex: null }}
        >
          All
        </SearchLink>
        <SearchLink
          className={classNames({ 'is-active': sex === SexFilter.Male })}
          params={{ sex: SexFilter.Male }}
        >
          Male
        </SearchLink>
        <SearchLink
          className={classNames({ 'is-active': sex === SexFilter.Female })}
          params={{ sex: SexFilter.Female }}
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
            onChange={handleNameFilter}
          />

          <span className="icon is-left">
            <i className="fas fa-search" aria-hidden="true" />
          </span>
        </p>
      </div>

      <div className="panel-block">
        <div className="level is-flex-grow-1 is-mobile" data-cy="CenturyFilter">
          <div className="level-left">
            {getCenturies(16, 20).map(century => {
              const getCenturyFilterClassName = classNames('button', 'mr-1', {
                'is-info': centuries.includes(`${century}`),
              });
              const getCenturyFilterURLSearch = {
                centuries: centuries.includes(`${century}`)
                  ? centuries.filter(cent => cent !== `${century}`)
                  : [...centuries, `${century}`],
              };

              return (
                <SearchLink
                  key={century}
                  data-cy="century"
                  className={getCenturyFilterClassName}
                  params={getCenturyFilterURLSearch}
                >
                  {century}
                </SearchLink>
              );
            })}
          </div>

          <div className="level-right ml-4">
            <SearchLink
              data-cy="centuryALL"
              className="button is-success is-outlined"
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
          params={reset}
        >
          Reset all filters
        </SearchLink>
      </div>
    </nav>
  );
};
