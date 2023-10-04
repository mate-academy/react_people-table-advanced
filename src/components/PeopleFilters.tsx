import { useSearchParams } from 'react-router-dom';
import classNames from 'classnames';
import { SearchLink } from './SearchLink';
import { getSearchWith } from '../utils/searchHelper';
import { ALL_CENTURIES, FEMALE_SEX, MALE_SEX } from '../utils/constants';

export const PeopleFilters = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const sexFilter = searchParams.get('sex');
  const centuriesFilter = searchParams.getAll('centuries');
  const query = searchParams.get('query') as string;

  const handleChange: React.ChangeEventHandler<HTMLInputElement> = (event) => {
    setSearchParams(getSearchWith(searchParams, {
      query: event.target.value || null,
    }));
  };

  return (
    <nav className="panel">
      <p className="panel-heading">Filters</p>

      <p className="panel-tabs" data-cy="SexFilter">
        <SearchLink
          className={classNames({
            'is-active': sexFilter === null,
          })}
          params={{ sex: null }}
        >
          All
        </SearchLink>
        <SearchLink
          className={classNames({
            'is-active': sexFilter === MALE_SEX,
          })}
          params={{ sex: MALE_SEX }}
        >
          Male
        </SearchLink>
        <SearchLink
          className={classNames({
            'is-active': sexFilter === FEMALE_SEX,
          })}
          params={{ sex: FEMALE_SEX }}
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
            onChange={handleChange}
          />

          <span className="icon is-left">
            <i className="fas fa-search" aria-hidden="true" />
          </span>
        </p>
      </div>

      <div className="panel-block">
        <div className="level is-flex-grow-1 is-mobile" data-cy="CenturyFilter">
          <div className="level-left">
            {ALL_CENTURIES.map(century => {
              const isCenturyIncluded = centuriesFilter.includes(century);
              const updatedCenturies = isCenturyIncluded
                ? centuriesFilter.filter(cent => cent !== century)
                : [...centuriesFilter, century];

              return (
                <SearchLink
                  key={century}
                  data-cy="century"
                  className={classNames('button', 'mr-1', {
                    'is-info': centuriesFilter.includes(century),
                  })}
                  params={{
                    centuries: updatedCenturies,
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
