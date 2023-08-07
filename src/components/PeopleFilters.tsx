import React from 'react';
import classNames from 'classnames';

import { SearchLink } from './SearchLink';
import { Sex } from '../types/Sex';

type Props = {
  sex: Sex,
  handleSexChange: (
    event: React.MouseEvent<HTMLAnchorElement, MouseEvent>
  ) => void,
  query: string,
  handleQueryChange: (
    event: React.ChangeEvent<HTMLInputElement>
  ) => void,
  centuries: string[],
  toggleCenturies: (
    param: string,
  ) => void,
};

export const PeopleFilters: React.FC<Props> = ({
  handleSexChange,
  sex,
  query,
  handleQueryChange,
  centuries,
  toggleCenturies,
}) => {
  return (
    <nav className="panel">
      <p className="panel-heading">
        Filters
      </p>

      <p className="panel-tabs" data-cy="SexFilter">
        <SearchLink
          params={{ sex: null }}
          onClick={handleSexChange}
          className={classNames(
            {
              'is-active': sex === Sex.None,
            },
          )}
        >
          All
        </SearchLink>

        <SearchLink
          params={{ sex: Sex.M }}
          onClick={handleSexChange}
          className={classNames(
            {
              'is-active': sex === Sex.M,
            },
          )}
        >
          Male
        </SearchLink>

        <SearchLink
          params={{ sex: Sex.F }}
          onClick={handleSexChange}
          className={classNames(
            {
              'is-active': sex === Sex.F,
            },
          )}
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
            {['16', '17', '18', '19', '20'].map(century => (
              <SearchLink
                data-cy="century"
                className={classNames(
                  'button mr-1',
                  {
                    'is-info': centuries.includes(century),
                  },
                )}
                params={
                  {
                    centuries: centuries.includes(century)
                      ? centuries.filter(character => century !== character)
                      : [...centuries, century],
                  }
                }
                onClick={() => toggleCenturies(century)}
                key={century}
              >
                {century}
              </SearchLink>
            ))}
          </div>

          <div className="level-right ml-4">
            <SearchLink
              data-cy="centuryALL"
              className={classNames(
                'button is-success',
                {
                  'is-outlined': centuries.length,
                },
              )}
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
          params={{
            sex: null,
            query: null,
            centuries: null,
          }}
        >
          Reset all filters
        </SearchLink>
      </div>
    </nav>
  );
};
