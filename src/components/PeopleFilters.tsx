import { useSearchParams } from 'react-router-dom';
import { getSearchWith, SearchParams } from '../utils/searchHelper';
import classNames from 'classnames';
import { SearchLink } from './SearchLink';

const ALL_CENTURIES = ['16', '17', '18', '19', '20'];

export const PeopleFilters = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const query = searchParams.get('query') || '';
  const centuries = searchParams.getAll('centuries') || [];
  const activeSex = searchParams.get('sex') || '';

  function setSearchWith(params: SearchParams) {
    const search = getSearchWith(searchParams, params);

    setSearchParams(search);
  }

  const handleQueryChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchWith({ query: event.target.value || null });
  };

  function clearAllCenturies() {
    setSearchWith({ centuries: [] });
  }

  function toggleCenturies(century: string) {
    const newCenturies = centuries.includes(century)
      ? centuries.filter(cent => cent !== century)
      : [...centuries, century];

    setSearchWith({ centuries: newCenturies });
  }

  return (
    <nav className="panel">
      <p className="panel-heading">Filters</p>

      <p className="panel-tabs" data-cy="SexFilter">
        <SearchLink
          params={{ sex: null }}
          className={classNames({
            'is-active': !activeSex,
          })}
        >
          All
        </SearchLink>
        <SearchLink
          params={{ sex: 'm' }}
          className={classNames({
            'is-active': activeSex.toString() === 'm',
          })}
        >
          Male
        </SearchLink>
        <SearchLink
          params={{ sex: 'f' }}
          className={classNames({
            'is-active': activeSex.toString() === 'f',
          })}
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
            value={query?.toString()}
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
            {ALL_CENTURIES.map(century => (
              <button
                key={century}
                data-cy="century"
                className={classNames('button mr-1', {
                  'is-info': centuries.includes(century),
                })}
                onClick={() => toggleCenturies(century.toString())}
              >
                {century}
              </button>
            ))}
          </div>

          <div className="level-right ml-4">
            <button
              onClick={clearAllCenturies}
              data-cy="centuryALL"
              className="button is-success is-outlined"
            >
              All
            </button>
          </div>
        </div>
      </div>

      <div className="panel-block">
        <a
          onClick={() => setSearchParams({})}
          className="button is-link is-outlined is-fullwidth"
        >
          Reset all filters
        </a>
      </div>
    </nav>
  );
};
