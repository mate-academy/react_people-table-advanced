import classNames from 'classnames';
import { SearchLink } from './SearchLink';
import { useSearchParams } from 'react-router-dom';
import { getSearchWith } from '../utils/searchHelper';

export const PeopleFilters = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const centuries = ['16', '17', '18', '19', '20'];
  const centuriesParam = searchParams.getAll('centuries');

  const toggleCentury = (century: string) => {
    return centuriesParam.includes(century)
      ? centuriesParam.filter(c => c !== century)
      : [...centuriesParam, century];
  };

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const query = event.currentTarget.value;

    if (query.length === 0) {
      setSearchParams(getSearchWith(searchParams, { query: null }));
    } else {
      setSearchParams(getSearchWith(searchParams, { query }));
    }
  };

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
            value={searchParams.get('query') || ''}
            onChange={handleInputChange}
          />

          <span className="icon is-left">
            <i className="fas fa-search" aria-hidden="true" />
          </span>
        </p>
      </div>

      <div className="panel-block">
        <div className="level is-flex-grow-1 is-mobile" data-cy="CenturyFilter">
          <div className="level-left">
            {centuries.map(century => (
              <SearchLink
                key={century}
                data-cy="century"
                className={classNames('button', 'mr-1', {
                  'is-info': centuriesParam.includes(century),
                })}
                params={{ centuries: toggleCentury(century) }}
              >
                {century}
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
