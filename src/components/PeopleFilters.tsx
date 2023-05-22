import classNames from 'classnames';
import { useSearchParams } from 'react-router-dom';
import { SearchLink } from './SearchLink';
import { getSearchWith } from '../utils/searchHelper';

export const PeopleFilters = () => {
  const [searchParams, setSerchParams] = useSearchParams();
  const sex = searchParams.get('sex') || null;
  const query = searchParams.get('query') || '';
  const centuries = searchParams.getAll('centuries') || [];

  return (
    <nav className="panel">
      <p className="panel-heading">Filters</p>

      <p className="panel-tabs" data-cy="SexFilter">
        {[{ name: 'All', sex: null },
          { name: 'Male', sex: 'm' },
          { name: 'Female', sex: 'f' },
        ].map(type => (
          <SearchLink
            key={type.name}
            className={classNames({ 'is-active': type.sex === sex })}
            params={{ sex: type.sex }}
          >
            {type.name}
          </SearchLink>
        ))}

      </p>

      <div className="panel-block">
        <p className="control has-icons-left">
          <input
            data-cy="NameFilter"
            type="search"
            className="input"
            placeholder="Search"
            value={query}
            onChange={(event) => setSerchParams(
              getSearchWith(
                searchParams, { query: event.target.value || null },
              ),
            )}
          />

          <span className="icon is-left">
            <i className="fas fa-search" aria-hidden="true" />
          </span>
        </p>
      </div>

      <div className="panel-block">
        <div className="level is-flex-grow-1 is-mobile" data-cy="CenturyFilter">
          <div className="level-left">
            {['16', '17', '18', '19', '20'].map(centurie => (
              <SearchLink
                key={centurie}
                data-cy="century"
                className={classNames('button mr-1', {
                  'is-info': centuries.includes(centurie),
                })}
                params={{
                  centuries: centuries.includes(centurie)
                    ? centuries.filter(c => c !== centurie)
                    : [...centuries, centurie],
                }}
              >
                {centurie}
              </SearchLink>
            ))}
          </div>

          <div className="level-right ml-4">
            <SearchLink
              data-cy="centuryALL"
              className={classNames('button is-success', {
                'is-outlined': centuries.length > 0,
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
          params={{
            centuries: null,
            sex: null,
            query: null,
          }}
        >
          Reset all filters
        </SearchLink>
      </div>
    </nav>
  );
};
