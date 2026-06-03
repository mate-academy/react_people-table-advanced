import { Link, SetURLSearchParams } from 'react-router-dom';
import { getSearchWith } from '../utils/searchHelper';
import classNames from 'classnames';

type Props = {
  searchParams: URLSearchParams;
  setSearchParams: SetURLSearchParams;
};

export const PeopleFilters: React.FC<Props> = ({
  setSearchParams,
  searchParams,
}) => {
  const query = searchParams.get('query') || '';
  const sex = searchParams.get('sex') || '';
  const centuries = searchParams.getAll('centuries') || '';

  const handleQueryChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchParams(
      getSearchWith(searchParams, {
        query: event.target.value || null,
      }),
    );
  };

  return (
    <nav className="panel">
      <p className="panel-heading">Filters</p>

      <p className="panel-tabs" data-cy="SexFilter">
        <Link
          className={classNames({
            'is-active': sex !== 'f' && sex !== 'm',
          })}
          to={{
            search: getSearchWith(searchParams, {
              sex: null,
            }),
          }}
        >
          All
        </Link>
        <Link
          className={classNames({
            'is-active': sex === 'm',
          })}
          to={{
            search: getSearchWith(searchParams, {
              sex: 'm',
            }),
          }}
        >
          Male
        </Link>
        <Link
          className={classNames({
            'is-active': sex === 'f',
          })}
          to={{
            search: getSearchWith(searchParams, {
              sex: 'f',
            }),
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
            value={query}
            onChange={handleQueryChange}
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
              className={classNames('button mr-1', {
                'is-info': centuries.includes('16'),
              })}
              to={{
                search: getSearchWith(searchParams, {
                  centuries: centuries.includes('16')
                    ? centuries.filter(century => century !== '16')
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
                    ? centuries.filter(century => century !== '17')
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
                    ? centuries.filter(century => century !== '18')
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
                    ? centuries.filter(century => century !== '19')
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
                    ? centuries.filter(century => century !== '20')
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
              className={classNames('button is-success', {
                'is-outlined': centuries.length !== 0,
              })}
              to={{
                search: getSearchWith(searchParams, {
                  centuries: null,
                }),
              }}
            >
              All
            </Link>
          </div>
        </div>
      </div>

      <div className="panel-block">
        <Link
          className="button is-link is-outlined is-fullwidth"
          to={{
            search: getSearchWith(searchParams, {
              query: null,
              sex: null,
              centuries: null,
            }),
          }}
        >
          Reset all filters
        </Link>
      </div>
    </nav>
  );
};
