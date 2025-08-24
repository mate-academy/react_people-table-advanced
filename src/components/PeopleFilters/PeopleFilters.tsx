import cn from 'classnames';
import { useEffect, useRef, useState } from 'react';

const centuries = [16, 17, 18, 19, 20];
const sexFilters = [
  { label: 'All', value: null },
  { label: 'Male', value: 'm' },
  { label: 'Female', value: 'f' },
];

interface Props {
  searchParams: URLSearchParams;
  setSearchParams: (params: URLSearchParams) => void;
}

export const PeopleFilters: React.FC<Props> = ({
  searchParams,
  setSearchParams,
}) => {
  const [query, setQuery] = useState('');
  const sexUrlParam = searchParams.get('sex');
  const centuriesUrlParamArr = searchParams.getAll('centuries');
  const timerId = useRef<number | null>(null);

  useEffect(() => {
    setQuery(searchParams.get('query') || '');
  }, [searchParams]);

  const handleSeXFilter = (
    e: React.MouseEvent<HTMLAnchorElement>,
    key: string,
    value: string | null,
  ) => {
    e.preventDefault();
    const newSearchParams = new URLSearchParams(searchParams);

    if (value) {
      newSearchParams.set(key, value);
    } else {
      newSearchParams.delete(key);
    }

    setSearchParams(newSearchParams);
  };

  const handleCenturyClick = (
    e: React.MouseEvent<HTMLAnchorElement>,
    century: number,
  ) => {
    e.preventDefault();
    const newSearchParams = new URLSearchParams(searchParams);
    const currentCenturies = newSearchParams.getAll('centuries');

    if (currentCenturies.includes(String(century))) {
      const updatedCenturies = currentCenturies.filter(
        c => c !== String(century),
      );

      newSearchParams.delete('centuries');
      updatedCenturies.forEach(c => newSearchParams.append('centuries', c));
    } else {
      newSearchParams.append('centuries', String(century));
    }

    setSearchParams(newSearchParams);
  };

  const handleQueryChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newQuery = e.currentTarget.value;

    setQuery(newQuery);

    if (timerId.current) {
      clearTimeout(timerId.current);
    }

    timerId.current = window.setTimeout(() => {
      const newSearchParams = new URLSearchParams(searchParams);

      if (newQuery) {
        newSearchParams.set('query', newQuery);
      } else {
        newSearchParams.delete('query');
      }

      setSearchParams(newSearchParams);
    }, 500);
  };

  const handleAllCenturies = (
    e: React.MouseEvent<HTMLAnchorElement, MouseEvent>,
  ) => {
    e.preventDefault();
    const newSearchParams = new URLSearchParams(searchParams);

    newSearchParams.delete('centuries');
    setSearchParams(newSearchParams);
  };

  const handleResetAllClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    setSearchParams(new URLSearchParams());
  };

  return (
    <nav className="panel">
      <p className="panel-heading">Filters</p>

      <p className="panel-tabs" data-cy="SexFilter">
        {sexFilters.map(filter => (
          <a
            key={filter.label}
            className={cn({ 'is-active': sexUrlParam === filter.value })}
            href={`#/people${filter.value ? `?sex=${filter.value}` : ''}`}
            onClick={e => handleSeXFilter(e, 'sex', filter.value)}
          >
            {filter.label}
          </a>
        ))}
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
            {centuries.map(century => (
              <a
                key={century}
                className={cn('button', 'mr-1', {
                  'is-info': centuriesUrlParamArr?.includes(String(century)),
                })}
                href={`#/people?centuries=${century}`}
                onClick={e => handleCenturyClick(e, century)}
              >
                {century}
              </a>
            ))}
          </div>

          <div className="level-right ml-4">
            <a
              data-cy="centuryALL"
              className="button is-success is-outlined"
              href="#/people"
              onClick={e => handleAllCenturies(e)}
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
          onClick={handleResetAllClick}
        >
          Reset all filters
        </a>
      </div>
    </nav>
  );
};
