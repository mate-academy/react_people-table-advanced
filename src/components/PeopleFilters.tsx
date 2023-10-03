import { Link, useSearchParams } from 'react-router-dom';
import classNames from 'classnames';

import { getSearchWith } from '../utils/searchHelper';
import { CENTURIES, SEX_FILTER } from '../utils/constants';

export const PeopleFilters = () => {
  const [searchParams, setSearchParams] = useSearchParams();

  const query = searchParams.get('query') || '';
  const sex = searchParams.get('sex') || null;
  const centuries = searchParams.getAll('centuries') || [];

  function handleQueryChange(event: React.ChangeEvent<HTMLInputElement>) {
    setSearchParams(
      getSearchWith(searchParams, { query: event.target.value || null }),
    );
  }

  function handeleCenturiesChange(centry: string) {
    const newCenturies = centuries.includes(centry)
      ? centuries.filter(num => num !== centry)
      : [...centuries, centry];

    return getSearchWith(searchParams, { centuries: newCenturies });
  }

  const clearCentries = () => {
    return getSearchWith(searchParams, { centuries: null });
  };

  const resetALLFilters = () => {
    return getSearchWith(searchParams, {
      centuries: null,
      query: null,
      sex: null,
    });
  };

  return (
    <nav className="panel">
      <p className="panel-heading">Filters</p>

      <p className="panel-tabs" data-cy="SexFilter">
        {Object.keys(SEX_FILTER).map(key => {
          const typedKey = key as keyof typeof SEX_FILTER;

          return (
            <Link
              key={key}
              className={classNames({
                'is-active': SEX_FILTER[typedKey] === sex,
              })}
              to={{
                search: getSearchWith(searchParams, {
                  sex: SEX_FILTER[typedKey],
                }),
              }}
            >
              {key}
            </Link>
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

            {CENTURIES.map(centry => {
              return (
                <Link
                  key={centry}
                  data-cy="century"
                  className={classNames(
                    'button',
                    'mr-1',
                    { 'is-info': centuries.includes(centry) },
                  )}
                  to={{ search: handeleCenturiesChange(centry) }}
                >
                  {centry}
                </Link>
              );
            })}
          </div>

          <div className="level-right ml-4">
            <Link
              data-cy="centuryALL"
              className={classNames(
                'button',
                'is-success',
                { 'is-outlined': !!centuries.length },
              )}
              to={{ search: clearCentries() }}
            >
              All
            </Link>
          </div>
        </div>
      </div>

      <div className="panel-block">
        <Link
          className="button is-link is-outlined is-fullwidth"
          to={{ search: resetALLFilters() }}
        >
          Reset all filters
        </Link>
      </div>
    </nav>
  );
};
