import { useSearchParams } from 'react-router-dom';
import cn from 'classnames';
import { SearchLink } from './SearchLink';
import { getSearchWith } from '../utils/searchHelper';
import { SearchParam } from '../types/SearchParam';

const CENTURIES = ['16', '17', '18', '19', '20'];

export const PeopleFilters = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const sex = searchParams.get(SearchParam.sex);
  const centuriesParams = searchParams.getAll(SearchParam.centuries);

  const queryChangeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchParams(
      getSearchWith(searchParams, {
        query: e.target.value || null,
      }),
    );
  };

  const getSearchLinkParams = (century: string) => {
    const centuries = centuriesParams.includes(century)
      ? centuriesParams.filter(cent => cent !== century)
      : [...centuriesParams, century];

    return {
      centuries,
    };
  };

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
          className={cn({ 'is-active': sex === 'm' })}
          params={{ sex: 'm' }}
        >
          Male
        </SearchLink>
        <SearchLink
          className={cn({ 'is-active': sex === 'f' })}
          params={{ sex: 'f' }}
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
            onChange={queryChangeHandler}
          />

          <span className="icon is-left">
            <i className="fas fa-search" aria-hidden="true" />
          </span>
        </p>
      </div>

      <div className="panel-block">
        <div className="level is-flex-grow-1 is-mobile" data-cy="CenturyFilter">
          <div className="level-left">
            {CENTURIES.map(century => (
              <SearchLink
                data-cy="century"
                key={century}
                className={cn(
                  'button mr-1',
                  {
                    'is-info': centuriesParams.includes(century),
                  },
                )}
                params={getSearchLinkParams(century)}
              >
                {century}
              </SearchLink>
            ))}

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
