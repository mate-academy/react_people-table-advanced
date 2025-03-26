import classNames from 'classnames';
import { Link } from 'react-router-dom';

type Props = {
  setFilterSex: React.Dispatch<React.SetStateAction<'all' | 'm' | 'f'>>;
  setFilterCentury:
  React.Dispatch<React.SetStateAction<'16' | '17' | '18' | '19' | '20' | ''>
  >;
  filterSex: 'all' | 'm' | 'f';
  filterCentury: '16' | '17' | '18' | '19' | '20' | '';
};
export const PeopleFilters = ({
  setFilterSex,
  setFilterCentury,
  filterSex,
  filterCentury,
}: Props) => {
  return (
    <nav className="panel">
      <p className="panel-heading">Filters</p>

      <p className="panel-tabs" data-cy="SexFilter">
        <Link
          to="#/people"
          className="is-active"
          onClick={() => setFilterSex('all')}
        >
          All
        </Link>
        <Link
          to="#/people?sex=m"
          className={filterSex === 'm' ? 'is-active' : ''}
          onClick={() => setFilterSex('m')}
        >
          Male
        </Link>
        <Link
          to="#/people?sex=f"
          className={classNames({ 'is-active': filterSex === 'f' })}
          onClick={() => setFilterSex('f')}
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
              to="#/people?centuries=16"
              data-cy="century"
              className={classNames('button mr-1', {
                'is-info': filterCentury === '16',
              })}
              onClick={() => setFilterCentury('16')}
            >
              16
            </Link>

            <a
              data-cy="century"
              className="button mr-1 is-info"
              href="#/people?centuries=17"
              onClick={() => setFilterCentury('17')}
            >
              17
            </a>

            <a
              data-cy="century"
              className="button mr-1 is-info"
              href="#/people?centuries=18"
              onClick={() => setFilterCentury('18')}
            >
              18
            </a>

            <a
              data-cy="century"
              className="button mr-1 is-info"
              href="#/people?centuries=19"
              onClick={() => setFilterCentury('19')}
            >
              19
            </a>

            <a
              data-cy="century"
              className="button mr-1"
              href="#/people?centuries=20"
              onClick={() => setFilterCentury('20')}
            >
              20
            </a>
          </div>

          <div className="level-right ml-4">
            <a
              data-cy="centuryALL"
              className="button is-success is-outlined"
              href="#/people"
              onClick={() => setFilterCentury('')}
            >
              All
            </a>
          </div>
        </div>
      </div>

      <div className="panel-block">
        <a className="button is-link is-outlined is-fullwidth" href="#/people">
          Reset all filters
        </a>
      </div>
    </nav>
  );
};
