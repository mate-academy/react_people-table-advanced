import { FC } from 'react';
import cn from 'classnames';
import { SearchLink } from './SearchLink';
import { Gender } from '../types';

type Props = {
  query: string;
  handleQueryChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  sex: string;
  centuries: string[];
  handleCenturiesChange: (par: string) => string[];
  resetAll: () => {
    centuries: null,
    query: null,
    sex: null,
    sort: null,
    order: null,
  };
};

export const PeopleFilters: FC<Props> = ({
  query,
  handleQueryChange,
  sex,
  centuries,
  handleCenturiesChange,
  resetAll,
}) => {
  const centuriesArray = ['16', '17', '18', '19', '20'];

  return (
    <nav className="panel">
      <p className="panel-heading">Filters</p>

      <p className="panel-tabs" data-cy="SexFilter">
        <SearchLink
          className={cn({ 'is-active': !sex })}
          params={{ sex: null }}
        >
          All
        </SearchLink>
        <SearchLink
          className={cn({ 'is-active': sex === Gender.MALE })}
          params={{ sex: Gender.MALE }}
        >
          Male
        </SearchLink>
        <SearchLink
          className={cn({ 'is-active': sex === Gender.FEMALE })}
          params={{ sex: Gender.FEMALE }}
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
          <div className="level-left">
            {centuriesArray.map((century) => (
              <SearchLink
                key={century}
                data-cy="century"
                className={cn('button mr-1', {
                  'is-info': centuries.includes(century),
                })}
                params={{ centuries: handleCenturiesChange(century) }}
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
          params={resetAll()}
        >
          Reset all filters
        </SearchLink>
      </div>
    </nav>
  );
};
