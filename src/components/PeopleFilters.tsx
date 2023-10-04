import { useSearchParams } from 'react-router-dom';
import classnames from 'classnames';

import { SearchLink } from './SearchLink';
import { getSearchWith } from '../utils/searchHelper';
import { Sex } from '../types/Sex';
import { FEMALE_SEX, MALE_SEX, centuriesNumbers } from '../utils/constants';

export const PeopleFilters = () => {
  const [searchParams, setSeacrhParams] = useSearchParams();

  const sex = searchParams.get('sex') || '';
  const centuries = searchParams.getAll('centuries') || [];
  const query = searchParams.get('query') || '';

  const handleQueryChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSeacrhParams(
      getSearchWith(searchParams, { query: event.target.value || null }),
    );
  };

  const toggleCentury = (selectedNumber: string) => {
    return centuries.includes(selectedNumber)
      ? centuries.filter(century => century !== selectedNumber)
      : [...centuries, selectedNumber];
  };

  return (
    <nav className="panel">
      <p className="panel-heading">Filters</p>

      <p className="panel-tabs" data-cy="SexFilter">
        <SearchLink
          className={classnames({ 'is-active': !sex })}
          params={{ sex: null }}
        >
          {Sex.All}
        </SearchLink>
        <SearchLink
          className={classnames({ 'is-active': sex === MALE_SEX })}
          params={{ sex: MALE_SEX }}
        >
          {Sex.Male}
        </SearchLink>
        <SearchLink
          className={classnames({ 'is-active': sex === FEMALE_SEX })}
          params={{ sex: FEMALE_SEX }}
        >
          {Sex.Female}
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
            {centuriesNumbers.map(century => (
              <SearchLink
                key={century}
                data-cy="century"
                className={classnames('button', 'mr-1', {
                  'is-info': centuries.includes(century),
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
              className="button is-success is-outlined"
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
            centuries: [],
            sex: null,
            query: null,
          }}
        >
          Reset all filters
        </SearchLink>
      </div>
    </nav>
  );
};
