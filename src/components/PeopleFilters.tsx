import { ChangeEvent } from 'react';
import { SearchLink } from './SearchLink';
import classNames from 'classnames';
import { usePeopleParams } from '../hooks/usePeopleParams';

const CENTAURIES_COUNT = 5;
const STARTING_CENTAURY = 16;

export const PeopleFilters = () => {
  const { query, setQuery, sex, centauries } = usePeopleParams();

  const handleQueryChange = (e: ChangeEvent<HTMLInputElement>) =>
    setQuery(e.target.value);

  return (
    <nav className="panel">
      <p className="panel-heading">Filters</p>

      <p className="panel-tabs" data-cy="SexFilter">
        <SearchLink
          className={classNames({ 'is-active': !sex })}
          params={{ sex: null }}
        >
          All
        </SearchLink>
        <SearchLink
          className={classNames({ 'is-active': sex === 'm' })}
          params={{ sex: 'm' }}
        >
          Male
        </SearchLink>
        <SearchLink
          className={classNames({ 'is-active': sex === 'f' })}
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
            value={query || ''}
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
            {new Array(CENTAURIES_COUNT).fill(null).map((_, i) => {
              const centaury = (i + STARTING_CENTAURY).toString();
              const newCentauries = centauries.includes(centaury)
                ? centauries.filter(c => c !== centaury)
                : centauries.concat(centaury);

              return (
                <SearchLink
                  key={centaury}
                  params={{
                    centauries: newCentauries,
                  }}
                  data-cy="century"
                  className={classNames('button', 'mr-1', {
                    'is-info': centauries.includes(centaury),
                  })}
                >
                  {centaury}
                </SearchLink>
              );
            })}
          </div>

          <div className="level-right ml-4">
            <SearchLink
              data-cy="centuryALL"
              className="button is-success is-outlined"
              params={{ centauries: null }}
            >
              All
            </SearchLink>
          </div>
        </div>
      </div>

      <div className="panel-block">
        <SearchLink
          className="button is-link is-outlined is-fullwidth"
          params={{ query: null, sex: null, centauries: null }}
        >
          Reset all filters
        </SearchLink>
      </div>
    </nav>
  );
};
