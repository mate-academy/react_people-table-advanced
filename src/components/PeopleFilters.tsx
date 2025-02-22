import { SetURLSearchParams } from 'react-router-dom';
import { Sex } from '../types/SexType';
import { SearchLink } from './SearchLink';
import classNames from 'classnames';
import { getSearchWith } from '../utils/searchHelper';
import { Century } from '../types/Century';

type Props = {
  searchParams: URLSearchParams;
  setSearchParams: SetURLSearchParams;
};

export const PeopleFilters: React.FC<Props> = ({
  searchParams,
  setSearchParams,
}) => {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const setSearchWith = (params: any) => {
    const search = getSearchWith(searchParams, params);

    setSearchParams(search);
  };

  const handleQueryChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchWith({ query: event.target.value || null });
  };

  const centuries = searchParams.getAll('centuries') || [];

  return (
    <nav className="panel">
      <p className="panel-heading">Filters</p>

      <p className="panel-tabs" data-cy="SexFilter">
        {Object.entries(Sex).map(([type, value]) => {
          return (
            <SearchLink
              key={type}
              className={classNames({
                'is-active': searchParams.has('sex')
                  ? searchParams.get('sex') === value
                  : value === Sex.All,
              })}
              params={{ sex: value || null }}
            >
              {type}
            </SearchLink>
          );
        })}
      </p>

      <div className="panel-block">
        <p className="control has-icons-left">
          <input
            data-cy="NameFilter"
            type="search"
            className="input"
            onChange={handleQueryChange}
            placeholder="Search"
          />

          <span className="icon is-left">
            <i className="fas fa-search" aria-hidden="true" />
          </span>
        </p>
      </div>

      <div className="panel-block">
        <div className="level is-flex-grow-1 is-mobile" data-cy="CenturyFilter">
          <div className="level-left">
            {Object.values(Century).map(century => {
              return (
                <SearchLink
                  key={century}
                  data-cy="century"
                  className={classNames('button mr-1', {
                    'is-info': centuries.includes(century),
                  })}
                  params={{
                    centuries: centuries.includes(century)
                      ? centuries.filter(ch => century !== ch)
                      : [...centuries, century],
                  }}
                >
                  {century}
                </SearchLink>
              );
            })}
          </div>
          <div className="level-right ml-4">
            <SearchLink
              data-cy="centuryALL"
              className={classNames('button is-success', {
                'is-outlined': centuries.length,
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
          params={{ centuries: null, query: null, sex: null }}
        >
          Reset all filters
        </SearchLink>
      </div>
    </nav>
  );
};
