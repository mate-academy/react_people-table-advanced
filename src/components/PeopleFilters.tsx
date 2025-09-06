import classNames from 'classnames';
import { useSearchParams } from 'react-router-dom';

const MIN_CENTURY = 16;
const MAX_CENTURY = 20;
const sexFilters = [
  {
    label: 'All',
    href: '',
  },
  {
    label: 'Male',
    href: '?sex=m',
  },
  {
    label: 'Female',
    href: '?sex=f',
  },
];

export const PeopleFilters = () => {
  const centuries: string[] = [];

  for (let i = MIN_CENTURY; i <= MAX_CENTURY; i++) {
    centuries.push(i.toString());
  }

  const [searchParams, setSearchParams] = useSearchParams();
  const currentSex = searchParams.get('sex');
  const currentCenturies = searchParams.getAll('centuries');

  const toggleSearchParams = (
    param: string,
    value: string | null | string[],
  ) => {
    const newParam = new URLSearchParams(searchParams);

    if (Array.isArray(value)) {
      newParam.delete(param);

      value.forEach(item => newParam.append(param, item));
    } else if (value) {
      newParam.set(param, value);
    } else {
      newParam.delete(param);
    }

    setSearchParams(newParam);
  };

  const toggleCenturies = (century: string) => {
    const newCenrturies = currentCenturies.includes(century)
      ? currentCenturies.filter(c => c !== century)
      : [...currentCenturies, century];

    toggleSearchParams('centuries', newCenrturies);
  };

  const handleResetCenturies = () => {
    const newParam = new URLSearchParams(searchParams);

    newParam.delete('centuries');

    setSearchParams(newParam);
  };

  const handleSearch = (query: string) => {
    const trimmedQuery = query.trim();

    toggleSearchParams('query', trimmedQuery);
  };

  return (
    <nav className="panel">
      <p className="panel-heading">Filters</p>

      <p className="panel-tabs" data-cy="SexFilter">
        {sexFilters.map(({ label, href }, i) => {
          const url = new URL(href.replace('#', ''), window.location.origin);
          const sex = url.searchParams.get('sex');

          return (
            <a
              key={i}
              className={
                sex === currentSex || (!sex && !currentSex) ? 'is-active' : ''
              }
              href={href}
              onClick={e => {
                e.preventDefault();
                toggleSearchParams('sex', sex);
              }}
            >
              {label}
            </a>
          );
        })}
      </p>

      <div className="panel-block">
        <p className="control has-icons-left">
          <input
            data-cy="NameFilter"
            type="search"
            className="input"
            placeholder="Search"
            value={searchParams.get('query') || ''}
            onChange={e => {
              e.preventDefault();
              handleSearch(e.target.value);
            }}
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
                data-cy="century"
                className={classNames('button mr-1', {
                  'is-info': currentCenturies.includes(century),
                })}
                href={`#/people?centuries=${century}`}
                onClick={e => {
                  e.preventDefault();
                  toggleCenturies(century);
                }}
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
              onClick={e => {
                e.preventDefault();
                handleResetCenturies();
              }}
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
