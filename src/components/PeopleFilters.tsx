import { useSearchParams, Link } from 'react-router-dom';
import classNames from 'classnames';
import { Filter } from '../types/Filter';

type Props = {
  setFilter: (value: Filter) => void,
};

export const PeopleFilters: React.FC<Props> = ({ setFilter }) => {
  const [searchParams, setSearchParams] = useSearchParams();

  return (
    <nav className="panel">
      <p className="panel-heading">Filters</p>

      <p className="panel-tabs" data-cy="SexFilter">
        <Link
          className={classNames(
            { 'is-active': () => {} },
          )}
          to="/people"
          onClick={() => {
            setFilter(Filter.ALL);
            searchParams.set('filter', Filter.ALL);
            setSearchParams(searchParams);
          }}
        >
          All
        </Link>
        <Link
          className={classNames(
            { 'is-active': () => {} },
          )}
          to="/people?sex=m"
          onClick={() => {
            setFilter(Filter.MALE);
            searchParams.set('filter', Filter.MALE);
            setSearchParams(searchParams);
          }}
        >
          Male
        </Link>
        <Link
          className={classNames(
            { 'is-active': () => {} },
          )}
          to="/people?sex=f"
          onClick={() => {
            setFilter(Filter.FEMALE);
            searchParams.set('filter', Filter.FEMALE);
            setSearchParams(searchParams);
          }}
        >
          Female
        </Link>
      </p>

      <div className="panel-block">
        <p className="control has-icons-left">
          <input
            data-cy="NameFilter"
            type="search"
            className="input"
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
            <Link
              data-cy="century"
              className={classNames(
                'button mr-1',
                { 'is-info': () => {} },
              )}
              to="#/people?centuries=16"
              onClick={() => {
                setFilter(Filter.SIXTEEN);
                searchParams.set('filter', Filter.SIXTEEN);
                setSearchParams(searchParams);
              }}
            >
              16
            </Link>
            <Link
              data-cy="century"
              className={classNames(
                'button mr-1',
                { 'is-info': () => {} },
              )}
              to="#/people?centuries=17"
              onClick={() => {
                setFilter(Filter.SEVENTEEN);
                searchParams.set('filter', Filter.SEVENTEEN);
                setSearchParams(searchParams);
              }}
            >
              17
            </Link>
            <Link
              data-cy="century"
              className={classNames(
                'button mr-1',
                { 'is-info': () => {} },
              )}
              to="#/people?centuries=18"
              onClick={() => {
                setFilter(Filter.EIGHTEEN);
                searchParams.set('filter', Filter.EIGHTEEN);
                setSearchParams(searchParams);
              }}
            >
              18
            </Link>
            <Link
              data-cy="century"
              className={classNames(
                'button mr-1',
                { 'is-info': () => {} },
              )}
              to="#/people?centuries=19"
              onClick={() => {
                setFilter(Filter.NINETEEN);
                searchParams.set('filter', Filter.NINETEEN);
                setSearchParams(searchParams);
              }}
            >
              19
            </Link>
            <Link
              data-cy="century"
              className={classNames(
                'button mr-1',
                { 'is-info': () => {} },
              )}
              to="#/people?centuries=20"
              onClick={() => {
                setFilter(Filter.TWENTY);
                searchParams.set('filter', Filter.TWENTY);
                setSearchParams(searchParams);
              }}
            >
              20
            </Link>
          </div>

          <div className="level-right ml-4">
            <Link
              data-cy="centuryALL"
              className={classNames(
                'button',
                { 'is-success is-outlined': () => {} },
              )}
              to="/people"
            >
              All
            </Link>
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
