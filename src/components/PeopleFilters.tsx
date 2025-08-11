import classNames from 'classnames';
import { useSearchParams } from 'react-router-dom';
import { SearchLink } from './SearchLink';

const sexs = ['All', 'Male', 'Female'];

export const PeopleFilters = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const query = searchParams.get('query') || '';
  const activeSex = searchParams.get('sex') || '';
  const activeCenturies = searchParams.getAll('century') || [];

  const handleQueryChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const params = new URLSearchParams(searchParams);
    const newQuery = event.target.value.trim();

    if (newQuery) {
      params.set('query', newQuery);
    } else {
      params.delete('query');
    }

    setSearchParams(params);
  };

  return (
    <nav className="panel">
      <p className="panel-heading">Filters</p>

      {/* sex filter */}
      <p className="panel-tabs" data-cy="SexFilter">
        {sexs.map((sex, i) => {
          const sexChar = sex.charAt(0).toLowerCase();

          return (
            <SearchLink
              key={sex}
              params={{ sex: i == 0 ? null : sexChar }}
              className={classNames({
                'is-active':
                  activeSex === sexChar || (!activeSex && sexChar === 'a'),
              })}
            >
              {sex}
            </SearchLink>
          );
        })}
      </p>

      {/* query filter */}
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

      {/* centuries filter */}
      <div className="panel-block">
        <div className="level is-flex-grow-1 is-mobile" data-cy="CenturyFilter">
          <div className="level-left">
            {[16, 17, 18, 19, 20].map(century => (
              <SearchLink
                key={century}
                data-cy="century"
                className={`button mr-1 ${activeCenturies.includes(century.toString()) ? 'is-info' : ''}`}
                params={{
                  century: activeCenturies.includes(century.toString())
                    ? activeCenturies.filter(c => c !== century.toString())
                    : [...activeCenturies, century.toString()],
                }}
              >
                {century}
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
      {/* reset */}
      <div className="panel-block">
        <SearchLink
          className="button is-link is-outlined is-fullwidth"
          params={{ query: null, sex: null, century: null }}
        >
          Reset all filters
        </SearchLink>
      </div>
    </nav>
  );
};
