import { useSearchParams } from 'react-router-dom';
import classNames from 'classnames';
import { SearchLink } from './SearchLink';
import { getSearchWith } from '../utils/searchHelper';
import { SearchParams } from '../utils/enums';

export const PeopleFilters = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const sexFilter = searchParams.get(SearchParams.sex) || '';
  const query = searchParams.get(SearchParams.query) || '';
  const centuriesArray = searchParams.getAll(SearchParams.centuries) || [];
  const centuries = ['16', '17', '18', '19', '20'];

  const handleQueryChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchParams(
      getSearchWith(
        searchParams,
        { [SearchParams.query]: e.target.value || null },
      ),
    );
  };

  return (
    <nav className="panel">
      <p className="panel-heading">Filters</p>

      <p className="panel-tabs" data-cy="SexFilter">
        <SearchLink
          params={{ [SearchParams.sex]: null }}
          className={classNames({ 'is-active': !sexFilter })}
        >
          All
        </SearchLink>
        <SearchLink
          params={{ [SearchParams.sex]: 'm' }}
          className={classNames({ 'is-active': sexFilter === 'm' })}
        >
          Male
        </SearchLink>
        <SearchLink
          params={{ [SearchParams.sex]: 'f' }}
          className={classNames({ 'is-active': sexFilter === 'f' })}
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
            onChange={(e) => handleQueryChange(e)}
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
                className={classNames('button mr-1', {
                  'is-info': centuriesArray.includes(century),
                })}
                params={{
                  [SearchParams.centuries]: centuriesArray.includes(century)
                    ? centuriesArray.filter(c => c !== century)
                    : [...centuriesArray, century],
                }}
              >
                {century}
              </SearchLink>
            ))}
          </div>

          <div className="level-right ml-4">
            <SearchLink
              data-cy="centuryALL"
              className={classNames('button', 'is-success', {
                'is-outlined': centuriesArray.length,
              })}
              params={{ [SearchParams.centuries]: null }}
            >
              All
            </SearchLink>
          </div>
        </div>
      </div>

      <div className="panel-block">
        <SearchLink
          className="button is-link is-fullwidth is-outlined"
          params={{
            [SearchParams.centuries]: null,
            [SearchParams.sex]: null,
            [SearchParams.query]: null,
          }}
        >
          Reset all filters
        </SearchLink>
      </div>
    </nav>
  );
};
