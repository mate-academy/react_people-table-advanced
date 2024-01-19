import cn from 'classnames';
import { Sex } from '../types';
import { usePeopleListContext } from '../context/PeopleListContext';
import { SearchLink } from './SearchLink';

const centuries = ['16', '17', '18', '19', '20'];

export const PeopleFilters = () => {
  const {
    sexFilter, query, handleInputChange, centuriesFilter,
  } = usePeopleListContext();

  return (
    <nav className="panel">
      <p className="panel-heading">Filters</p>

      <p className="panel-tabs" data-cy="SexFilter">
        <SearchLink
          params={{ sex: null }}
          className={cn({ 'is-active': !sexFilter })}
        >
          All
        </SearchLink>
        <SearchLink
          params={{ sex: Sex.MALE }}
          className={cn({ 'is-active': sexFilter === Sex.MALE })}
        >
          Male
        </SearchLink>
        <SearchLink
          params={{ sex: Sex.FEMALE }}
          className={cn({ 'is-active': sexFilter === Sex.FEMALE })}
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
            onChange={handleInputChange}
          />

          <span className="icon is-left">
            <i className="fas fa-search" aria-hidden="true" />
          </span>
        </p>
      </div>
      <div className="panel-block">
        <div className="level is-flex-grow-1 is-mobile" data-cy="CenturyFilter">
          <div className="level-left">
            {
              centuries.map(century => (
                <SearchLink
                  key={century}
                  data-cy="century"
                  className={cn('button mr-1', {
                    'is-info': centuriesFilter.includes(century),
                  })}
                  params={
                    !centuriesFilter.includes(century)
                      ? { centuries: [...centuriesFilter, century] }
                      : {
                        centuries: centuriesFilter.filter(el => (
                          el !== century)),
                      }
                  }
                >
                  {century}
                </SearchLink>
              ))
            }

            <a
              data-cy="century"
              className="button mr-1 is-info"
              href="#/people?centuries=17"
            >
              17
            </a>
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
          params={{ sex: null, centuries: null, q: '' }}
        >
          Reset all filters
        </SearchLink>
      </div>
    </nav>
  );
};
