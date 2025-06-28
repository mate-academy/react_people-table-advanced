import classNames from 'classnames';
import { getSearchWith } from '../utils/searchHelper';
import { useSearchParams } from 'react-router-dom';
import { useCallback } from 'react';
import { SearchLink } from './SearchLink';
import { SEX_FILTERS, CENTURIES_FILTERS } from '../Constants';
import { Person } from '../types';
import { Sex } from '../hooks/useFilters';
interface Props {
  people: Person[] | null;
}

export const PeopleFilters: React.FC<Props> = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const sex = searchParams.get('sex') || Sex.all;
  const selectedCenturies = searchParams.getAll('centuries');
  const query = searchParams.get('query') || '';

  const onHandleQueryChange = useCallback(
    (event: React.ChangeEvent<HTMLInputElement>) => {
      const newQuery = event.target.value;
      const updatedSearchParams = getSearchWith(searchParams, {
        query: newQuery || null,
      });

      setSearchParams(updatedSearchParams);
    },
    [searchParams, setSearchParams],
  );

  return (
    <nav className="panel">
      <p className="panel-heading">Filters</p>

      <p className="panel-tabs" data-cy="SexFilter">
        {Object.entries(SEX_FILTERS).map(([key, value]) => (
          <SearchLink
            key={key}
            className={classNames({
              'is-active': sex === value,
            })}
            params={{ sex: value && value !== 'null' ? value : null }}
            data-cy="sex"
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
            onChange={onHandleQueryChange}
            value={query}
          />
          <span className="icon is-left">
            <i className="fas fa-search" aria-hidden="true" />
          </span>
        </p>
      </div>

      <div className="panel-block" data-cy="CenturyFilter">
        <div className="level is-flex-grow-1 is-mobile">
          {CENTURIES_FILTERS.map(century => {
            const isActive = selectedCenturies.includes(century);
            const updated = isActive
              ? selectedCenturies.filter(c => c !== century)
              : [...selectedCenturies, century];

            return (
              <SearchLink
                key={century}
                data-cy="century"
                className={classNames('button mr-1', { 'is-info': isActive })}
                params={{ centuries: updated.length ? updated : null }}
              >
                {century}
              </SearchLink>
            );
          })}

          <SearchLink
            data-cy="centuryALL"
            className={classNames('button is-success', {
              'is-outlined': selectedCenturies.length > 0,
            })}
            params={{ centuries: null }}
          >
            All
          </SearchLink>
        </div>
      </div>

      <div className="panel-block">
        <SearchLink
          className="button is-link is-outlined is-fullwidth"
          params={{ centuries: null, sex: null, query: null, personSlug: null }}
        >
          Reset all filters
        </SearchLink>
      </div>
    </nav>
  );
};
