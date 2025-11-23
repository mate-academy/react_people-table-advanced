import { useSearchParams } from 'react-router-dom';
import { SearchLink } from './SearchLink';
import classname from 'classnames';
import { getSearchWith } from '../utils/searchHelper';

export const PeopleFilters = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const selectedCenturies = searchParams.getAll('centuries');
  const selectedSex = searchParams.get('sex');

  const getNewCenturies = (century: string) => {
    if (selectedCenturies.includes(century)) {
      return selectedCenturies.filter(c => c !== century);
    }

    return [...selectedCenturies, century];
  };

  const centuries = ['16', '17', '18', '19', '20'];

  return (
    <nav className="panel">
      <p className="panel-heading">Filters</p>

      <p className="panel-tabs" data-cy="SexFilter">
        <SearchLink
          params={{ sex: null }}
          className={classname({ 'is-active': !selectedSex })}
        >
          All
        </SearchLink>
        <SearchLink
          params={{ sex: 'm' }}
          className={classname({ 'is-active': selectedSex === 'm' })}
        >
          Male
        </SearchLink>
        <SearchLink
          params={{ sex: 'f' }}
          className={classname({ 'is-active': selectedSex === 'f' })}
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
            onChange={e =>
              setSearchParams(
                getSearchWith(searchParams, { query: e.target.value || null }),
              )
            }
          />

          <span className="icon is-left">
            <i className="fas fa-search" aria-hidden="true" />
          </span>
        </p>
      </div>

      <div className="panel-block">
        <div className="level is-flex-grow-1 is-mobile" data-cy="CenturyFilter">
          <div className="level-left">
            {centuries.map(centurie => (
              <SearchLink
                key={centurie}
                data-cy="century"
                className={classname('button mr-1', {
                  'is-info': selectedCenturies.includes(centurie),
                })}
                params={{ centuries: getNewCenturies(centurie) }}
              >
                {centurie}
              </SearchLink>
            ))}
          </div>
          <div className="level-right ml-4">
            <SearchLink
              data-cy="centuryALL"
              className="button is-success is-outlined"
              params={{ centuries: [] }}
            >
              All
            </SearchLink>
          </div>
        </div>
      </div>

      <div className="panel-block">
        <a className="button is-link is-outlined is-fullwidth" href="#/people">
          Reset all filters
        </a>
      </div>
    </nav>
  );
};
