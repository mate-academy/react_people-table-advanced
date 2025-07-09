import { useSearchParams } from 'react-router-dom';
import { SearchLink } from './SearchLink';
import classNames from 'classnames';

export const PeopleFilters = () => {
  const [searchParams, setSearchParams] = useSearchParams();

  const allCenturies = ['16', '17', '18', '19', '20'];
  const selectedCenturies = searchParams.getAll('centuries');

  return (
    <nav className="panel">
      <p className="panel-heading">Filters</p>

      <p className="panel-tabs" data-cy="SexFilter">
        <SearchLink
          className={classNames({
            'is-active': !searchParams.get('sex'),
          })}
          params={{ sex: null }}
        >
          All
        </SearchLink>
        <SearchLink
          className={classNames({
            'is-active': searchParams.get('sex') === 'm',
          })}
          params={{ sex: 'm' }}
        >
          Male
        </SearchLink>
        <SearchLink
          className={classNames({
            'is-active': searchParams.get('sex') === 'f',
          })}
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
            placeholder="Search"
            onChange={e => {
              const newParams = new URLSearchParams(searchParams);
              const value = e.target.value.trim();

              if (value) {
                newParams.set('query', value);
              } else {
                newParams.delete('query');
              }

              setSearchParams(newParams);
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
            {allCenturies.map(cen => {
              const isActive = selectedCenturies.includes(cen);
              const newCenturies = isActive
                ? selectedCenturies.filter(c => c !== cen) // зняти
                : [...selectedCenturies, cen]; // додати

              return (
                <SearchLink
                  key={cen}
                  data-cy="century"
                  className={classNames('button mr-1', {
                    'is-info': isActive,
                  })}
                  params={{ centuries: newCenturies }}
                >
                  {cen}
                </SearchLink>
              );
            })}
          </div>

          <div className="level-right ml-4">
            <SearchLink
              data-cy="centuryALL"
              className={classNames('button is-success', {
                'is-outlined': searchParams.getAll('centuries').length !== 0,
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
          params={{ centuries: null, query: null, sex: null }}
        >
          Reset all filters
        </SearchLink>
      </div>
    </nav>
  );
};
