import { useSearchParams } from 'react-router-dom';
import classNames from 'classnames';
import { getSearchWith } from '../utils/searchHelper';
import { PersonSex } from '../types/PersonSex';
import {
  SEX_FEMALE, SEX_MALE, centuriesArray, initialParams,
} from '../utils/constants';
import { SearchLink } from './SearchLink';

export const PeopleFilters = () => {
  const [searchParams, setSearchParams] = useSearchParams();

  const query = searchParams.get('query') || '';
  const centuries = searchParams.getAll('centuries') || [];
  const sex = searchParams.get('sex') || null;

  const getCenturies = (century: string) => {
    const filteredCenturies = centuries.includes(century)
      ? centuries.filter(number => number !== century)
      : [...centuries, century];

    return { centuries: filteredCenturies };
  };

  function handleQueryChange(event: React.ChangeEvent<HTMLInputElement>) {
    const paramsToUpdate = { query: event.target.value || null };

    const search = getSearchWith(searchParams, paramsToUpdate);

    setSearchParams(search);
  }

  return (
    <nav className="panel">
      <p className="panel-heading">Filters</p>

      <p className="panel-tabs" data-cy="SexFilter">
        <SearchLink
          className={classNames({ 'is-active': sex === null })}
          params={{ sex: null }}
        >
          {PersonSex.all}
        </SearchLink>
        <SearchLink
          className={classNames({ 'is-active': sex === SEX_MALE })}
          params={{ sex: SEX_MALE }}
        >
          {PersonSex.male}
        </SearchLink>
        <SearchLink
          className={classNames({ 'is-active': sex === SEX_FEMALE })}
          params={{ sex: SEX_FEMALE }}
        >
          {PersonSex.female}
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
            {centuriesArray.map(century => (
              <SearchLink
                data-cy="century"
                className={classNames('button mr-1', {
                  'is-info': centuries.includes(century),
                })}
                params={getCenturies(century)}
                key={century}
              >
                {century}
              </SearchLink>
            ))}
          </div>

          <div className="level-right ml-4">
            <SearchLink
              data-cy="centuryALL"
              className="button is-success is-outlined"
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
          params={initialParams}
        >
          Reset all filters
        </SearchLink>
      </div>
    </nav>
  );
};
