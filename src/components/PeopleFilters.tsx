import classNames from 'classnames';
import { Link } from 'react-router-dom';
import { getSearchWith } from '../utils/searchHelper';

type Props = {
  query: string;
  sex: string;
  centuries: string[];
  searchParams: URLSearchParams;
  handleQueryChange: (
    event: React.ChangeEvent<HTMLInputElement> | null,
  ) => void;
  handleSexChange: (gender: string | null) => void;
  handleCenturiesChange: (cent: number | null) => void;
};

export const PeopleFilters: React.FC<Props> = ({
  query,
  sex,
  centuries,
  searchParams,
  handleQueryChange,
  handleSexChange,
  handleCenturiesChange,
}) => {
  return (
    <nav className="panel">
      <p className="panel-heading">Filters</p>

      <p className="panel-tabs" data-cy="SexFilter">
        <Link
          className={classNames(sex !== 'f' && sex !== 'm' ? 'is-active' : '')}
          to="/people"
        >
          All
        </Link>
        <Link
          className={classNames(sex === 'm' ? 'is-active' : '')}
          to={{
            pathname: '/people',
            search: '?sex=m',
          }}
        >
          Male
        </Link>
        <Link
          className={classNames(sex === 'f' ? 'is-active' : '')}
          to={{
            pathname: '/people',
            search: '?sex=f',
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
            value={query}
            onChange={handleQueryChange}
          />

          <span className="icon is-left">
            <i className="fas fa-search" aria-hidden="true" />
          </span>
        </p>
      </div>
      {/* eslint-disable */}
      <div className="panel-block">
        <div className="level is-flex-grow-1 is-mobile" data-cy="CenturyFilter">
          <div className="level-left">
            <Link
              data-cy="century"
              className={classNames('button mr-1', {
                'is-info': centuries.includes('16'),
              })}
              to={{
                search: getSearchWith(searchParams, {
                  centuries: centuries.includes('16')
                    ? centuries.filter(
                        currentCentury => currentCentury !== '16',
                      )
                    : [...centuries, '16'],
                }),
              }}
            >
              16
            </Link>

            <Link
              data-cy="century"
              className={classNames('button mr-1', {
                'is-info': centuries.includes('17'),
              })}
              to={{
                search: getSearchWith(searchParams, {
                  centuries: centuries.includes('17')
                    ? centuries.filter(
                        currentCentury => currentCentury !== '17',
                      )
                    : [...centuries, '17'],
                }),
              }}
            >
              17
            </Link>

            <Link
              data-cy="century"
              className={classNames('button mr-1', {
                'is-info': centuries.includes('18'),
              })}
              to={{
                search: getSearchWith(searchParams, {
                  centuries: centuries.includes('18')
                    ? centuries.filter(
                        currentCentury => currentCentury !== '18',
                      )
                    : [...centuries, '18'],
                }),
              }}
            >
              18
            </Link>

            <Link
              data-cy="century"
              className={classNames('button mr-1', {
                'is-info': centuries.includes('19'),
              })}
              to={{
                search: getSearchWith(searchParams, {
                  centuries: centuries.includes('19')
                    ? centuries.filter(
                        currentCentury => currentCentury !== '19',
                      )
                    : [...centuries, '19'],
                }),
              }}
            >
              19
            </Link>

            <Link
              data-cy="century"
              className={classNames('button mr-1', {
                'is-info': centuries.includes('20'),
              })}
              to={{
                search: getSearchWith(searchParams, {
                  centuries: centuries.includes('20')
                    ? centuries.filter(
                        currentCentury => currentCentury !== '20',
                      )
                    : [...centuries, '20'],
                }),
              }}
            >
              20
            </Link>
          </div>

          <div className="level-right ml-4">
            <Link
              data-cy="centuryALL"
              className="button is-success is-outlined"
              to="/people"
            >
              All
            </Link>
          </div>
        </div>
      </div>

      <div className="panel-block">
        <Link
          className="button is-link is-outlined is-fullwidth"
          to="/people"
          onClick={() => {
            handleQueryChange(null);
            handleSexChange(null);
            handleCenturiesChange(null);
          }}
        >
          Reset all filters
        </Link>
      </div>
    </nav>
  );
};
