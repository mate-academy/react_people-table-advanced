import { Link, useSearchParams } from 'react-router-dom';
import cn from 'classnames';

import { getSearchWith } from '../utils/searchHelper';

export const PeopleFilters = () => {
  // const [searchParams] = useSearchParams();
  // const navigate = useNavigate();
  const [searchParams, setSearchParams] = useSearchParams();

  const sex = searchParams.get('sex');
  const centuries = searchParams.getAll('centuries');
  const query = searchParams.get('query') || '';

  const handleQueryChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const params = new URLSearchParams(searchParams);

    if (event.target.value) {
      params.set('query', event.target.value);
    } else {
      params.delete('query');
    }

    setSearchParams(params);
  };

  const getCenturyLink = (century: string) => {
    const nextCenturies = centuries.includes(century)
      ? centuries.filter(c => c !== century)
      : [...centuries, century];

    return {
      search: getSearchWith(searchParams, {
        centuries: nextCenturies.length ? nextCenturies : null,
      }),
    };
  };

  return (
    <nav className="panel">
      <p className="panel-heading">Filters</p>

      <p className="panel-tabs" data-cy="SexFilter">
        <Link
          className={cn({
            'is-active': sex === null,
          })}
          to="#/people"
        >
          All
        </Link>
        <Link
          className={cn({
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
          className={cn({
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
            <Link
              data-cy="century"
              className={cn('button mr-1', {
                'is-info': centuries?.includes('16'),
              })}
              to={getCenturyLink('16')}
            >
              16
            </Link>

            <Link
              data-cy="century"
              className={cn('button mr-1', {
                'is-info': centuries?.includes('17'),
              })}
              to={getCenturyLink('17')}
            >
              17
            </Link>

            <Link
              data-cy="century"
              className={cn('button mr-1', {
                'is-info': centuries?.includes('18'),
              })}
              to={getCenturyLink('18')}
            >
              18
            </Link>

            <Link
              data-cy="century"
              className={cn('button mr-1', {
                'is-info': centuries?.includes('19'),
              })}
              to={getCenturyLink('19')}
            >
              19
            </Link>

            <Link
              data-cy="century"
              className={cn('button mr-1', {
                'is-info': centuries?.includes('20'),
              })}
              to={getCenturyLink('20')}
            >
              20
            </Link>
          </div>

          <div className="level-right ml-4">
            <Link
              data-cy="centuryALL"
              className={cn('button is-success is-outlined', {
                'is-info': centuries === null,
              })}
              to="#/people"
            >
              All
            </Link>
          </div>
        </div>
      </div>

      <div className="panel-block">
        <Link className="button is-link is-outlined is-fullwidth" to="#/people">
          Reset all filters
        </Link>
      </div>
    </nav>
  );
};
