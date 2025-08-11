import React from 'react';
import { useSearchParams } from 'react-router-dom';
import { getSearchWith } from '../../utils/searchHelper';
import cn from 'classnames';
import { SearchLink } from '../SearchLink';

export const PeopleFilters = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const sex = searchParams.get('sex');
  const query = searchParams.get('query');
  const centuries = searchParams.getAll('centuries');

  const addNewCenturies = (century: string) => {
    return centuries.includes(century)
      ? centuries.filter(num => num !== century)
      : [...centuries, century];
  };

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchParams(
      getSearchWith(searchParams, { query: event.target.value || null }),
    );
  };

  const setCenturiesClassName = (century: string) => {
    return cn('button', 'mr-1', { 'is-info': centuries.includes(century) });
  };

  const setLinkClassName = (value: 'm' | 'f' | null) => {
    return cn({ 'is-active': sex === value });
  };

  return (
    <nav className="panel">
      <p className="panel-heading">Filters</p>

      <p className="panel-tabs" data-cy="SexFilter">
        <SearchLink params={{ sex: null }} className={setLinkClassName(null)}>
          All
        </SearchLink>

        <SearchLink params={{ sex: 'm' }} className={setLinkClassName('m')}>
          Male
        </SearchLink>

        <SearchLink params={{ sex: 'f' }} className={setLinkClassName('f')}>
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
            <SearchLink
              data-cy="century"
              className={setCenturiesClassName('16')}
              params={{ centuries: addNewCenturies('16') }}
            >
              16
            </SearchLink>

            <SearchLink
              data-cy="century"
              className={setCenturiesClassName('17')}
              params={{ centuries: addNewCenturies('17') }}
            >
              17
            </SearchLink>

            <SearchLink
              data-cy="century"
              className={setCenturiesClassName('18')}
              params={{ centuries: addNewCenturies('18') }}
            >
              18
            </SearchLink>

            <SearchLink
              data-cy="century"
              className={setCenturiesClassName('19')}
              params={{ centuries: addNewCenturies('19') }}
            >
              19
            </SearchLink>

            <SearchLink
              data-cy="century"
              className={setCenturiesClassName('20')}
              params={{ centuries: addNewCenturies('20') }}
            >
              20
            </SearchLink>
          </div>

          <div className="level-right ml-4">
            <SearchLink
              data-cy="centuryALL"
              className={cn('button is-success', {
                'is-outlined': centuries.length > 0,
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
          className="button is-link is-outlined is-fullwidth"
          params={{ sex: null, query: null, centuries: null }}
        >
          Reset all filters
        </SearchLink>
      </div>
    </nav>
  );
};
