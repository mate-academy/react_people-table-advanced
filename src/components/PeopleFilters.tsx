import cn from 'classnames';
import { useSearchParams } from 'react-router-dom';
import { SearchLink } from './SearchLink';
import { getSearchWith } from '../utils/searchHelper';
import { Sex, SearchField, SortParam } from '../types';

type Centuries = '16' | '17' | '18' | '19' | '20';

const centuriesList: Centuries[] = ['16', '17', '18', '19', '20'];

export const PeopleFilters = () => {
  const [searchParams, setSearchParams] = useSearchParams();

  const handleInputQuery = (query: string) => setSearchParams(getSearchWith(
    searchParams,
    { query: query.trimStart() || null },
  ));

  return (
    <nav className="panel">
      <p className="panel-heading">Filters</p>

      <p className="panel-tabs" data-cy="SexFilter">
        <SearchLink
          className={cn({
            'is-active': !searchParams.get(SortParam.Sex),
          })}
          params={{ sex: null }}
        >
          All
        </SearchLink>
        <SearchLink
          className={cn({
            'is-active': searchParams.get(SortParam.Sex) === Sex.male,
          })}
          params={{ sex: Sex.male }}
        >
          Male
        </SearchLink>
        <SearchLink
          className={cn({
            'is-active': searchParams.get(SortParam.Sex) === Sex.female,
          })}
          params={{ sex: Sex.female }}
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
            value={searchParams.get('query') || ''}
            onChange={(event) => handleInputQuery(event.target.value)}
          />

          <span className="icon is-left">
            <i className="fas fa-search" aria-hidden="true" />
          </span>
        </p>
      </div>

      <div className="panel-block">
        <div className="level is-flex-grow-1 is-mobile" data-cy="CenturyFilter">
          <div className="level-left">
            {centuriesList.map(century => (
              <SearchLink
                key={century}
                data-cy="century"
                className={cn('button', 'mr-1', {
                  'is-info': searchParams.getAll(SearchField.Centuries)
                    .includes(century),
                })}
                params={{
                  centuries:
                    !searchParams.getAll(SearchField.Centuries)
                      .includes(century)
                      ? [...searchParams.getAll(SearchField.Centuries), century]
                      : searchParams.getAll(SearchField.Centuries)
                        .filter(c => c !== century),
                }}
              >
                {century}
              </SearchLink>
            ))}
          </div>

          <div className="level-right ml-4">
            <SearchLink
              data-cy="centuryALL"
              className={cn('button', 'is-success',
                { 'is-outlined': searchParams.get(SearchField.Centuries) })}
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
