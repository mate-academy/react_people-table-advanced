import { FC, ChangeEvent } from 'react';

import { useSearchParams } from 'react-router-dom';

import classNames from 'classnames';
import { FilterValues } from '../utils/helpers';
import { SearchLink } from './SearchLink';
import { getSearchWith } from '../utils/searchHelper';

const centuriesArray = ['16', '17', '18', '19', '20'];

type Props = {
  sex: string;
  query: string;
  centuries: string[];
};

export const PeopleFilters: FC<Props> = ({
  sex,
  query,
  centuries,
}) => {
  const [searchParams, setSearchParams] = useSearchParams();

  const handleChangeQuery = (event: ChangeEvent<HTMLInputElement>) => {
    setSearchParams(
      getSearchWith(searchParams, { query: event.target.value || null }),
    );
  };

  const getSelectedCenturies = (currentCentury: string) => ({
    centuries: centuries.includes(currentCentury)
      ? centuries.filter(c => c !== currentCentury)
      : [...centuries, currentCentury],
  });

  const resetAllParams = {
    sex: null,
    query: null,
    centuries: [],
  };

  return (
    <nav className="panel">
      <p className="panel-heading">Filters</p>

      <p className="panel-tabs" data-cy="SexFilter">
        {Object.values(FilterValues).map((value) => (
          <SearchLink
            key={value}
            params={{ sex: value === FilterValues.ALL ? null : value }}
            className={classNames({
              'is-active': sex === value
              || (!searchParams.get('sex') && value === 'All'),
            })}
          >
            {value}
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
            onChange={handleChangeQuery}
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
                key={century}
                params={getSelectedCenturies(century)}
                data-cy="century"
                className={classNames('button', 'mr-1', {
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
          params={resetAllParams}
        >
          Reset all filters
        </SearchLink>
      </div>
    </nav>
  );
};
