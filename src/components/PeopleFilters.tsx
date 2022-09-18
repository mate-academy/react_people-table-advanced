import classNames from 'classnames';
import { Link, useSearchParams } from 'react-router-dom';
import { updateSearch } from '../utils/MyImplementationOfSearchHelper';

/*
type Props = {
  updateURL: (params:
  { [key:string]:string[] | string | null }) => string,
};
*/

export const PeopleFilters = () => {
  const [searchParams] = useSearchParams();

  console.log(searchParams.toString());

  return (
    <nav className="panel">
      <p className="panel-heading">Filters</p>

      <p className="panel-tabs" data-cy="SexFilter">
        {/* <a className="is-active" href="#/people">All</a> */}
        <Link
          className={
            classNames({ 'is-active': searchParams.get('sex') === null })
          }
          to={{
            search: updateSearch({ sex: null }),
          }}
        >
          All
        </Link>
        <Link
          className={
            classNames({
              'is-active': searchParams.toString().includes('sex=m'),
            })
          }
          to={{
            search: updateSearch({ sex: 'm' }),
          }}
        >
          Male
        </Link>
        <Link
          className={
            classNames({
              'is-active': searchParams.toString().includes('sex=f'),
            })
          }
          to={{
            search: updateSearch({ sex: 'f' }),
          }}
        >
          Female
        </Link>
        {/* <Link className="" to="#/people?sex=m">Male</Link> */}
        {/* <Link className="" to="#/people?sex=f">Female</Link> */}
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
            <a
              data-cy="century"
              className="button mr-1"
              href="#/people?centuries=16"
            >
              16
            </a>

            <a
              data-cy="century"
              className="button mr-1 is-info"
              href="#/people?centuries=17"
            >
              17
            </a>

            <a
              data-cy="century"
              className="button mr-1 is-info"
              href="#/people?centuries=18"
            >
              18
            </a>

            <a
              data-cy="century"
              className="button mr-1 is-info"
              href="#/people?centuries=19"
            >
              19
            </a>

            <a
              data-cy="century"
              className="button mr-1"
              href="#/people?centuries=20"
            >
              20
            </a>
          </div>

          <div className="level-right ml-4">
            <a
              data-cy="centuryALL"
              className="button is-success is-outlined"
              href="#/people"
            >
              All
            </a>
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
