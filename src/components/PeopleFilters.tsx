import { useSearchParams } from 'react-router-dom';
import { SearchLink } from './SearchLink';
import classNames from 'classnames';
import { getSearchWith } from '../utils/searchHelper';

export const PeopleFilters = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const sex = searchParams.get('sex') || '';
  const centuries = searchParams.getAll('centuries') || [];
  const query = searchParams.get('query') || '';

  const centuriesAll = ['16', '17', '18', '19', '20'];

  const newCenturies = (centuryItem: string) => ({
    centuries: centuries.includes(centuryItem)
      ? centuries.filter(item => item !== centuryItem)
      : [...centuries, centuryItem],
  });

  function handleQeuryChange(event: React.ChangeEvent<HTMLInputElement>) {
    const newQuery = event.target.value;

    if (!newQuery) {
      setSearchParams(getSearchWith(searchParams, { query: null }));
    } else {
      setSearchParams(getSearchWith(searchParams, { query: newQuery }));
    }
  }

  return (
    <nav className="panel">
      <p className="panel-heading">Filters</p>

      <p className="panel-tabs" data-cy="SexFilter">
        <SearchLink
          params={{ sex: null }}
          className={classNames({
            'is-active': !sex,
          })}
        >
          All
        </SearchLink>
        <SearchLink
          params={{ sex: 'm' }}
          className={classNames({
            'is-active': sex === 'm',
          })}
        >
          Male
        </SearchLink>
        <SearchLink
          params={{ sex: 'f' }}
          className={classNames({
            'is-active': sex === 'f',
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
            onChange={handleQeuryChange}
            value={query}
          />

          <span className="icon is-left">
            <i className="fas fa-search" aria-hidden="true" />
          </span>
        </p>
      </div>

      <div className="panel-block">
        <div className="level is-flex-grow-1 is-mobile" data-cy="CenturyFilter">
          <div className="level-left">
            {centuriesAll.map(century => (
              <SearchLink
                params={newCenturies(century)}
                key={century}
                data-cy={'century'}
                className={classNames('button mr-1', {
                  'is-info': centuries.includes(century),
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
              className={classNames('button is-success', {
                'is-outlined': centuries.length,
              })}
            >
              All
            </SearchLink>
          </div>
        </div>
      </div>

      <div className="panel-block">
        <SearchLink
          params={{ centuries: null, sex: null, query: null }}
          className={classNames('button is-link is-outlined is-fullwidth')}
        >
          Reset all filters
        </SearchLink>
      </div>
    </nav>
  );
};
