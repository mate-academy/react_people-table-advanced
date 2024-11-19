import classNames from 'classnames';
import { SearchLink } from './SearchLink';
import { useSearchParams } from 'react-router-dom';
import { getSearchWith, toggleCentury } from '../utils/searchHelper';
import { sexFilter, centuryFilter, setNameLink } from '../services/helperData';

export const PeopleFilters = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const sex = searchParams.get('sex') || '';
  const centuries = searchParams.getAll('centuries') || [];
  const query = searchParams.get('query') || '';

  const params = new URLSearchParams(searchParams);

  const handleReset = () => {
    params.delete('query');
    params.delete('sex');
    params.delete('centuries');
    setSearchParams(params);
  };

  return (
    <nav className="panel">
      <p className="panel-heading">Filters</p>

      <p className="panel-tabs" data-cy="SexFilter">
        {sexFilter.map(item => (
          <SearchLink
            key={item}
            params={{ sex: item === 'all' ? null : item[0] }}
            className={classNames({
              'is-active': sex === item[0] || (item === 'all' && !sex),
            })}
          >
            {setNameLink(item)}
          </SearchLink>
        ))}
      </p>

      <div className="panel-block">
        <p className="control has-icons-left">
          <input
            data-cy="NameFilter"
            type="text"
            className="input"
            placeholder="Search"
            value={query}
            onChange={({ target }) => {
              const value = target.value.trimStart();

              setSearchParams(
                getSearchWith(searchParams, { query: !value ? null : value }),
              );
            }}
          />

          <span className="icon is-left">
            <i className="fas fa-search" aria-hidden="true" />
          </span>
        </p>
      </div>

      <div className="panel-block">
        <div className="level is-flex-grow-1 is-mobile" data-cy="CenturyFilter">
          <div className="level-left">
            {centuryFilter.map(century => (
              <SearchLink
                data-cy="century"
                key={century}
                params={{
                  centuries: toggleCentury(centuries, `${century}`),
                }}
                className={classNames('button mr-1', {
                  'is-info': centuries.includes(`${century}`),
                })}
              >
                {century}
              </SearchLink>
            ))}
          </div>

          <div className="level-right ml-4">
            <SearchLink
              key={'all'}
              data-cy="centuryALL"
              className={classNames('button is-success', {
                'is-outlined': !!centuries.length,
              })}
              params={{ centuries: [] }}
            >
              All
            </SearchLink>
          </div>
        </div>
      </div>

      <div className="panel-block">
        <button
          className="button is-link is-fullwidth is-outlined"
          onClick={handleReset}
        >
          Reset all filters
        </button>
      </div>
    </nav>
  );
};
