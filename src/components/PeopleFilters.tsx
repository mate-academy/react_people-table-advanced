import { useSearchParams } from 'react-router-dom';
import { getSearchWith } from '../utils/searchHelper';
import classNames from 'classnames';
import { SearchLink } from './SearchLink';

export const PeopleFilters = () => {
  const [searchParams, setSearchParams] = useSearchParams();

  const sex = searchParams.get('sex');

  const query = searchParams.get('query') || '';

  const centuries = searchParams.getAll('centuries');
  const isSelectedCentury = (value: string) => centuries.includes(value);
  const ALL_CENTURIES = ['16', '17', '18', '19', '20'];

  function toggleCentury(n: string) {
    const newCenturies = centuries.includes(n)
      ? centuries.filter(century => century !== n)
      : [...centuries, n];

    setSearchParams(
      getSearchWith(searchParams, {
        centuries: newCenturies.length ? newCenturies : null,
      }),
    );
  }

  return (
    <nav className="panel">
      <p className="panel-heading">Filters</p>

      <p className="panel-tabs" data-cy="SexFilter">
        <SearchLink
          params={{ sex: null }}
          className={classNames({ 'is-active': !sex })}
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
            onChange={event => {
              const value = event.target.value;

              setSearchParams(
                getSearchWith(searchParams, {
                  query: value === '' ? null : value,
                }),
              );
            }}
          />

          <span className="icon is-left">
            <i className="fas fa-search" aria-hidden="true" />
          </span>
        </p>
      </div>

      <div className="panel-block">
        <div className="level is-flex-grow-1 is-mobile" data-cy="CenturyFilter">
          <div className="level-left">
            <a
              data-cy="century"
              className={classNames('button mr-1', {
                'is-info': isSelectedCentury('16'),
              })}
              onClick={() => toggleCentury('16')}
            >
              16
            </a>

            <a
              data-cy="century"
              className={classNames('button mr-1', {
                'is-info': isSelectedCentury('17'),
              })}
              onClick={() => toggleCentury('17')}
            >
              17
            </a>

            <a
              data-cy="century"
              className={classNames('button mr-1', {
                'is-info': isSelectedCentury('18'),
              })}
              onClick={() => toggleCentury('18')}
            >
              18
            </a>

            <a
              data-cy="century"
              className={classNames('button mr-1', {
                'is-info': isSelectedCentury('19'),
              })}
              onClick={() => toggleCentury('19')}
            >
              19
            </a>

            <a
              data-cy="century"
              className={classNames('button mr-1', {
                'is-info': isSelectedCentury('20'),
              })}
              onClick={() => toggleCentury('20')}
            >
              20
            </a>
          </div>

          <div className="level-right ml-4">
            <a
              data-cy="centuryALL"
              className="button is-success is-outlined"
              onClick={() =>
                setSearchParams(
                  getSearchWith(searchParams, {
                    centuries: ALL_CENTURIES,
                  }),
                )
              }
            >
              All
            </a>
          </div>
        </div>
      </div>

      <div className="panel-block">
        <a
          className="button is-link is-outlined is-fullwidth"
          onClick={() => setSearchParams({})}
        >
          Reset all filters
        </a>
      </div>
    </nav>
  );
};
