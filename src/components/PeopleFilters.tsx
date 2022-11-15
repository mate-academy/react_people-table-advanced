import classNames from 'classnames';
import { useSearchParams } from 'react-router-dom';
import { getSearchWith } from '../utils/searchHelper';
import { SearchLink } from './SearchLink';

export const PeopleFilters = () => {
  const [searchParams, setSearchParams] = useSearchParams();

  const sex = searchParams.get('sex') || null;
  const query = searchParams.get('query') || '';
  const centuries = searchParams.getAll('centuries') || [];
  const genderList = ['All', 'Male', 'Female'];
  const centuryList = ['16', '17', '18', '19', '20'];

  const onGenderSelect = (params: string) => {
    switch (params) {
      case 'Female':
        return 'f';
      case 'Male':
        return 'm';
      default:
        return null;
    }
  };

  const onQueryChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const newQuery = getSearchWith(searchParams,
      { query: event.target.value || null });

    setSearchParams(newQuery);
  };

  return (
    <nav className="panel">
      <p className="panel-heading">Filters</p>

      <p className="panel-tabs" data-cy="SexFilter">
        {genderList.map(gender => (
          <SearchLink
            key={gender}
            params={{ sex: onGenderSelect(gender) }}
            className={classNames(
              { 'is-active': sex === onGenderSelect(gender) },
            )}
          >
            {gender}
          </SearchLink>
        ))}
      </p>

      <div className="panel-block">
        <p className="control has-icons-left">
          <input
            value={query}
            onChange={onQueryChange}
            data-cy="NameFilter"
            type="search"
            className="input"
            placeholder="Search"
          />

          <span className="icon is-left">
            <i className="fas fa-search" aria-hidden="true" />
          </span>
        </p>
      </div>

      <div className="panel-block">
        <div className="level is-flex-grow-1 is-mobile" data-cy="CenturyFilter">
          <div className="level-left">
            {centuryList.map(century => (
              <SearchLink
                key={century}
                data-cy="century"
                className={classNames('button mr-1',
                  { 'is-info': centuries.includes(century) })}
                params={{
                  centuries: centuries.includes(century)
                    ? centuries.filter(c => c !== century)
                    : [...centuries, century],
                }}
              >
                {century}
              </SearchLink>
            ))}
          </div>

          <div className="level-right ml-4">
            <SearchLink
              data-cy="centuryALL"
              className={classNames('button is-success',
                { 'is-outlined': centuries.length })}
              params={{ centuries: [] }}
            >
              All
            </SearchLink>
          </div>
        </div>
      </div>

      <div className="panel-block">
        <SearchLink
          className="button is-link is-outlined is-fullwidth"
          params={{
            sex: null,
            query: null,
            centuries: [],
          }}
        >
          Reset all filters
        </SearchLink>
      </div>
    </nav>
  );
};
