import React from 'react';
import cn from 'classnames';
import { SexType } from '../../types/SexType';
import { SearchLink } from '../../utils/SearchLink';
import { SearchParams } from '../../utils/searchHelper';

type Props = {
  sex: string,
  centuries: string[],
  value: string,
  onAddCentury: (age: string) => SearchParams,
  onChangeValue: (event: React.ChangeEvent<HTMLInputElement>) => void,
};

export const PeopleFilters: React.FC<Props> = ({
  sex,
  centuries,
  value,
  onAddCentury,
  onChangeValue,
}) => (
  <nav className="panel">
    <p className="panel-heading">Filters</p>

    <p className="panel-tabs" data-cy="SexFilter">
      <SearchLink
        params={{ sex: null }}
        className={cn({
          'is-active': sex === '',
        })}
      >
        All
      </SearchLink>

      <SearchLink
        params={{ sex: SexType.MALE }}
        className={cn({
          'is-active': sex === SexType.MALE,
        })}
      >
        Male
      </SearchLink>
      <SearchLink
        params={{ sex: SexType.FEMALE }}
        className={cn({
          'is-active': sex === SexType.FEMALE,
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
          value={value}
          onChange={onChangeValue}
        />

        <span className="icon is-left">
          <i className="fas fa-search" aria-hidden="true" />
        </span>
      </p>
    </div>

    <div className="panel-block">
      <div className="level is-flex-grow-1 is-mobile" data-cy="CenturyFilter">
        <div className="level-left">
          {[16, 17, 18, 19, 20].map(num => (
            <SearchLink
              params={onAddCentury(num.toString())}
              key={num}
              data-cy="century"
              className={cn('button mr-1', {
                'is-info': centuries.includes(num.toString()),
              })}
            >
              {num}
            </SearchLink>
          ))}
        </div>

        <div className="level-right ml-4">
          <SearchLink
            params={{ centuries: null }}
            data-cy="centuryALL"
            className={cn('button is-success', {
              'is-outlined': centuries.length !== 0,
            })}
          >
            All
          </SearchLink>
        </div>
      </div>
    </div>

    <div className="panel-block">
      <SearchLink
        params={{
          sex: null,
          value: null,
          centuries: null,
        }}
        className="button is-link is-outlined is-fullwidth"
      >
        Reset all filters
      </SearchLink>
    </div>
  </nav>
);
