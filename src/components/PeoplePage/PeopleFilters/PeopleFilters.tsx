import { useSearchParams } from 'react-router-dom';
import cn from 'classnames';
import { Gender } from '../../../types/Genger';
import { SearchLink } from '../../SearchLink';

const CENTURIES = [16, 17, 18, 19, 20];

export const PeopleFilters = () => {
  const [searchParams, setSearchParams] = useSearchParams();

  const sex = searchParams.get('sex') || 'all';
  const centuries = searchParams.getAll('centuries') || [];
  const query = searchParams.get('query') || '';

  const selectedCenturies = (century: number) =>
    centuries.includes(`${century}`)
      ? centuries.filter(cen => +cen !== century)
      : [...centuries, `${century}`];

  const handleQueryChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const params = new URLSearchParams(searchParams);

    params.set('query', event.target.value);

    if (!event.target.value) {
      params.delete('query');
    }

    setSearchParams(params);
  };

  return (
    <nav className="panel">
      <p className="panel-heading">Filters</p>

      <p className="panel-tabs" data-cy="SexFilter">
        {Object.entries(Gender).map(([key, value]) => (
          <SearchLink
            key={value}
            params={{ sex: value === 'all' ? null : value }}
            className={cn({ 'is-active': sex === value })}
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
            value={query}
            onChange={handleQueryChange}
          />

          <SearchLink className="icon is-left" params={{ query: null }}>
            <i className="fas fa-search" aria-hidden />
          </SearchLink>
        </p>
      </div>

      <div className="panel-block">
        <div className="level is-flex-grow-1 is-mobile" data-cy="CenturyFilter">
          <div className="level-left">
            {CENTURIES.map(century => (
              <SearchLink
                key={century}
                params={{
                  centuries: selectedCenturies(century),
                }}
                data-cy="century"
                className={cn('button mr-1 ', {
                  'is-info': centuries.includes(`${century}`),
                })}
              >
                {century}
              </SearchLink>
            ))}
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
          className="button is-link is-outlined is-fullwidth"
          params={{ centuries: null, sex: null, query: null }}
        >
          Reset all filters
        </SearchLink>
      </div>
    </nav>
  );
};
