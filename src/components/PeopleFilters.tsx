import { Link, useSearchParams } from 'react-router-dom';
import cn from 'classnames';
import { ChangeEvent } from 'react';

const firstCentury = 16;
const centFilterLength = 5;

type SearchGetter = (
  params: { [key: string]: string[] | string | null }
) => string;

const centuriesList = Array.from(
  { length: centFilterLength },
  (_, index) => String(index + firstCentury),
);

export const PeopleFilters = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const sex = searchParams.get('sex') || '';
  const query = searchParams.get('query') || '';
  const centuries = searchParams.getAll('centuries') || [];

  const getSearchWith: SearchGetter = params => {
    const updatedSearchParams = new URLSearchParams(searchParams);

    Object.entries(params).forEach(([key, value]) => {
      if (value === null) {
        updatedSearchParams.delete(key);

        return;
      }

      if (Array.isArray(value)) {
        updatedSearchParams.delete(key);

        value.forEach(entry => {
          updatedSearchParams.append(key, entry);
        });

        return;
      }

      updatedSearchParams.set(key, value);
    });

    return updatedSearchParams.toString();
  };

  const handleQueryChange = (event: ChangeEvent<HTMLInputElement>) => {
    setSearchParams(
      getSearchWith({ query: event.target.value || null }),
    );
  };

  return (
    <nav className="panel">
      <p className="panel-heading">Filters</p>

      <p className="panel-tabs" data-cy="SexFilter">
        <Link
          to={{
            search: getSearchWith({
              sex: null,
            }),
          }}
          className={cn({ 'is-active': !sex })}
        >
          All
        </Link>

        <Link
          to={{
            search: getSearchWith({
              sex: 'm',
            }),
          }}
          className={cn({ 'is-active': sex === 'm' })}
        >
          Male
        </Link>

        <Link
          to={{
            search: getSearchWith({
              sex: 'f',
            }),
          }}
          className={cn({ 'is-active': sex === 'f' })}
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
            {centuriesList.map(century => {
              const isChosenCentury = centuries.includes(century);

              return (
                <Link
                  data-cy="century"
                  to={{
                    search: getSearchWith({
                      centuries: isChosenCentury
                        ? centuries.filter(cntr => cntr !== century)
                        : [...centuries, century],
                    }),
                  }}
                  className={cn('button', 'mr-1', {
                    'is-info': isChosenCentury,
                  })}
                  key={century}
                >
                  {century}
                </Link>
              );
            })}
          </div>

          <div className="level-right ml-4">
            <Link
              data-cy="centuryALL"
              to={{
                search: getSearchWith({
                  centuries: null,
                }),
              }}
              className="button is-success is-outlined"
            >
              All
            </Link>
          </div>
        </div>
      </div>

      <div className="panel-block">
        <Link
          to={{
            search: getSearchWith({
              sex: null,
              query: null,
              centuries: null,
            }),
          }}
          className="button is-link is-outlined is-fullwidth"
        >
          Reset all filters
        </Link>
      </div>
    </nav>
  );
};
