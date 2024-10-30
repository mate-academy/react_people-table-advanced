import { ChangeEvent, FC } from 'react';
import cn from 'classnames';

import { SEX_OPTIONS, CENTURIES } from '../../Constants';
import { SearchLink } from '../SearcLink';

type Props = {
  activeSex: string | null;
  query: string;
  onQueryChange: (event: ChangeEvent<HTMLInputElement>) => void;
  onSexChange: (value: string | null) => void;
  getCenturiesParams: (selectedCentury: string) => string[];
  centuries: string[];
};

export const PeopleFilters: FC<Props> = ({
  activeSex,
  query,
  onQueryChange,
  onSexChange,
  getCenturiesParams,
  centuries,
}) => {
  return (
    <nav className="panel">
      <p className="panel-heading">Filters</p>

      <p className="panel-tabs" data-cy="SexFilter">
        {SEX_OPTIONS.map(sex => (
          <SearchLink
            key={sex.name}
            params={{ sex: sex.value }}
            className={cn({
              'is-active':
                sex.value === activeSex ||
                (sex.value === '' && activeSex === null),
            })}
            onClick={() => onSexChange(sex.value === 'All' ? null : sex.value)}
          >
            {sex.name}
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
            value={query}
            onChange={onQueryChange}
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
                params={{
                  centuries: getCenturiesParams(century),
                }}
                className={cn('button mr-1', {
                  'is-info': centuries.includes(century),
                })}
              >
                {century}
              </SearchLink>
            ))}
          </div>

          <div className="level-right ml-4">
            <SearchLink
              data-cy="centuryALL"
              className={cn('button is-success', {
                'is-outlined': centuries.length !== 0,
              })}
              params={{ centuries: null }}
            >
              All
            </SearchLink>
          </div>
        </div>
      </div>

      <div className="panel-block">
        <SearchLink
          className={cn('button is-link is-outlined is-fullwidth', {
            'is-outlined':
              activeSex === null && !centuries.length && query === '',
          })}
          params={{ activeSex: null, centuries: null, query: null }}
        >
          Reset all filters
        </SearchLink>
      </div>
    </nav>
  );
};
