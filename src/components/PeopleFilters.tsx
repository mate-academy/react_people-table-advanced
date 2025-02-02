import { ChangeEvent } from 'react';
import classNames from 'classnames';
import { useSearchParams } from 'react-router-dom';
import { getSearchWith, SearchParams } from '../utils/searchHelper';
import { SexTypeEnum } from '../types';
import { SearchLink } from './SearchLink';

export const PeopleFilters = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const query = searchParams.get('query') || '';
  const sex = searchParams.get('sex') as SexTypeEnum | null;
  const centuries = searchParams.getAll('centuries');

  const setSearchWith = (params: SearchParams) => {
    const search = getSearchWith(searchParams, params);

    setSearchParams(search);
  };

  const handleQueryChange = (event: ChangeEvent<HTMLInputElement>) => {
    const newValue = event.target.value.trim();

    setSearchWith({ query: newValue !== '' ? newValue : null });
  };

  const getCenturiesParams = (century: string) => {
    return centuries.includes(century)
      ? centuries.filter(c => c !== century)
      : [...centuries, century];
  };

  return (
    <nav className="panel">
      <p className="panel-heading">Filters</p>

      <p className="panel-tabs" data-cy="SexFilter">
        <SearchLink
          data-cy="SexFilter"
          params={{ sex: null }}
          className={classNames('', { 'is-active': sex === null })}
        >
          All
        </SearchLink>

        <SearchLink
          data-cy="SexFilter"
          params={{ sex: SexTypeEnum.MALE }}
          className={classNames('', { 'is-active': sex === SexTypeEnum.MALE })}
        >
          Male
        </SearchLink>

        <SearchLink
          data-cy="SexFilter"
          params={{ sex: SexTypeEnum.FEMALE }}
          className={classNames('', {
            'is-active': sex === SexTypeEnum.FEMALE,
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
                key={century}
                params={{ centuries: getCenturiesParams(century) }}
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
              data-cy="centuryALL"
              params={{ centuries: null }}
              className={classNames('button is-success', {
                'is-outlined': centuries.length > 0,
              })}
            >
              All
            </SearchLink>
          </div>
        </div>
      </div>

      <div className="panel-block">
        <SearchLink
          params={{ sex: null, query: null, centuries: [] }}
          className="button is-link is-outlined is-fullwidth"
        >
          Reset all filters
        </SearchLink>
      </div>
    </nav>
  );
};
