import { useSearchParams } from 'react-router-dom';
import { SearchLink } from './SearchLink';
import cn from 'classnames';

const centuryFilters = ['16', '17', '18', '19', '20'];
const sexFilters = [
  { title: 'All', value: null },
  { title: 'Male', value: 'm' },
  { title: 'Female', value: 'f' },
];

export const PeopleFilters = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const query = searchParams.get('query') || '';
  const sex = searchParams.get('sex');
  const centuries = searchParams.getAll('century');

  function handleQueryChange(event: React.ChangeEvent<HTMLInputElement>) {
    const params = new URLSearchParams(searchParams);

    if (!event.target.value) {
      params.delete('query');
      setSearchParams(params);
    } else {
      params.set('query', event.target.value);
      setSearchParams(params);
    }
  }

  return (
    <nav className="panel">
      <p className="panel-heading">Filters</p>

      <p className="panel-tabs" data-cy="SexFilter">
        {sexFilters.map((item, index) => (
          <SearchLink
            className={cn({
              'is-active': sex === item.value,
            })}
            params={{ sex: item.value }}
            key={index}
          >
            {item.title}
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
            {centuryFilters.map(centuryFilter => (
              <SearchLink
                data-cy="century"
                className={cn('button mr-1', {
                  'is-info': centuries.includes(centuryFilter),
                })}
                params={{
                  century: centuries.includes(centuryFilter)
                    ? centuries.filter(century => century !== centuryFilter)
                    : [...centuries, centuryFilter],
                }}
                key={centuryFilter}
              >
                {centuryFilter}
              </SearchLink>
            ))}
          </div>

          <div className="level-right ml-4">
            <SearchLink
              data-cy="centuryALL"
              className="button is-success is-outlined"
              params={{ century: null }}
            >
              All
            </SearchLink>
          </div>
        </div>
      </div>

      <div className="panel-block">
        <SearchLink
          className="button is-link is-outlined is-fullwidth"
          params={{ century: null, sex: null, query: null }}
        >
          Reset all filters
        </SearchLink>
      </div>
    </nav>
  );
};
