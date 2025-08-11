import { Link, useSearchParams } from 'react-router-dom';
import { SearchLink } from './SearchLink';
import classNames from 'classnames';

export const PeopleFilters = () => {
  const [searchParams, setSearchParams] = useSearchParams();

  function getCenturies() {
    if (searchParams.has('centuries')) {
      return searchParams.getAll('centuries');
    }

    return [];
  }

  function getSex() {
    if (searchParams.has('sex')) {
      return searchParams.get('sex');
    }

    return 'all';
  }

  function findCentury(century: string) {
    const currentCenturies = getCenturies();
    const newCenturies = currentCenturies.includes(century)
      ? currentCenturies.filter(c => c !== century)
      : [...currentCenturies, century];

    return { centuries: newCenturies.length > 0 ? newCenturies : null };
  }

  function changeQuery(newQuery: string) {
    const newParams = new URLSearchParams(searchParams);

    if (newQuery) {
      newParams.set('query', newQuery);
    } else {
      newParams.delete('query');
    }

    setSearchParams(newParams);
  }

  return (
    <nav className="panel">
      <p className="panel-heading">Filters</p>

      <p className="panel-tabs" data-cy="SexFilter">
        <SearchLink
          className={classNames('', { 'is-active': getSex() === 'all' })}
          params={{ sex: null }}
        >
          All
        </SearchLink>
        <SearchLink
          className={classNames('', { 'is-active': getSex() === 'm' })}
          params={{ sex: 'm' }}
        >
          Male
        </SearchLink>
        <SearchLink
          className={classNames('', { 'is-active': getSex() === 'f' })}
          params={{ sex: 'f' }}
        >
          Female
        </SearchLink>
      </p>

      <div className="panel-block">
        <p className="control has-icons-left">
          <input
            value={searchParams.get('query') ?? ''}
            data-cy="NameFilter"
            type="search"
            className="input"
            placeholder="Search"
            onChange={e => {
              return changeQuery(e.target.value);
            }}
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
                'is-info': getCenturies().includes('16'),
              })}
              params={findCentury('16')}
            >
              16
            </SearchLink>

            <SearchLink
              data-cy="century"
              className={classNames('button mr-1', {
                'is-info': getCenturies().includes('17'),
              })}
              params={findCentury('17')}
            >
              17
            </SearchLink>

            <SearchLink
              data-cy="century"
              className={classNames('button mr-1', {
                'is-info': getCenturies().includes('18'),
              })}
              params={findCentury('18')}
            >
              18
            </SearchLink>

            <SearchLink
              data-cy="century"
              className={classNames('button mr-1', {
                'is-info': getCenturies().includes('19'),
              })}
              params={findCentury('19')}
            >
              19
            </SearchLink>

            <SearchLink
              data-cy="century"
              className={classNames('button mr-1', {
                'is-info': getCenturies().includes('20'),
              })}
              params={findCentury('20')}
            >
              20
            </SearchLink>
          </div>

          <div className="level-right ml-4">
            <SearchLink
              data-cy="centuryALL"
              className={classNames('button is-success', {
                'is-outlined': searchParams.toString() === '',
              })}
              params={{ centuries: null }}
            >
              All
            </SearchLink>
          </div>
        </div>
      </div>

      <div className="panel-block">
        <Link className="button is-link is-outlined is-fullwidth" to="#/people">
          Reset all filters
        </Link>
      </div>
    </nav>
  );
};
