import { useSearchParams } from 'react-router-dom';
import { memo, useCallback, useEffect, useMemo } from 'react';
import cn from 'classnames';

import { PAGES_NUMBERS } from '../constans';
import { getPages } from '../services/people';
import { getSearchWith } from '../utils/searchHelper';
import { filterForPeople } from '../utils/worksWithPeople';

import { SearchLink } from './SearchLink';
import { OptionsPanel, Person, Sex } from '../types';

interface Props {
  people: Person[];
  onPeople: (people: Person[]) => void;
}

export const PeopleFilters: React.FC<Props> = memo(
  function PeopleFiltersComponent({ people, onPeople }) {
    const [searchParams, setSearchParams] = useSearchParams();
    const query = searchParams.get(OptionsPanel.QUERY) || '';
    const sex = searchParams.get(OptionsPanel.SEX) || '';
    const centuries = useMemo(
      () => searchParams.getAll(OptionsPanel.CENTURIES) || [],
      [searchParams],
    );

    const filteredPeople = useCallback(
      () => onPeople(filterForPeople(people, query, centuries, sex)),
      [centuries, onPeople, people, query, sex],
    );

    useEffect(() => filteredPeople(), [filteredPeople]);

    return (
      <nav className="panel">
        <p className="panel-heading">Filters</p>

        <p className="panel-tabs" data-cy="SexFilter">
          <SearchLink
            className={cn({ 'is-active': !sex })}
            params={{
              sex: null,
            }}
          >
            All
          </SearchLink>
          <SearchLink
            className={cn({ 'is-active': sex === Sex.WOMAN })}
            params={{
              sex: Sex.WOMAN,
            }}
          >
            Male
          </SearchLink>
          <SearchLink
            className={cn({ 'is-active': sex === Sex.MAN })}
            params={{
              sex: Sex.MAN,
            }}
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
              onChange={event =>
                setSearchParams(
                  getSearchWith(searchParams, {
                    query: event.target.value || null,
                  }),
                )
              }
            />

            <span className="icon is-left">
              <i className="fas fa-search" aria-hidden="true" />
            </span>
          </p>
        </div>

        <div className="panel-block">
          <div
            className="level is-flex-grow-1 is-mobile"
            data-cy="CenturyFilter"
          >
            <div className="level-left">
              {PAGES_NUMBERS.map(page => (
                <SearchLink
                  key={page}
                  params={{
                    centuries: getPages(centuries, page),
                  }}
                  className={cn('button mr-1', {
                    'is-info': centuries.includes(page),
                  })}
                >
                  {page}
                </SearchLink>
              ))}
            </div>

            <div className="level-right ml-4">
              <SearchLink
                params={{
                  centuries: [],
                }}
                data-cy="centuryALL"
                className={cn('button is-success', {
                  'is-outlined': !!centuries.length,
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
              centuries: [],
              query: null,
              sex: null,
            }}
            className="button is-link is-outlined is-fullwidth"
          >
            Reset all filters
          </SearchLink>
        </div>
      </nav>
    );
  },
);
