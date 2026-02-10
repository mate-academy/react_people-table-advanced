import cn from 'classnames';
import { Link, useSearchParams } from 'react-router-dom';
import { Sex } from '../types/Sex';

const centuriesList = ['16', '17', '18', '19', '20'];

type Param = string | number;

type Params = {
  [key: string]: Param[] | Param | null;
};

export const getSearchWith = (
  params: Params,
  search?: string | URLSearchParams,
) => {
  const newParams = new URLSearchParams(search);

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
};

export const PeopleFilters = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const query = searchParams.get('query') || '';
  const searchBySex = searchParams.get('sex') || '';
  const centuries = searchParams.getAll('centuries') || [];

  const setSearchWith = (params: Params) => {
    const search = getSearchWith(params, searchParams);

    setSearchParams(search);
  };

  function handleChangeQuery(newQuery: string) {
    setSearchWith({ query: newQuery || null });
  }

  function toggleCenturies(century: string) {
    return centuries.includes(century)
      ? centuries.filter(ch => ch !== century)
      : [...centuries, century];
  }

  return (
    <nav className="panel">
      <p className="panel-heading">Filters</p>

      <p className="panel-tabs" data-cy="SexFilter">
        <Link
          className={cn({ 'is-active': !searchBySex })}
          to={{ search: getSearchWith({ sex: null }, searchParams) }}
        >
          All
        </Link>
        <Link
          className={cn({ 'is-active': searchBySex === Sex.Male })}
          to={{ search: getSearchWith({ sex: Sex.Male }, searchParams) }}
        >
          Male
        </Link>
        <Link
          className={cn({ 'is-active': searchBySex === Sex.Female })}
          to={{ search: getSearchWith({ sex: Sex.Female }, searchParams) }}
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
            onChange={event => handleChangeQuery(event.target.value)}
          />

          <span className="icon is-left">
            <i className="fas fa-search" aria-hidden="true" />
          </span>
        </p>
      </div>

      <div className="panel-block">
        <div className="level is-flex-grow-1 is-mobile" data-cy="CenturyFilter">
          <div className="level-left">
            {centuriesList.map(century => (
              <Link
                key={century}
                data-cy="century"
                className={cn('button mr-1', {
                  'is-info': centuries.includes(century),
                })}
                to={{
                  search: getSearchWith(
                    {
                      centuries: toggleCenturies(century),
                    },
                    searchParams,
                  ),
                }}
              >
                {century}
              </Link>
            ))}
          </div>

          <div className="level-right ml-4">
            <Link
              data-cy="centuryALL"
              className={cn('button is-success', {
                'is-outlined': centuries.length !== 0,
              })}
              to="/people"
            >
              All
            </Link>
          </div>
        </div>
      </div>

      <div className="panel-block">
        <Link className="button is-link is-outlined is-fullwidth" to="/people">
          Reset all filters
        </Link>
      </div>
    </nav>
  );
};
