import { ChangeEvent } from 'react';
import { useSearchParams } from 'react-router-dom';
import classNames from 'classnames';

import { SearchLink } from '../SearchLink';
import { SexSearchLink } from './SexSearchLink';
import { CenturySearchLink } from './CenturySearchLink';

import { centuries } from './filter.constants';

export const PeopleFilter = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const query = searchParams.get('query') || '';
  const selectedCenturies = searchParams.getAll('centuries');

  const handleQueryChange = (event: ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value.trimStart();

    if (value) {
      searchParams.set('query', value);
    } else {
      searchParams.delete('query');
    }

    setSearchParams(searchParams);
  };

  return (
    <nav className="panel">
      <p className="panel-heading">Filters</p>

      <p className="panel-tabs" data-cy="SexFilter">
        <SexSearchLink sex={null}>
          All
        </SexSearchLink>

        <SexSearchLink sex="m">
          Male
        </SexSearchLink>

        <SexSearchLink sex="f">
          Female
        </SexSearchLink>
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
            {centuries.map(century => (
              <CenturySearchLink key={century} century={century}>
                {century}
              </CenturySearchLink>
            ))}

          </div>

          <div className="level-right ml-4">
            <SearchLink
              data-cy="centuryALL"
              className={classNames(
                'button is-success',
                { 'is-outlined': !!selectedCenturies.length },
              )}
              params={{
                centuries: null,
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
            centuries: null,
          }}
        >
          Reset all filters
        </SearchLink>
      </div>
    </nav>
  );
};
