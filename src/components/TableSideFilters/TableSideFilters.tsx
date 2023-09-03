import { Link, useSearchParams } from 'react-router-dom';
import cn from 'classnames';

import { getSearchWith } from '../../utils/searchHelper';
import { FilterSex } from '../../types/Filters';

const CENTURIES = [16, 17, 18, 19, 20];

export const TableSideFilters = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const query = searchParams.get('query') || '';
  const sex = searchParams.get('sex') || '';
  const centuries = searchParams.getAll('centuries') || [];

  function setSearchWith(params: { [key: string]: string | string[] | null }) {
    const search = getSearchWith(searchParams, params);

    setSearchParams(search);
  }

  const handleFilterInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchWith({ query: e.target.value || null });
  };

  const handleFilterCentury = (val: number) => {
    const value = `${val}`;

    if (centuries.includes(value)) {
      return centuries.filter(selectedValue => selectedValue !== value);
    }

    return [...centuries, value];
  };

  return (
    <nav className="panel">
      <p className="panel-heading">Filters</p>
      <p className="panel-tabs" data-cy="SexFilter">

        {(Object.keys(FilterSex) as Array<keyof typeof FilterSex>).map(key => (
          <Link
            key={key}
            to={{
              search: getSearchWith(searchParams, {
                sex: FilterSex[key] || null,
              }),
            }}
            className={cn(
              { 'is-active': sex === FilterSex[key] },
            )}
          >
            {key}
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
            value={query}
            onChange={handleFilterInputChange}
          />

          <span className="icon is-left">
            <i className="fas fa-search" aria-hidden="true" />
          </span>
        </p>
      </div>

      <div className="panel-block">
        <div className="level is-flex-grow-1 is-mobile" data-cy="CenturyFilter">
          <div className="level-left">
            {CENTURIES.map(value => (
              <Link
                key={value}
                data-cy="century"
                className={cn(
                  'button',
                  'mr-1',
                  { 'is-info': centuries.includes(`${value}`) },
                )}
                to={{
                  search: getSearchWith(searchParams, {
                    centuries: handleFilterCentury(value),
                  }),
                }}
              >
                {value}
              </Link>
            ))}
          </div>

          <div className="level-right ml-4">
            <Link
              data-cy="centuryALL"
              className={cn(
                'button',
                'is-success',
                { 'is-outlined': !!centuries.length },
              )}
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
        <a
          className="button is-link is-outlined is-fullwidth"
          href="#/people"
        >
          Reset all filters
        </a>
      </div>
    </nav>
  );
};
