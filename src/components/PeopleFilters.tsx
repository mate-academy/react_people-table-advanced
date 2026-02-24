import classNames from 'classnames';
import { SearchLink } from './SearchLink';
import { useSearchParams } from 'react-router-dom';
import { getSearchWith } from '../utils/searchHelper';

export const PeopleFilters = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const activeSex = searchParams.get('sex');
  const activeCenturies = searchParams.getAll('centuries');
  const query = searchParams.get('query') || '';

  const toggleCentury = (century: string) => {
    const current = new Set(activeCenturies);

    if (current.has(century)) {
      current.delete(century);
    } else {
      current.add(century);
    }

    return Array.from(current).sort() || null;
  };

  const handleQueryChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value;
    const nextParams = getSearchWith(searchParams, {
      query: value || null,
    });

    setSearchParams(nextParams);
  };

  return (
    <nav className="panel">
      <p className="panel-heading">Filters</p>

      <p className="panel-tabs" data-cy="SexFilter">
        <SearchLink
          params={{ sex: null }}
          className={classNames({ 'is-active': !activeSex })}
        >
          All
        </SearchLink>
        <SearchLink
          params={{ sex: 'm' }}
          className={classNames({
            'is-active': activeSex === 'm',
          })}
        >
          Male
        </SearchLink>
        <SearchLink
          params={{ sex: 'f' }}
          className={classNames({
            'is-active': activeSex === 'f',
          })}
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
            <SearchLink
              data-cy="century"
              className={classNames('button mr-1', {
                'is-info': activeCenturies.includes('16'),
              })}
              params={{ centuries: toggleCentury('16') }}
            >
              16
            </SearchLink>

            <SearchLink
              data-cy="century"
              className={classNames('button mr-1', {
                'is-info': activeCenturies.includes('17'),
              })}
              params={{ centuries: toggleCentury('17') }}
            >
              17
            </SearchLink>

            <SearchLink
              data-cy="century"
              className={classNames('button mr-1', {
                'is-info': activeCenturies.includes('18'),
              })}
              params={{ centuries: toggleCentury('18') }}
            >
              18
            </SearchLink>

            <SearchLink
              data-cy="century"
              className={classNames('button mr-1', {
                'is-info': activeCenturies.includes('19'),
              })}
              params={{ centuries: toggleCentury('19') }}
            >
              19
            </SearchLink>

            <SearchLink
              data-cy="century"
              className={classNames('button mr-1', {
                'is-info': activeCenturies.includes('20'),
              })}
              params={{ centuries: toggleCentury('20') }}
            >
              20
            </SearchLink>
          </div>

          <div className="level-right ml-4">
            <SearchLink
              data-cy="centuryALL"
              className={classNames('button mr-1', {
                'is-info': activeCenturies.length === 0,
              })}
              params={{ centuries: [] }}
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
