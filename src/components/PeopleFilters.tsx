import classNames from 'classnames';
import { useSearchParams } from 'react-router-dom';
import { getSearchWith } from '../utils/searchHelper';
import { SearchLink } from './SearchLink';

enum SexFilter {
  male = 'm',
  female = 'f',
}

const centuriesArr: string[] = ['16', '17', '18', '19', '20'];

export const PeopleFilters = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const queryParam = searchParams.get('query') || '';
  const centuriesParam = searchParams.getAll('centuries') || [];
  const sexParam = searchParams.get('sex');

  const queryChangeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    const params = getSearchWith(
      searchParams, { query: e.target.value ? e.target.value : null },
    );

    setSearchParams(params);
  };

  const toggleCentury = (century: string) => {
    const newCenturiesParam = centuriesParam.includes(century)
      ? centuriesParam.filter(cent => cent !== century)
      : [...centuriesParam, century];

    return newCenturiesParam;
  };

  return (
    <nav className="panel">
      <p className="panel-heading">Filters</p>

      <p className="panel-tabs" data-cy="SexFilter">
        <SearchLink
          className={classNames({
            'is-active': sexParam === null,
          })}
          params={{ sex: null }}
        >
          All
        </SearchLink>

        <SearchLink
          className={classNames({
            'is-active': sexParam === SexFilter.male,
          })}
          params={{ sex: SexFilter.male }}
        >
          Male
        </SearchLink>

        <SearchLink
          className={classNames({
            'is-active': sexParam === SexFilter.female,
          })}
          params={{ sex: SexFilter.female }}
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
            value={queryParam}
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
            {centuriesArr.map((century) => (
              <SearchLink
                key={century}
                data-cy="century"
                className={classNames(
                  'button mr-1',
                  { 'is-info': centuriesParam.includes(century) },
                )}
                params={{ centuries: toggleCentury(century) }}
              >
                {century}
              </SearchLink>
            ))}
          </div>

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

      <div className="panel-block">
        <a
          className="button is-link is-outlined is-fullwidth"
          href="#/people"
        >
          Reset all filters
        </a>
      </div>
    </nav>
  );
};
