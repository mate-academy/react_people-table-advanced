import { URLSearchParamsInit } from 'react-router-dom';
import classNames from 'classnames';
import { Centuries } from '../utils/centuries';
import { Sex } from '../types/Sex';
import { SearchLink } from './SearchLink';
import { getSearchWith } from '../utils/searchHelper';

type Props = {
  searchParams: URLSearchParams;
  setSearchParams: (newParams: URLSearchParamsInit,
    navigateOptions?: {
      replace?: boolean;
      state?: unknown;
    } | undefined) => void;
  query: string;
  sex: string;
  centuries: string[];
};

export const PeopleFilters: React.FC<Props> = ({
  searchParams,
  setSearchParams,
  query,
  sex,
  centuries,
}) => {
  const onInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.value.trim()) {
      return;
    }

    setSearchParams(
      getSearchWith(searchParams, { query: e.target.value || null }),
    );
  };

  return (
    <nav className="panel">
      <p className="panel-heading">Filters</p>

      <p className="panel-tabs" data-cy="SexFilter">

        <SearchLink
          params={{ sex: null }}
          className={classNames(
            { 'is-active': !sex },
          )}
        >
          {Sex.ALL}
        </SearchLink>
        <SearchLink
          params={{ sex: 'm' }}
          className={classNames(
            { 'is-active': sex === 'm' },
          )}
        >
          {Sex.MALE}
        </SearchLink>
        <SearchLink
          params={{ sex: 'f' }}
          className={classNames(
            { 'is-active': sex === 'f' },
          )}
        >
          {Sex.FEMALE}
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
            onChange={onInputChange}
          />

          <span className="icon is-left">
            <i className="fas fa-search" aria-hidden="true" />
          </span>
        </p>
      </div>

      <div className="panel-block">
        <div className="level is-flex-grow-1 is-mobile" data-cy="CenturyFilter">
          <div className="level-left">
            {Centuries.map(century => (
              <SearchLink
                key={century}
                params={{
                  centuries: centuries.includes(century.toString())
                    ? centuries.filter(c => c !== century.toString())
                    : [...centuries, century],
                }}
                data-cy="century"
                className={classNames('button', 'mr-1',
                  { 'is-info': centuries.includes(century.toString()) })}
              >
                {century}
              </SearchLink>
            ))}

            <div className="level-right ml-4">
              <SearchLink
                params={{
                  centuries: null,
                }}
                data-cy="centuryALL"
                className={classNames(
                  'button',
                  { 'is-success': !centuries.length },
                  { 'is-outlined': centuries.length },
                )}
              >
                All
              </SearchLink>
            </div>
          </div>
        </div>
      </div>

      <div className="panel-block">
        <SearchLink
          params={{
            sex: null,
            query: null,
            centuries: null,
          }}
          className="button is-link is-outlined is-fullwidth"
        >
          Reset all filters
        </SearchLink>
      </div>
    </nav>
  );
};
