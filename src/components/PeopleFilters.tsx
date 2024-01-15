/* eslint-disable jsx-a11y/anchor-is-valid */
import { Link, useSearchParams } from 'react-router-dom';
import cn from 'classnames';
import { getSearchWith } from '../utils/searchHelper';
import { SearchLink } from './SearchLink';

const CENTURIES = ['16', '17', '18', '19', '20'];

enum Gender {
  MALE = 'm',
  FEMALE = 'f',
}

export const PeopleFilters: React.FC = () => {
  const [searchParams, setSearchParams] = useSearchParams();

  const selectCenturies = searchParams.getAll('centuries') || [];
  const query = searchParams.get('query') || '';
  const sex = searchParams.get('sex') || '';

  const handleSetQuery = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchParams(
      getSearchWith(searchParams, { query: event.target.value || null }),
    );
  };

  const getUpdatedCenturies = (century: string) => {
    return selectCenturies.includes(century)
      ? selectCenturies.filter(
        selectCentury => selectCentury !== century,
      )
      : [...selectCenturies, century];
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
          className={cn({ 'is-active': sex === Gender.MALE })}
          params={{ sex: Gender.MALE }}
        >
          Male
        </SearchLink>

        <SearchLink
          className={cn({ 'is-active': sex === Gender.FEMALE })}
          params={{ sex: Gender.FEMALE }}
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
            onChange={handleSetQuery}
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
                params={{ centuries: getUpdatedCenturies(century) }}
                data-cy="century"
                key={century}
                className={cn(
                  'button mr-1',
                  { 'is-info': selectCenturies.includes(century) },
                )}
              >
                {century}
              </SearchLink>
            ))}
          </div>

          <div className="level-right ml-4">
            <Link
              data-cy="centuryALL"
              className={cn(
                'button is-success',
                selectCenturies.length ? 'is-outlined' : '',
              )}
              to=""
            >
              All
            </Link>
          </div>
        </div>
      </div>

      <div className="panel-block">
        <Link
          className="button is-link is-outlined is-fullwidth"
          to=""
        >
          Reset all filters
        </Link>
      </div>
    </nav>
  );
};
