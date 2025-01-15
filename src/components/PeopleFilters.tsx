import classNames from 'classnames';
import { SearchLink } from './SearchLink';
import { useSearchParams } from 'react-router-dom';

export const PeopleFilters = () => {
  const [searchParams] = useSearchParams();
  const isResetActive = Object.values(searchParams).every(
    value => value === null,
  );
  const searchParamsKeysToNull = Object.keys(searchParams).reduce<
  Record<string, null>
  >(
    (acc, key) => ({
      ...acc,
      [key]: null,
    }),
    {},
  );

  return (
    <nav className="panel">
      <p className="panel-heading">Filters</p>

      <p className="panel-tabs" data-cy="SexFilter">
        <SearchLink
          className={classNames({
            'is-active': searchParams.get('sex') === null,
          })}
          params={{ sex: null }}
        >
          All
        </SearchLink>
        <SearchLink
          className={classNames({
            'is-active': searchParams.get('sex') === 'male',
          })}
          params={{ sex: 'male' }}
        >
          Male
        </SearchLink>
        <SearchLink
          className={classNames({
            'is-active': searchParams.get('sex') === 'female',
          })}
          params={{ sex: 'female' }}
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
              className={classNames('button', 'is-outlined', {
                'is-success': searchParams.get('centure') === '16',
              })}
              params={{ centure: '16' }}
            >
              16
            </SearchLink>

            <SearchLink
              className={classNames('button', 'is-outlined', {
                'is-success': searchParams.get('centure') === '17',
              })}
              params={{ centure: '17' }}
            >
              17
            </SearchLink>

            <SearchLink
              data-cy="century"
              className={classNames('button', 'is-outlined', {
                'is-success': searchParams.get('centure') === '18',
              })}
              params={{ centure: '18' }}
            >
              18
            </SearchLink>

            <SearchLink
              data-cy="century"
              className={classNames('button', 'is-outlined', {
                'is-success': searchParams.get('centure') === '19',
              })}
              params={{ centure: '19' }}
            >
              19
            </SearchLink>

            <SearchLink
              data-cy="century"
              className={classNames('button', 'is-outlined', {
                'is-success': searchParams.get('centure') === '20',
              })}
              params={{ centure: '20' }}
            >
              20
            </SearchLink>
          </div>

          <div className="level-right ml-4">
            <SearchLink
              data-cy="centuryALL"
              className={classNames('button', 'is-outlined', {
                'is-success': searchParams.get('centure') === null,
              })}
              params={{ centure: null }}
            >
              All
            </SearchLink>
          </div>
        </div>
      </div>

      <div className="panel-block">
        <SearchLink
          className={classNames('button', 'is-outlined', 'is-fullwidth', {
            'is-success': isResetActive,
          })}
          params={searchParamsKeysToNull}
        >
          Reset all filters
        </SearchLink>
      </div>
    </nav>
  );
};
