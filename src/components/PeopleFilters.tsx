import { useSearchParams } from 'react-router-dom';
import { getSearchWith } from '../utils/searchHelper';
import { SearchLink } from './SearchLink';
import classNames from 'classnames';

export const PeopleFilters = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const query = searchParams.get('query') || '';
  const sex = searchParams.get('sex');
  const selectedCenturies = searchParams.getAll('centuries');

  const handleQueryChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const newQuery = event.target.value;

    setSearchParams(
      getSearchWith(searchParams, {
        query: newQuery || null,
      }),
    );
  };

  const toggleCentrury = (century: string) => {
    const newCenturies = selectedCenturies.includes(century)
      ? selectedCenturies.filter(c => c !== century)
      : [...selectedCenturies, century];

    return { centuries: newCenturies.length ? newCenturies : null };
  };

  return (
    <nav className="panel">
      <p className="panel-heading">Filters</p>

      <p className="panel-tabs" data-cy="SexFilter">
        <SearchLink
          params={{ sex: null }}
          className={classNames({ 'is-active': sex === null })}
        >
          All
        </SearchLink>

        <SearchLink
          params={{ sex: 'm' }}
          className={classNames({ 'is-active': sex === 'm' })}
        >
          Male
        </SearchLink>

        <SearchLink
          params={{ sex: 'f' }}
          className={classNames({ 'is-active': sex === 'f' })}
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
            <SearchLink
              params={toggleCentrury('16')}
              className={classNames('button mr-1', {
                'is-info': selectedCenturies.includes('16'),
              })}
            >
              16
            </SearchLink>

            <SearchLink
              params={toggleCentrury('17')}
              className={classNames('button mr-1', {
                'is-info': selectedCenturies.includes('17'),
              })}
            >
              17
            </SearchLink>

            <SearchLink
              params={toggleCentrury('18')}
              className={classNames('button mr-1', {
                'is-info': selectedCenturies.includes('18'),
              })}
            >
              18
            </SearchLink>
            <SearchLink
              params={toggleCentrury('19')}
              className={classNames('button mr-1', {
                'is-info': selectedCenturies.includes('19'),
              })}
            >
              19
            </SearchLink>
            <SearchLink
              params={toggleCentrury('20')}
              className={classNames('button mr-1', {
                'is-info': selectedCenturies.includes('20'),
              })}
            >
              20
            </SearchLink>
          </div>

          <div className="level-right ml-4">
            <SearchLink
              params={{ centuries: null }}
              data-cy="centuryALL"
              className={classNames('button is-success', {
                'is-outlined': selectedCenturies.length > 0,
              })}
            >
              All
            </SearchLink>
          </div>
        </div>
      </div>

      <div className="panel-block">
        <SearchLink
          params={{
            query: null,
            sex: null,
            centuries: null,
            sort: null,
            order: null,
          }}
          className="button is-link is-outlined is-fullwidth"
        >
          Reset all filters
        </SearchLink>
      </div>
    </nav>
  );
};
