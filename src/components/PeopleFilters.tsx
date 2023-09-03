import { useContext } from 'react';
import { useSearchParams } from 'react-router-dom';
import classNames from 'classnames';
import { Filter, PeopleContext } from './Context';
import { SearchLink } from './SearchLink';

import { getSearchWith } from '../utils/searchHelper';

export const PeopleFilters = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const centuriesArr = ['16', '17', '18', '19', '20'];
  const query = searchParams.get('query') || '';
  const sex = searchParams.get('sex') || '';
  const centuries = searchParams.getAll('centuries') || [];
  const handleQueryChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const search = getSearchWith(searchParams, {
      query: event.target.value || null,
    });

    setSearchParams(search);
  };

  const { selectedCenturies } = useContext(PeopleContext);

  const updateCenturiesParams = (
    currentCenturies: string[],
    centuryToToggle: string,
  ) => {
    const updatedCenturies = currentCenturies.includes(centuryToToggle)
      ? currentCenturies.filter((year) => year !== centuryToToggle)
      : [...currentCenturies, centuryToToggle];

    return {
      centuries: updatedCenturies,
    };
  };

  return (
    <nav className="panel">
      <p className="panel-heading">Filters</p>

      <p className="panel-tabs" data-cy="SexFilter">
        <SearchLink
          params={{ sex: null }}
          className={classNames({ 'is-active': !sex })}
        >
          All
        </SearchLink>
        <SearchLink
          params={{ sex: Filter.male }}
          className={classNames({ 'is-active': sex === Filter.male })}
        >
          Male
        </SearchLink>
        <SearchLink
          params={{ sex: Filter.female }}
          className={classNames({
            'is-active': sex === Filter.female,
          })}
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
            onChange={handleQueryChange}
          />

          <span className="icon is-left">
            <i className="fas fa-search" aria-hidden="true" />
          </span>
        </p>
      </div>

      <div className="panel-block">
        <div className="level is-flex-grow-1 is-mobile" data-cy="CenturyFilter">
          {centuriesArr.map((century) => (
            <SearchLink
              key={century}
              data-cy="century"
              className={classNames('button', 'mr-1', {
                'is-info': centuries.includes(century),
              })}
              params={updateCenturiesParams(centuries, century)}
            >
              {century}
            </SearchLink>
          ))}
          <SearchLink
            data-cy="centuryALL"
            className={classNames('button is-success', {
              'is-outlined': centuries.length !== 0,
            })}
            params={{ centuries: null }}
          >
            All
          </SearchLink>
        </div>
      </div>

      <div className="panel-block">
        <SearchLink
          className={classNames('button is-success', {
            'is-outlined': selectedCenturies.length !== 0,
          })}
          params={{ centuries: null, sex: null }}
        >
          Reset all filters
        </SearchLink>
      </div>
    </nav>
  );
};
