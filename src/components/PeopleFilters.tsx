import { Link, useSearchParams } from 'react-router-dom';
import { getSearchWith } from '../utils/searchHelper';
import { SearchLink } from './SearchLink';
import classNames from 'classnames';

export const PeopleFilters = () => {
  const [searchParams, setSearchParams] = useSearchParams();

  const selectedCenturies = searchParams.getAll('centuries');
  const selectedSex = searchParams.get('sex');

  const handleQueryChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const query = event.target.value;

    setSearchParams(
      getSearchWith(searchParams, {
        query: query || null,
      }),
    );
  };

  const getCenturies = (century: string) => {
    if (selectedCenturies.includes(century)) {
      return selectedCenturies.filter(item => item !== century);
    }

    return [...selectedCenturies, century];
  };

  return (
    <nav className="panel">
      <p className="panel-heading">Filters</p>

      <p className="panel-tabs" data-cy="SexFilter">
        <SearchLink
          className={classNames({
            'is-active': selectedSex === null,
          })}
          params={{ sex: null }}
        >
          All
        </SearchLink>
        <SearchLink
          className={classNames({
            'is-active': selectedSex === 'm',
          })}
          params={{ sex: 'm' }}
        >
          Male
        </SearchLink>
        <SearchLink
          className={classNames({
            'is-active': selectedSex === 'f',
          })}
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
            value={searchParams.get('query') || ''}
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
            <SearchLink
              data-cy="century"
              className={classNames('button mr-1', {
                'is-info': selectedCenturies.includes('16'),
              })}
              params={{
                centuries: getCenturies('16'),
              }}
            >
              16
            </SearchLink>

            <SearchLink
              data-cy="century"
              className={classNames('button mr-1', {
                'is-info': selectedCenturies.includes('17'),
              })}
              params={{
                centuries: getCenturies('17'),
              }}
            >
              17
            </SearchLink>

            <SearchLink
              data-cy="century"
              className={classNames('button mr-1', {
                'is-info': selectedCenturies.includes('18'),
              })}
              params={{
                centuries: getCenturies('18'),
              }}
            >
              18
            </SearchLink>

            <SearchLink
              data-cy="century"
              className={classNames('button mr-1', {
                'is-info': selectedCenturies.includes('19'),
              })}
              params={{
                centuries: getCenturies('19'),
              }}
            >
              19
            </SearchLink>

            <SearchLink
              data-cy="century"
              className={classNames('button mr-1', {
                'is-info': selectedCenturies.includes('20'),
              })}
              params={{
                centuries: getCenturies('20'),
              }}
            >
              20
            </SearchLink>
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
        <Link to="/people" className="button is-link is-outlined is-fullwidth">
          Reset all filters
        </Link>
      </div>
    </nav>
  );
};
