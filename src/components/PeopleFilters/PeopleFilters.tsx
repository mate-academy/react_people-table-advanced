import classNames from 'classnames';
import { useSearchParams } from 'react-router-dom';
import { SearchLink } from '../SearchLink';
import { getSearchWith } from '../../utils/searchHelper';

export const PeopleFilters = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const sex = searchParams.get('sex');
  const selectedCenturies = searchParams.getAll('centuries');
  const query = searchParams.get('query') || '';

  return (
    <nav className="panel">
      <p className="panel-heading">Filters</p>

      <p className="panel-tabs" data-cy="SexFilter">
        <SearchLink params={{ sex: null }}>All</SearchLink>
        <SearchLink
          params={{ sex: 'm' }}
          className={classNames('button', {
            'is-info': sex === 'm',
          })}
        >
          Male
        </SearchLink>
        <SearchLink
          params={{ sex: 'f' }}
          className={classNames('button', {
            'is-info': sex === 'f',
          })}
        >
          Female
        </SearchLink>
      </p>

      <div className="panel-block">
        <p className="control has-icons-left">
          <input
            value={query}
            data-cy="NameFilter"
            type="search"
            className="input"
            placeholder="Search"
            onChange={event => {
              const value = event.target.value;

              setSearchParams(
                getSearchWith(searchParams, { query: value ? value : null }),
              );
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
              params={{
                centuries: selectedCenturies.includes('16')
                  ? selectedCenturies.filter(c => c !== '16')
                  : [...selectedCenturies, '16'],
              }}
              data-cy="century"
              className={classNames('button mr-1', {
                'is-info': selectedCenturies.includes('16'),
              })}
            >
              16
            </SearchLink>

            <SearchLink
              params={{
                centuries: selectedCenturies.includes('17')
                  ? selectedCenturies.filter(c => c !== '17')
                  : [...selectedCenturies, '17'],
              }}
              data-cy="century"
              className={classNames('button mr-1', {
                'is-info': selectedCenturies.includes('17'),
              })}
            >
              17
            </SearchLink>

            <SearchLink
              params={{
                centuries: selectedCenturies.includes('18')
                  ? selectedCenturies.filter(c => c !== '18')
                  : [...selectedCenturies, '18'],
              }}
              data-cy="century"
              className={classNames('button mr-1', {
                'is-info': selectedCenturies.includes('18'),
              })}
            >
              18
            </SearchLink>

            <SearchLink
              params={{
                centuries: selectedCenturies.includes('19')
                  ? selectedCenturies.filter(c => c !== '19')
                  : [...selectedCenturies, '19'],
              }}
              data-cy="century"
              className={classNames('button mr-1', {
                'is-info': selectedCenturies.includes('19'),
              })}
            >
              19
            </SearchLink>

            <SearchLink
              params={{
                centuries: selectedCenturies.includes('20')
                  ? selectedCenturies.filter(c => c !== '20')
                  : [...selectedCenturies, '20'],
              }}
              data-cy="century"
              className={classNames('button mr-1', {
                'is-info': selectedCenturies.includes('20'),
              })}
            >
              20
            </SearchLink>
          </div>

          <div className="level-right ml-4">
            <SearchLink
              params={{ centuries: null }}
              data-cy="centuryALL"
              className="button is-success is-outlined"
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
            sort: null,
            order: null,
          }}
          className="button is-link is-outlined is-fullwidth"
        >
          Reset all filters
        </SearchLink>
      </div>
    </nav>
  );
};
