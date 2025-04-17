/* eslint-disable prettier/prettier */
import { useSearchParams } from 'react-router-dom';
import { SearchLink } from './SearchLink';
import classNames from 'classnames';
import { SearchField } from './SearchField';

const CENTURIES = [16, 17, 18, 19, 20, 21];

export const PeopleFilters = () => {
  const [searchParams] = useSearchParams();

  return (
    <nav className="panel">
      <p className="panel-heading">Filters</p>

      <p className="panel-tabs" data-cy="SexFilter">
        <SearchLink
          className={classNames({ 'is-active': !searchParams.has('sex') })}
          params={{ sex: null }}
        >
          All
        </SearchLink>
        <SearchLink
          className={classNames({ 'is-active': searchParams.has('sex', 'm') })}
          params={{ sex: 'm' }}
        >
          Male
        </SearchLink>
        <SearchLink
          className={classNames({ 'is-active': searchParams.has('sex', 'f') })}
          params={{ sex: 'f' }}
        >
          Female
        </SearchLink>
      </p>

      <SearchField />

      <div className="panel-block">
        <div className="level is-flex-grow-1 is-mobile" data-cy="CenturyFilter">
          <div className="level-left">
            {CENTURIES.map(c => (
              <SearchLink
                key={c}
                data-cy="century"
                className={classNames({
                  'button mr-1': true,
                  'is-info': searchParams.has('centuries', `${c}`),
                })}
                params={{
                  centuries: searchParams.has('centuries', `${c}`)
                    ? searchParams
                      .getAll('centuries')
                      .filter(it => it !== `${c}`)
                    : [...searchParams.getAll('centuries'), `${c}`],
                }}
              >
                {c}
              </SearchLink>
            ))}
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
          params={{ sex: null, centuries: null, query: null }}
        >
          Reset all filters
        </SearchLink>
      </div>
    </nav>
  );
};
