import classNames from 'classnames';
import { useSearchParams } from 'react-router-dom';
import { SearchLink } from './SearchLink';

const centuries = ['16', '17', '18', '19', '20'];

export const PeopleFilters = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const sex = searchParams.get('sex');
  const query = searchParams.get('query') || '';
  const selectedCenturies = searchParams.getAll('centuries');

  const updateQuery = (value: string) => {
    const params = new URLSearchParams(searchParams);

    if (value) {
      params.set('query', value);
    } else {
      params.delete('query');
    }

    setSearchParams(params);
  };

  return (
    <nav className="panel">
      <p className="panel-heading">Filters</p>

      <p className="panel-tabs" data-cy="SexFilter">
        {[
          ['All', null],
          ['Male', 'm'],
          ['Female', 'f'],
        ].map(([label, value]) => (
          <SearchLink
            key={label}
            className={classNames({ 'is-active': sex === value })}
            params={{ sex: value }}
          >
            {label}
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
            onChange={event => updateQuery(event.target.value)}
          />
          <span className="icon is-left">
            <i className="fas fa-search" aria-hidden="true" />
          </span>
        </p>
      </div>

      <div className="panel-block">
        <div className="level is-flex-grow-1 is-mobile" data-cy="CenturyFilter">
          <div className="level-left">
            {centuries.map(century => {
              const isSelected = selectedCenturies.includes(century);
              const nextCenturies = isSelected
                ? selectedCenturies.filter(item => item !== century)
                : [...selectedCenturies, century];

              return (
                <SearchLink
                  data-cy="century"
                  key={century}
                  className={classNames('button mr-1', {
                    'is-info': isSelected,
                  })}
                  params={{
                    centuries: nextCenturies.length ? nextCenturies : null,
                  }}
                >
                  {century}
                </SearchLink>
              );
            })}
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
          params={{
            query: null,
            sex: null,
            centuries: null,
            sort: null,
            order: null,
          }}
        >
          Reset all filters
        </SearchLink>
      </div>
    </nav>
  );
};
