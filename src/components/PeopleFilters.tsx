import { useSearchParams } from 'react-router-dom';
import { SearchLink } from './SearchLink';
import cl from 'classnames';
import { getSearchWith } from '../utils/searchHelper';

export const PeopleFilters = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const allCenturies = searchParams.getAll('centuries');

  const handleQueryChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const params = getSearchWith(searchParams, {
      query: event.target.value || null,
    });

    setSearchParams(params);
  };

  const centuredChange = (century: number) => {
    const centuries = searchParams.getAll('centuries');
    const result = centuries.includes(`${century}`);

    if (!result) {
      centuries.push(`${century}`);

      return centuries;
    }

    const filteredResult = centuries.filter(item => century !== +item);

    return filteredResult;
  };

  return (
    <nav className="panel">
      <p className="panel-heading">Filters</p>

      <p className="panel-tabs" data-cy="SexFilter">
        <SearchLink
          className={cl({ 'is-active': searchParams.get('sex') === null })}
          params={{ sex: null }}
        >
          All
        </SearchLink>
        <SearchLink
          className={cl({ 'is-active': searchParams.get('sex') === 'm' })}
          params={{ sex: 'm' }}
        >
          Male
        </SearchLink>
        <SearchLink
          className={cl({ 'is-active': searchParams.get('sex') === 'f' })}
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
            onChange={event => handleQueryChange(event)}
            value={searchParams.get('query') || ''}
            placeholder="Search"
          />

          <span className="icon is-left">
            <i className="fas fa-search" aria-hidden="true" />
          </span>
        </p>
      </div>

      <div className="panel-block">
        <div className="level is-flex-grow-1 is-mobile" data-cy="CenturyFilter">
          <div className="level-left">
            <SearchLink
              data-cy="century"
              className={cl('button', 'mr-1', {
                'is-info': allCenturies.includes('16'),
              })}
              params={{
                centuries: centuredChange(16),
              }}
            >
              16
            </SearchLink>

            <SearchLink
              data-cy="century"
              className={cl('button', 'mr-1', {
                'is-info': allCenturies.includes('17'),
              })}
              params={{
                centuries: centuredChange(17),
              }}
            >
              17
            </SearchLink>

            <SearchLink
              data-cy="century"
              className={cl('button', 'mr-1', {
                'is-info': allCenturies.includes('18'),
              })}
              params={{
                centuries: centuredChange(18),
              }}
            >
              18
            </SearchLink>

            <SearchLink
              data-cy="century"
              className={cl('button', 'mr-1', {
                'is-info': allCenturies.includes('19'),
              })}
              params={{
                centuries: centuredChange(19),
              }}
            >
              19
            </SearchLink>

            <SearchLink
              data-cy="century"
              className={cl('button', 'mr-1', {
                'is-info': allCenturies.includes('20'),
              })}
              params={{
                centuries: centuredChange(20),
              }}
            >
              20
            </SearchLink>
          </div>

          <div className="level-right ml-4">
            <SearchLink
              data-cy="centuryALL"
              className={cl('button', 'is-success', {
                'is-outlined': allCenturies.length !== 0,
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
          className="button is-link is-outlined is-fullwidth"
          params={{ query: null, sex: null, centuries: [] }}
        >
          Reset all filters
        </SearchLink>
      </div>
    </nav>
  );
};
