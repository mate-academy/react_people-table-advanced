import classNames from 'classnames';
import { Link, useSearchParams } from 'react-router-dom';

type Param = string | number;
type Params = {
  [key: string]: Param[] | Param | null;
};

export function getSearchWith(
  params: Params,
  search?: string | URLSearchParams,
) {
  const newParams = new URLSearchParams(search);
  // eslint-disable-next-line
  for (const [key, value] of Object.entries(params)) {
    if (value === null) {
      newParams.delete(key);
    } else if (Array.isArray(value)) {
      newParams.delete(key);
      value.forEach(item => newParams.append(key, item.toString()));
    } else {
      newParams.set(key, value.toString());
    }
  }

  return newParams.toString();
}

export const PeopleFilters: React.FC = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const query = searchParams.get('query') || '';
  const sex = searchParams.get('sex') || '';
  const centuries = searchParams.getAll('century') || [];
  // eslint-disable-next-line
  function setSearchWith(params: any) {
    const search = getSearchWith(params, searchParams);

    setSearchParams(search);
  }

  function handleQueryChange(event: React.ChangeEvent<HTMLInputElement>) {
    setSearchWith({ query: event.target.value || null });
  }

  function handleSexChange(event: React.ChangeEvent<HTMLInputElement>) {
    setSearchWith({ sex: event.target.value || null });
  }

  return (
    <nav className="panel">
      <p className="panel-heading">Filters</p>

      <p className="panel-tabs" data-cy="SexFilter" onChange={handleSexChange}>
        <Link
          to={{ search: getSearchWith({ sex: null }, searchParams) }}
          className={classNames({ 'is-active': !searchParams.get('sex') })}
        >
          All
        </Link>
        <Link
          to={{ search: getSearchWith({ sex: 'm' }, searchParams) }}
          className={classNames(
            { 'is-active': searchParams.get('sex') === 'm' },
          )}
        >
          Male
        </Link>
        <Link
          to={{ search: getSearchWith({ sex: 'f' }, searchParams) }}
          className={classNames(
            { 'is-active': searchParams.get('sex') === 'f' },
          )}
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
            onChange={handleQueryChange}
            value={query}
          />

          <span className="icon is-left">
            <i className="fas fa-search" aria-hidden="true" />
          </span>
        </p>
      </div>

      <div className="panel-block">
        <div className="level is-flex-grow-1 is-mobile" data-cy="CenturyFilter">
          <div className="level-left">
            {['16', '17', '18', '19', '20'].map(century => (
              <Link
                key={century}
                data-cy="century"
                className={classNames('button mr-1', {
                  'is-info': centuries.includes(century),
                })}
                to={{
                  search: getSearchWith({
                    century: centuries.includes(century)
                      ? centuries.filter(c => century !== c)
                      : [...centuries, century],
                  }, searchParams),
                }}
              >
                {century}
              </Link>
            ))}
          </div>

          <div className="level-right ml-4">
            <Link
              data-cy="centuryALL"
              className={classNames('button is-success', {
                'is-outlined': centuries.length !== 0,
              })}
              to={{ search: getSearchWith({ century: null }, searchParams) }}
            >
              All
            </Link>
          </div>
        </div>
      </div>

      <div className="panel-block">
        <a
          className={classNames('button is-link is-fullwidth', {
            'is-outlined': !query && !sex && centuries.length === 0,
          })}
          href="#/people"
        >
          Reset all filters
        </a>
      </div>
    </nav>
  );
};
