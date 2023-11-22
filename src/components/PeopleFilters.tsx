import { useSearchParams } from 'react-router-dom';
import cn from 'classnames';
import { getSearchWith } from '../utils/searchHelper';
import { SearchLink } from './SearchLink';

const centuriesArray = [
  '16', '17', '18', '19', '20',
];

const sexArray = [
  { title: 'All', urlParam: 'All' },
  { title: 'Male', urlParam: 'm' },
  { title: 'Female', urlParam: 'f' },
];

export const PeopleFilters: React.FC = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const centuries = searchParams.getAll('centuries') || [];
  const sex = searchParams.get('sex') || 'All';
  const query = searchParams.get('query') || '';

  const toggleCenturies = (century: string) => {
    if (!century) {
      return { centuries: [] };
    }

    return {
      centuries: centuries.includes(century)
        ? centuries.filter(ch => ch !== century)
        : [...centuries, century],
    };
  };

  const toggleSex = (newSex: string | null) => {
    if (newSex === 'All') {
      return { sex: null };
    }

    return { sex: newSex };
  };

  const toggleQuery = (newQuery: string) => {
    const search = getSearchWith(searchParams, { query: newQuery || null });

    setSearchParams(search);
  };

  const toggleAllReset = () => {
    return { query: null, centuries: [], sex: null };
  };

  return (
    <nav className="panel">
      <p className="panel-heading">Filters</p>

      <p className="panel-tabs" data-cy="SexFilter">
        {sexArray.map((currSex) => (
          <SearchLink
            className={cn({ 'is-active': sex === currSex.urlParam })}
            params={toggleSex(currSex.urlParam)}
          >
            {currSex.title}
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
            onChange={(event) => toggleQuery(event.target.value)}
          />

          <span className="icon is-left">
            <i className="fas fa-search" aria-hidden="true" />
          </span>
        </p>
      </div>

      <div className="panel-block">
        <div className="level is-flex-grow-1 is-mobile" data-cy="CenturyFilter">
          <div className="level-left">
            {centuriesArray.map((century) => (
              <SearchLink
                data-cy="century"
                className={cn('button mr-1', {
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
              className={cn('button is-success', {
                'is-outlined': centuries.length,
              })}
              params={toggleCenturies('')}

            >
              All
            </SearchLink>
          </div>
        </div>
      </div>

      <div className="panel-block">
        <SearchLink
          className="button is-link is-outlined is-fullwidth"
          params={toggleAllReset()}
        >
          Reset all filters
        </SearchLink>
      </div>
    </nav>
  );
};
