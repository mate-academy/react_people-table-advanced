import { useSearchParams } from 'react-router-dom';

import { SearchLink } from './SearchLink';

const allCenturies = [16, 17, 18, 19, 20];

export const PeopleFilters = () => {
  const [searchParams, setSearchParams] = useSearchParams();

  const query = searchParams.get('query') || '';
  const sex = searchParams.get('sex');
  const selectedCenturies = searchParams.getAll('centuries');

  const handleQueryChange = (newQuery: string) => {
    const newSearchParams = new URLSearchParams(searchParams.toString());

    if (newQuery) {
      newSearchParams.set('query', newQuery);
    } else {
      newSearchParams.delete('query');
    }

    setSearchParams(newSearchParams);
  };

  const getCenturyParams = (century: number) => {
    const centuryAsString = String(century);
    const isSelected = selectedCenturies.includes(centuryAsString);

    if (isSelected) {
      const newCenturies = selectedCenturies.filter(currentCentury => {
        return currentCentury !== centuryAsString;
      });

      return {
        centuries: newCenturies.length > 0 ? newCenturies : null,
      };
    }

    const newCenturies = [...selectedCenturies, centuryAsString].sort(
      (a, b) => {
        return Number(a) - Number(b);
      },
    );

    return {
      centuries: newCenturies,
    };
  };

  return (
    <nav className="panel">
      <p className="panel-heading">Filters</p>

      <p className="panel-tabs" data-cy="SexFilter">
        <SearchLink className={!sex ? 'is-active' : ''} params={{ sex: null }}>
          All
        </SearchLink>

        <SearchLink
          className={sex === 'm' ? 'is-active' : ''}
          params={{ sex: 'm' }}
        >
          Male
        </SearchLink>

        <SearchLink
          className={sex === 'f' ? 'is-active' : ''}
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
            value={query}
            onChange={event => handleQueryChange(event.target.value)}
          />

          <span className="icon is-left">
            <i className="fas fa-search" aria-hidden="true" />
          </span>
        </p>
      </div>

      <div className="panel-block">
        <div className="level is-flex-grow-1 is-mobile" data-cy="CenturyFilter">
          <div className="level-left">
            {allCenturies.map(century => (
              <SearchLink
                key={century}
                data-cy="century"
                className={
                  selectedCenturies.includes(String(century))
                    ? 'button mr-1 is-info'
                    : 'button mr-1'
                }
                params={getCenturyParams(century)}
              >
                {century}
              </SearchLink>
            ))}
          </div>

          <div className="level-right ml-4">
            <SearchLink
              data-cy="centuryALL"
              className={
                selectedCenturies.length === 0
                  ? 'button is-success'
                  : 'button is-success is-outlined'
              }
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
          to="/people"
          params={{
            sex: null,
            query: null,
            centuries: null,
            sort: null,
            order: null,
          }}
        >
          Reset all filters
        </SearchLink>
      </div>
    </nav>
  );
};
