import { useSearchParams } from 'react-router-dom';
import { getSearchWith } from '../utils/searchHelper';
import { SearchLink } from './SearchLink';
import classNames from 'classnames';

export const PeopleFilters = () => {
  const [searchParams, setSearchParams] = useSearchParams();

  enum GenderFilter {
    Male = 'm',
    Female = 'f',
  }

  const arrayOfCenturies = ['16', '17', '18', '19', '20'];

  const centuries = searchParams.getAll('centuries') || [];
  const sex = searchParams.getAll('sex') || '';
  const query = searchParams.getAll('query') || '';

  const handleQueryChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const search = getSearchWith(searchParams, {
      query: event.target.value || null,
    });

    setSearchParams(search);
  };

  const toggleCenturies = (century: string) => {
    const newCenturies = centuries.includes(century)
      ? centuries.filter(cent => cent !== century)
      : [...centuries, century];

    return { centuries: newCenturies };
  };

  return (
    <nav className="panel">
      <p className="panel-heading">Filters</p>

      <p className="panel-tabs" data-cy="SexFilter">
        <SearchLink
          className={classNames({ 'is-active': !sex })}
          params={{ sex: null }}
        >
          All
        </SearchLink>
        <SearchLink
          className={classNames({
            'is-active': sex.includes(GenderFilter.Male),
          })}
          params={{ sex: GenderFilter.Male }}
        >
          Male
        </SearchLink>
        <SearchLink
          className={classNames({
            'is-active': sex.includes(GenderFilter.Female),
          })}
          params={{ sex: GenderFilter.Female }}
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
            {arrayOfCenturies.map(century => (
              <SearchLink
                key={century}
                data-cy="century"
                className={classNames('button mr-1', {
                  'is-info': centuries.includes(century),
                })}
                params={toggleCenturies(century)}
              >
                {century}
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
          params={{ sex: null, query: null, centuries: null }}
        >
          Reset all filters
        </SearchLink>
      </div>
    </nav>
  );
};
