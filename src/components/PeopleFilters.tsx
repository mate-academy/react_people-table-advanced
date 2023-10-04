import classNames from 'classnames';
import { useSearchParams } from 'react-router-dom';
import { SearchLink } from './SearchLink';
import { CENTURIES, SEARCH_FILTER } from '../utils/constants';

export const PeopleFilters = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const params = new URLSearchParams(searchParams);
  const selectedCenturies = params.getAll('century') || [];

  const handleQueryChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();

    const newQuery = e.target.value;

    if (newQuery === '') {
      params.delete('query');
    } else {
      params.set('query', newQuery);
    }

    setSearchParams(params);
  };

  return (
    <nav className="panel">
      <p className="panel-heading">Filters</p>

      <p className="panel-tabs" data-cy="SexFilter">
        {Object.keys(SEARCH_FILTER).map(
          (key) => (
            <SearchLink
              key={key}
              params={{ sex: SEARCH_FILTER[key as keyof typeof SEARCH_FILTER] }}
              className={classNames({
                'is-active': params.get('sex')
                  === SEARCH_FILTER[key as keyof typeof SEARCH_FILTER],
              })}
            >
              {key}
            </SearchLink>
          ),
        )}
      </p>

      <div className="panel-block">
        <p className="control has-icons-left">
          <input
            data-cy="NameFilter"
            type="search"
            className="input"
            placeholder="Search"
            value={searchParams.get('query') || ''}
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
            {Object.values(CENTURIES).map(century => (
              <SearchLink
                key={century}
                params={{
                  century: selectedCenturies.includes(century)
                    ? selectedCenturies.filter(date => date !== century)
                    : [...selectedCenturies, century],
                }}
                data-cy="century"
                className={classNames(
                  'button mr-1',
                  { 'is-info': selectedCenturies.includes(century) },
                )}
              >
                {century}
              </SearchLink>
            ))}
          </div>

          <div className="level-right ml-4">
            <SearchLink
              data-cy="centuryALL"
              className="button is-success is-outlined"
              params={{ century: [] }}
            >
              All
            </SearchLink>
          </div>
        </div>
      </div>

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
