import { useSearchParams } from 'react-router-dom';
import classNames from 'classnames';
import {
  SearchKey, SearchParams, SexType, getSearchWith,
} from '../utils/searchHelper';
import { SearchLink } from './SearchLink';

const centuryOptions = ['16', '17', '18', '19', '20'];

export const PeopleFilters = () => {
  const [searchParams, setSearchParams] = useSearchParams();

  const query = searchParams.get(SearchKey.QUERY) || '';
  const sex = searchParams.get(SearchKey.SEX) || '';
  const centuries = searchParams.getAll(SearchKey.CENTURIES) || [];

  function setSearchWith(params: SearchParams) {
    const search = getSearchWith(searchParams, params);

    setSearchParams(search);
  }

  function handleQueryChange(event: React.ChangeEvent<HTMLInputElement>) {
    setSearchWith({ query: event.target.value || null });
  }

  return (
    <nav className="panel">
      <p className="panel-heading">Filters</p>

      <p className="panel-tabs" data-cy="SexFilter">
        <SearchLink
          params={{ [SearchKey.SEX]: null }}
          className={classNames({ 'is-active': !sex })}
        >
          All
        </SearchLink>
        <SearchLink
          params={{ [SearchKey.SEX]: SexType.MALE }}
          className={classNames({ 'is-active': sex === SexType.MALE })}
        >
          Male
        </SearchLink>
        <SearchLink
          params={{ [SearchKey.SEX]: SexType.FEMALE }}
          className={classNames({ 'is-active': sex === SexType.FEMALE })}
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
            {centuryOptions.map(century => {
              const isCenturySelected = centuries.includes(century);

              return (
                <SearchLink
                  key={century}
                  params={{
                    centuries: isCenturySelected
                      ? centuries.filter(centum => centum !== century)
                      : [...centuries, century],
                  }}
                  data-cy="century"
                  className={classNames('button mr-1', {
                    'is-info': isCenturySelected,
                  })}
                >
                  {century}
                </SearchLink>
              );
            })}
          </div>

          <div className="level-right ml-4">
            <SearchLink
              params={{ centuries: null }}
              data-cy="centuryALL"
              className={classNames('button is-success', {
                'is-outlined': !!centuries.length,
              })}
            >
              All
            </SearchLink>
          </div>
        </div>
      </div>

      <div className="panel-block">
        <SearchLink
          params={{
            query: null,
            sex: null,
            centuries: null,
          }}
          className="button is-link is-outlined is-fullwidth"
        >
          Reset all filters
        </SearchLink>
      </div>
    </nav>
  );
};
