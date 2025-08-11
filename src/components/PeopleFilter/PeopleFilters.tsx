import { ChangeEvent, FC } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import cn from 'classnames';

import { getSearchWith } from '../../utils/searchHelper';

import { SEX_FILTER_VALUES, CENTURIES } from '../../constants/constants';

import { SearchLink } from '../';

export const PeopleFilters: FC = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const query = searchParams.get('query') || '';
  const sex = searchParams.get('sex');
  const century = searchParams.getAll('century') || [];

  const handleQueryChange = (event: ChangeEvent<HTMLInputElement>) => {
    setSearchParams(
      getSearchWith(searchParams, {
        query: event.target.value.trimStart() || '',
      }),
    );
  };

  return (
    <nav className="panel">
      <p className="panel-heading">Filters</p>

      <p className="panel-tabs" data-cy="SexFilter">
        {SEX_FILTER_VALUES.map(status => (
          <SearchLink
            key={status.title}
            params={{ sex: status.value }}
            className={cn({ 'is-active': status.value === sex })}
          >
            {status.title}
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
            {CENTURIES.map(currentCentury => (
              <SearchLink
                data-cy="century"
                key={currentCentury}
                className={cn('button mr-1', {
                  'is-info': century.includes(currentCentury),
                })}
                params={{
                  century: century.includes(currentCentury)
                    ? century.filter(curr => curr !== currentCentury)
                    : [...century, currentCentury],
                }}
              >
                {currentCentury}
              </SearchLink>
            ))}
          </div>

          <div className="level-right ml-4">
            <SearchLink
              data-cy="centuryALL"
              className={cn('button is-success ', {
                'is-outlined': century.length !== 0,
              })}
              params={{ century: [] }}
            >
              All
            </SearchLink>
          </div>
        </div>
      </div>

      <div className="panel-block">
        <Link className="button is-link is-outlined is-fullwidth" to="/people">
          Reset all filters
        </Link>
      </div>
    </nav>
  );
};
