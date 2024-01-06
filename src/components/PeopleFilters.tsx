import { ChangeEvent } from 'react';
import { useSearchParams } from 'react-router-dom';
import classNames from 'classnames';

import {
  Centuries, PersonSex, SearchParams, EMPTY_FILTERS,
} from '../enums';
import { getSearchWith } from '../utils';
import { SearchParamsType } from '../types';
import { SearchLink } from './SearchLink';

export const PeopleFilters: React.FC = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const query = searchParams.get(SearchParams.Query) || '';
  const sex = searchParams.get(SearchParams.Sex) || '';
  const centuries = searchParams.getAll(SearchParams.Centuries);

  const setSearchWith = (params: SearchParamsType) => {
    const search = getSearchWith(searchParams, params);

    setSearchParams(search);
  };

  const handleQueryChange = (event: ChangeEvent<HTMLInputElement>) => {
    setSearchWith({
      [SearchParams.Query]: event.target.value || null,
    });
  };

  const getCenturySearchParams = (century: Centuries) => {
    const centuriesSearchParams = centuries.includes(century)
      ? centuries.filter(item => item !== century)
      : [...centuries, century];

    return {
      [SearchParams.Centuries]: centuriesSearchParams as Centuries[],
    };
  };

  return (
    <nav className="panel">
      <p className="panel-heading">Filters</p>

      <p className="panel-tabs" data-cy="SexFilter">
        {Object.entries(PersonSex).map(([key, value]) => (
          <SearchLink
            key={key}
            params={{ [SearchParams.Sex]: value || null }}
            className={classNames({ 'is-active': value === sex })}
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
            {Object.values(Centuries).map((century) => (
              <SearchLink
                key={century}
                params={getCenturySearchParams(century)}
                data-cy="century"
                className={classNames('button mr-1', {
                  'is-info': centuries.includes(century),
                })}
              >
                {century}
              </SearchLink>
            ))}
          </div>

          <div className="level-right ml-4">
            <SearchLink
              params={{ [SearchParams.Centuries]: null }}
              data-cy="centuryALL"
              className={classNames('button is-success', {
                'is-outlined': centuries.length,
              })}
            >
              All
            </SearchLink>
          </div>
        </div>
      </div>

      <div className="panel-block">
        <SearchLink
          params={EMPTY_FILTERS}
          className="button is-link is-outlined is-fullwidth"
        >
          Reset all filters
        </SearchLink>
      </div>
    </nav>
  );
};
