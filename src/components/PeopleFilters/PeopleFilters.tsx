import classNames from 'classnames';
import { useSearchParams } from 'react-router-dom';
import { SearchLink } from '../SearchLink';

enum SexFilter {
  All = '',
  Male = 'm',
  Female = 'f',
}

export const PeopleFilters = () => {
  const [searchParams, setSearchParams] = useSearchParams();

  const sex = searchParams.get('sex');
  const centuries = searchParams.getAll('centuries');
  const query = searchParams.get('query');

  const centuryValues = Array.from({ length: 5 }, (_, i) => String(i + 16));

  const initialFilters = {
    centuries: [],
    sex: null,
    query: null,
    sort: null,
    order: null,
  };

  const handleQueryChange = (
    { target }: React.ChangeEvent<HTMLInputElement>,
  ) => {
    if (target.value) {
      searchParams.set('query', target.value);
    } else {
      searchParams.delete('query');
    }

    setSearchParams(searchParams);
  };

  return (
    <nav className="panel">
      <p className="panel-heading">
        Filters
      </p>

      <p
        className="panel-tabs"
        data-cy="SexFilter"
      >
        {Object.entries(SexFilter).map(([key, value]) => (
          <SearchLink
            params={({ sex: value || null })}
            key={key}
            className={classNames(
              {
                'is-active': sex === value
                  || (sex === null && value === ''),
              },
            )}
          >
            {key}
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
            value={query || ''}
            onChange={handleQueryChange}
          />

          <span className="icon is-left">
            <i className="fas fa-search" aria-hidden="true" />
          </span>
        </p>
      </div>

      <div className="panel-block">
        <div
          data-cy="CenturyFilter"
          className="
            level
            is-flex-grow-1
            is-mobile
          "
        >
          <div className="level-left">
            {centuryValues.map(century => (
              <SearchLink
                params={{
                  centuries: centuries.includes(century)
                    ? centuries.filter(c => c !== century)
                    : [...centuries, century],
                }}
                data-cy="century"
                key={century}
                className={classNames(
                  'button',
                  'mr-1',
                  { 'is-info': centuries.includes(century) },
                )}
              >
                {century}
              </SearchLink>
            ))}
          </div>

          <div className="level-right ml-4">
            <SearchLink
              params={{ centuries: [] }}
              data-cy="centuryALL"
              className={classNames(
                'button',
                'is-success',
                { 'is-outlined': centuries.length },
              )}
            >
              All
            </SearchLink>
          </div>
        </div>
      </div>

      <div className="panel-block">
        <SearchLink
          params={initialFilters}
          className="
            button
            is-link
            is-outlined
            is-fullwidth
          "
        >
          Reset all filters
        </SearchLink>
      </div>
    </nav>
  );
};
