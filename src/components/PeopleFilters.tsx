import { ChangeEvent } from 'react';
import { useSearchParams } from 'react-router-dom';

import { SearchLink } from './SearchLink';

const centuries = [16, 17, 18, 19, 20];

export const PeopleFilters = () => {
  const [searchParams, setSearchParams] = useSearchParams();

  const query = searchParams.get('query') || '';
  const selectedCenturies = searchParams.getAll('centuries');

  const handleQueryChange = (event: ChangeEvent<HTMLInputElement>) => {
    const params = new URLSearchParams(searchParams);
    const value = event.target.value;

    if (value) {
      params.set('query', value);
    } else {
      params.delete('query');
    }

    setSearchParams(params);
  };

  const handleCenturyClick = (century: number) => {
    const params = new URLSearchParams(searchParams);
    const value = String(century);

    const currentCenturies = params.getAll('centuries');

    params.delete('centuries');

    if (currentCenturies.includes(value)) {
      currentCenturies
        .filter(centuryValue => centuryValue !== value)
        .forEach(centuryValue => {
          params.append('centuries', centuryValue);
        });
    } else {
      [...currentCenturies, value].forEach(centuryValue => {
        params.append('centuries', centuryValue);
      });
    }

    setSearchParams(params);
  };

  return (
    <aside>
      <h2 className="subtitle is-4">Filters</h2>

      <div className="field">
        <label className="label" htmlFor="query">
          Name
        </label>

        <div className="control">
          <input
            id="query"
            data-cy="NameFilter"
            className="input"
            type="text"
            placeholder="Search..."
            value={query}
            onChange={handleQueryChange}
          />
        </div>
      </div>

      <div className="field">
        <p className="label">Century</p>

        <div className="buttons">
          <SearchLink
            params={{
              centuries: null,
            }}
            className={
              selectedCenturies.length === 0 ? 'button is-link' : 'button'
            }
          >
            All
          </SearchLink>

          {centuries.map(century => {
            const isSelected = selectedCenturies.includes(String(century));

            return (
              <button
                key={century}
                type="button"
                className={isSelected ? 'button is-link' : 'button'}
                onClick={() => handleCenturyClick(century)}
              >
                {century}
              </button>
            );
          })}
        </div>
      </div>

      <SearchLink
        params={{
          query: null,
          centuries: null,
        }}
        className="button is-danger is-light"
      >
        Reset all filters
      </SearchLink>
    </aside>
  );
};
