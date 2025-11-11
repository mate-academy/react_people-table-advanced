import { useLocation, useNavigate } from 'react-router-dom';
import classNames from 'classnames';
import { getSearchWith } from '../utils/searchHelper';
import { useMemo } from 'react';

enum FilterType {
  sex = 'sex',
  query = 'query',
  centuries = 'centuries',
}

export const PeopleFilters = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const searchParams = useMemo(
    () => new URLSearchParams(location.search),
    [location.search],
  );

  const sex = searchParams.get(FilterType.sex);
  const centuries = searchParams.getAll(FilterType.centuries);
  const query = searchParams.get(FilterType.query) || '';
  const buttonsCentury = [16, 17, 18, 19, 20];

  function handleClick(
    queryParam: FilterType,
    value: string,
    action: 'add' | 'delete' | 'change' = 'change',
  ) {
    const paramsToUpdate: Record<string, string | string[] | null> = {};

    if (action === 'delete') {
      paramsToUpdate[queryParam] = null;
    } else if (queryParam === FilterType.centuries) {
      const current = searchParams.getAll(FilterType.centuries);

      if (current.includes(value)) {
        paramsToUpdate[FilterType.centuries] = current.filter(c => c !== value);
      } else {
        paramsToUpdate[FilterType.centuries] = [...current, value];
      }
    } else {
      paramsToUpdate[queryParam] = value;
    }

    const newSearch = getSearchWith(searchParams, paramsToUpdate);

    navigate({
      pathname: location.pathname,
      search: `?${newSearch}`,
    });
  }

  const thisActiveCenturyBtn = (num: number) => centuries.includes(String(num));

  return (
    <nav className="panel">
      <p className="panel-heading">Filters</p>

      <p className="panel-tabs" data-cy="SexFilter">
        <a
          className={!sex ? 'is-active' : ''}
          onClick={() => handleClick(FilterType.sex, '', 'delete')}
        >
          All
        </a>
        <a
          className={sex === 'm' ? 'is-active' : ''}
          onClick={() => handleClick(FilterType.sex, 'm')}
        >
          Male
        </a>
        <a
          className={sex === 'f' ? 'is-active' : ''}
          onClick={() => handleClick(FilterType.sex, 'f')}
        >
          Female
        </a>
      </p>

      <div className="panel-block">
        <p className="control has-icons-left">
          <input
            data-cy="NameFilter"
            type="search"
            className="input"
            placeholder="Search"
            value={query}
            onChange={e => {
              const value = e.target.value.trim();

              if (value === '') {
                handleClick(FilterType.query, '', 'delete');
              } else {
                handleClick(FilterType.query, value);
              }
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
            {buttonsCentury.map(item => (
              <a
                key={item}
                data-cy="century"
                className={classNames('button mr-1', {
                  'is-info': thisActiveCenturyBtn(item),
                })}
                onClick={() =>
                  handleClick(FilterType.centuries, String(item), 'add')
                }
              >
                {item}
              </a>
            ))}
          </div>

          <div className="level-right ml-4">
            <a
              data-cy="centuryALL"
              className="button is-success is-outlined"
              onClick={() => handleClick(FilterType.centuries, '', 'delete')}
            >
              All
            </a>
          </div>
        </div>
      </div>

      <div className="panel-block">
        <a
          className="button is-link is-outlined is-fullwidth"
          onClick={() => {
            const newSearch = getSearchWith(searchParams, {
              query: null,
              sex: null,
              centuries: null,
            });

            navigate({
              pathname: location.pathname,
              search: `?${newSearch}`,
            });
          }}
        >
          Reset all filters
        </a>
      </div>
    </nav>
  );
};
