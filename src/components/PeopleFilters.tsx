import { useSearchParams } from 'react-router-dom';
import classNames from 'classnames';
import { SearchLink } from './SearchLink';
import { SearchingParams } from '../types/SearchParams';
import { Genders } from '../types/Genders';
import { getSearchWith } from '../utils/searchHelper';
import { CENTURIES } from '../utils/constants';
import { updateSelectedCenturies } from '../utils/updateSelectedCenturies';

export const PeopleFilters = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const selectedSex = searchParams.get(SearchingParams.Sex) || '';
  const query = searchParams.get(SearchingParams.Query) || '';
  const selectedCenturies = searchParams
    .getAll(SearchingParams.Centuries) || [];

  const handleQueryChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchParams(
      getSearchWith(searchParams, {
        query: event.target.value || null,
      }),
    );
  };

  return (
    <nav className="panel">
      <p className="panel-heading">Filters</p>

      <p className="panel-tabs" data-cy="SexFilter">
        {Object.entries(Genders).map(([key, value]) => {
          const genderKey = key as keyof typeof Genders;

          return (
            <SearchLink
              key={genderKey}
              className={classNames(
                {
                  'is-active': selectedSex === value,
                },
              )}
              params={{
                sex: value || null,
              }}
            >
              {genderKey}
            </SearchLink>
          );
        })}
      </p>

      <div className="panel-block">
        <p className="control has-icons-left">
          <input
            data-cy="NameFilter"
            type="search"
            value={query}
            className="input"
            placeholder="Search"
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
                className={classNames(
                  'button',
                  'mr-1',
                  {
                    'is-info': selectedCenturies.includes(century),
                  },
                )}
                params={{
                  centuries: updateSelectedCenturies(
                    selectedCenturies,
                    century,
                  ),
                }}
              >
                {century}
              </SearchLink>
            ))}

          </div>

          <div className="level-right ml-4">
            <SearchLink
              data-cy="centuryALL"
              className={classNames(
                'button',
                'is-success',
                {
                  'is-outlined': selectedCenturies.length,
                },
              )}
              params={{
                centuries: [],
              }}
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
            query: null,
            sex: null,
            centuries: [],
          }}
        >
          Reset all filters
        </SearchLink>
      </div>
    </nav>
  );
};
