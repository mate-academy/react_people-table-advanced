import { useSearchParams } from 'react-router-dom';
import { SearchLink } from './SearchLink';

export const PeopleFilters = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const sexParam = searchParams.get('sex') || 'all';
  const currentCenturies = searchParams.getAll('centuries');
  const queryParam = searchParams.get('query') || '';

  const getActive = (currentValue: string, expectedValue: string) => {
    return currentValue === expectedValue ? 'is-active' : '';
  };

  const handleInput = (event: React.ChangeEvent<HTMLInputElement>) => {
    const inputValue = event.target.value;

    if (inputValue.length > 0) {
      setSearchParams({
        ...Object.fromEntries(searchParams),
        query: inputValue,
      });
    } else {
      const newParams = { ...Object.fromEntries(searchParams) };

      delete newParams.query;

      setSearchParams(newParams);
    }
  };

  const toggleCentury = (century: string) => {
    const updatedCenturies = currentCenturies.includes(century)
      ? currentCenturies.filter(centuries => centuries !== century)
      : [...currentCenturies, century];

    return updatedCenturies.length > 0 ? updatedCenturies : null;
  };

  return (
    <>
      <nav className="panel">
        <p className="panel-heading">Filters</p>
        <p className="panel-tabs" data-cy="SexFilter">
          <SearchLink
            className={`${sexParam === 'all' && 'is-active'}`}
            params={{ sex: null }}
          >
            All
          </SearchLink>
          <SearchLink
            className={getActive(sexParam, 'm')}
            params={{ sex: 'm' }}
          >
            Male
          </SearchLink>
          <SearchLink
            className={getActive(sexParam, 'f')}
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
              value={queryParam}
              onChange={handleInput}
            />

            <span className="icon is-left">
              <i className="fas fa-search" aria-hidden="true" />
            </span>
          </p>
        </div>

        <div className="panel-block">
          <div
            className="level is-flex-grow-1 is-mobile"
            data-cy="CenturyFilter"
          >
            <div className="level-left">
              {['16', '17', '18', '19', '20'].map(century => (
                <SearchLink
                  key={century}
                  data-cy="century"
                  className={`button mr-1 ${currentCenturies.includes(century) ? 'is-info' : ''}`}
                  params={{ centuries: toggleCentury(century) }}
                >
                  {century}
                </SearchLink>
              ))}
            </div>

            <div className="level-right ml-4">
              <SearchLink
                data-cy="centuryALL"
                className={`button is-success ${currentCenturies.length !== 0 ? 'is-outlined' : ''}`}
                params={{ centuries: null }}
              >
                All
              </SearchLink>
            </div>
          </div>
        </div>
        {/* className="button is-success is-outlined" */}
        <div className="panel-block">
          <SearchLink
            className={`button is-link is-fullwidth ${currentCenturies.length === 0 && sexParam === 'all' ? 'is-outlined' : ''}`}
            params={{ centuries: null, sex: null }}
          >
            Reset all filters
          </SearchLink>
        </div>
      </nav>
    </>
  );
};
