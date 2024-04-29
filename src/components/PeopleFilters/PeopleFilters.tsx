import { useSearchParams } from 'react-router-dom';
import { getSearchWith } from '../../utils/searchHelper';
import classNames from 'classnames';
import { SearchLink } from '../SearchLink';

const CENTURIES = ['16', '17', '18', '19', '20'];

enum PersonGender {
  All = '',
  Male = 'm',
  Female = 'f',
}

export const PeopleFilters = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const query = searchParams.get('query') || '';
  const selectedCenturies = searchParams.getAll('centuries') || [];
  const currentSex = searchParams.get('sex') || PersonGender.All;

  const handleQueryChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const newSeachParams = getSearchWith(searchParams, {
      query: event.target.value || null,
    });

    setSearchParams(newSeachParams);
  };

  const toggleCentury = (century: string) => {
    return selectedCenturies.includes(century)
      ? selectedCenturies.filter(selectedCentury => selectedCentury !== century)
      : [...selectedCenturies, century];
  };

  return (
    <nav className="panel">
      <p className="panel-heading">Filters</p>

      <p className="panel-tabs" data-cy="SexFilter">
        {Object.entries(PersonGender).map(([key, value]) => (
          <SearchLink
            key={key}
            className={classNames({
              'is-active': currentSex === value,
            })}
            params={{ sex: value }}
          >
            {key}
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
            {CENTURIES.map(century => (
              <SearchLink
                key={century}
                data-cy="century"
                className={classNames('button mr-1', {
                  'is-info': selectedCenturies.includes(century),
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
              className={classNames('button is-success', {
                'is-outlined': selectedCenturies.length,
              })}
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
          params={{ query: null, centuries: null, sex: null }}
        >
          Reset all filters
        </SearchLink>
      </div>
    </nav>
  );
};
