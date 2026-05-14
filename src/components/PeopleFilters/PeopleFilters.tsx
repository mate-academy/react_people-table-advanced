import { useSearchParams } from 'react-router-dom';
import { SearchLink } from '../SearchLink/SearchLink';
import classNames from 'classnames';
import { getSearchWith } from '../../utils/searchHelper';

export const PeopleFilters = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const sex = searchParams.get('sex');
  const centuries = searchParams.getAll('centuries');
  const query = searchParams.get('query');

  const changeFilter = (type?: string) => {
    if (!type) {
      return { sex: null };
    } else {
      return { sex: type };
    }
  };

  const handleCenturyClick = (century: string) => {
    if (centuries.includes(century)) {
      return centuries.filter(cent => cent !== century);
    } else {
      return [...centuries, century];
    }
  };

  return (
    <nav className="panel">
      <p className="panel-heading">Filters</p>

      <p className="panel-tabs" data-cy="SexFilter">
        <SearchLink
          className={classNames({ 'is-active': sex === null })}
          params={changeFilter()}
        >
          All
        </SearchLink>
        <SearchLink
          className={classNames({ 'is-active': sex === 'm' })}
          params={changeFilter('m')}
        >
          Male
        </SearchLink>
        <SearchLink
          className={classNames({ 'is-active': sex === 'f' })}
          params={changeFilter('f')}
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
            value={query || ''}
            placeholder="Search"
            onChange={event =>
              setSearchParams(
                getSearchWith(searchParams, {
                  query: event.target.value === '' ? null : event.target.value,
                }),
              )
            }
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
              className={classNames('button', 'mr-1', {
                'is-info': centuries.includes('16'),
              })}
              params={{ centuries: handleCenturyClick('16') }}
            >
              16
            </SearchLink>

            <SearchLink
              data-cy="century"
              className={classNames('button', 'mr-1', {
                'is-info': centuries.includes('17'),
              })}
              params={{ centuries: handleCenturyClick('17') }}
            >
              17
            </SearchLink>

            <SearchLink
              data-cy="century"
              className={classNames('button', 'mr-1', {
                'is-info': centuries.includes('18'),
              })}
              params={{ centuries: handleCenturyClick('18') }}
            >
              18
            </SearchLink>

            <SearchLink
              data-cy="century"
              className={classNames('button', 'mr-1', {
                'is-info': centuries.includes('19'),
              })}
              params={{ centuries: handleCenturyClick('19') }}
            >
              19
            </SearchLink>

            <SearchLink
              data-cy="century"
              className={classNames('button', 'mr-1', {
                'is-info': centuries.includes('20'),
              })}
              params={{ centuries: handleCenturyClick('20') }}
            >
              20
            </SearchLink>
          </div>

          <div className="level-right ml-4">
            <SearchLink
              data-cy="centuryALL"
              className={classNames('button', 'is-outlined', {
                'is-success': centuries.length === 0,
              })}
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
          params={{ centuries: null, sex: null, query: null }}
        >
          Reset all filters
        </SearchLink>
      </div>
    </nav>
  );
};
