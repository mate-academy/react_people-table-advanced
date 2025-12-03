import { Link, useLocation, useSearchParams } from 'react-router-dom';
import cn from 'classnames';
import { useRef, useState } from 'react';

type SearchParam = {
  [key: string]: string | null | string[];
};

const centuriesList = ['16', '17', '18', '19', '20'];
const sexList = [
  { sex: null, name: 'All' },
  { sex: 'f', name: 'Female' },
  { sex: 'm', name: 'Male' },
];

export const getSearchParams = (paramsToChange: SearchParam, search = '') => {
  const params = new URLSearchParams(search);

  Object.entries(paramsToChange).forEach(([key, value]) => {
    if (value === null) {
      params.delete(key);
    } else if (typeof value === 'string') {
      if (value.trim() === '') {
        params.delete(key);
      } else {
        params.set(key, value.trim());
      }
    } else if (Array.isArray(value)) {
      let arr = [...params.getAll('centuries')];
      const v = value[0];

      params.delete(key);

      if (arr.some(c => c === v)) {
        arr = arr.filter(elem => elem !== v);
      } else {
        arr = [...arr, v];
      }

      if (v !== 'all') {
        arr.forEach(c => params.append(key, c));
      }
    }
  });

  return params.toString();
};

function isCenturyActive(urlSearchParams: URLSearchParams, century: string) {
  return urlSearchParams.getAll('centuries').some(cent => cent === century);
}

export const PeopleFilters = () => {
  const { search } = useLocation();
  const [urlSearchParams, setUrlSearchParams] = useSearchParams();
  const [query, setQuery] = useState(urlSearchParams.get('query') || '');
  const timerId = useRef(0);

  const debounce = (callback: () => void, timeout: number) => {
    window.clearTimeout(timerId.current);

    timerId.current = window.setTimeout(callback, timeout);
  };

  const handleQueryChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value.trim().toLowerCase();

    setQuery(value);

    debounce(() => {
      setUrlSearchParams(
        getSearchParams({ query: value }, urlSearchParams.toString()),
      );
    }, 500);
  };

  return (
    <nav className="panel">
      <p className="panel-heading">Filters</p>

      <p className="panel-tabs" data-cy="SexFilter">
        {sexList.map(elem => (
          <Link
            to={{ search: getSearchParams({ sex: elem.sex }, search) }}
            className={cn({
              'is-active': urlSearchParams.get('sex') === elem.sex,
            })}
            key={elem.name}
          >
            {elem.name}
          </Link>
        ))}
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
            {centuriesList.map(century => (
              <Link
                data-cy="century"
                className={cn('button', 'mr-1', {
                  'is-info': isCenturyActive(urlSearchParams, century),
                })}
                to={{
                  search: getSearchParams({ centuries: [century] }, search),
                }}
                key={century}
              >
                {century}
              </Link>
            ))}
          </div>

          <div className="level-right ml-4">
            <Link
              data-cy="centuryALL"
              className={cn('button', 'is-success', {
                'is-outlined': urlSearchParams.has('centuries'),
              })}
              to={{ search: getSearchParams({ centuries: ['all'] }) }}
            >
              All
            </Link>
          </div>
        </div>
      </div>

      <div className="panel-block">
        <Link className="button is-link is-outlined is-fullwidth" to="">
          Reset all filters
        </Link>
      </div>
    </nav>
  );
};
