import { Link, useSearchParams } from 'react-router-dom';
import { getSearchWith } from '../utils/searchHelper';
import classNames from 'classnames';
import { SexType } from '../types';

type PeopleFiltersProps = {
  centuriesList: number[];
};

export const PeopleFilters = ({ centuriesList }: PeopleFiltersProps) => {
  const [searchParams, setSearchParams] = useSearchParams();
  const centuries = searchParams.getAll('centuries');
  const sex = searchParams.get('sex');

  const query = searchParams.get('query') || '';

  const handleQuery = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.value.trim().length > 0) {
      searchParams.set('query', event.target.value.trim());
    } else {
      searchParams.delete('query');
    }

    setSearchParams(searchParams);
  };

  return (
    <nav className="panel">
      <p className="panel-heading">Filters</p>

      <p className="panel-tabs" data-cy="SexFilter">
        <Link
          to={{ search: getSearchWith(searchParams, { sex: null }) }}
          className={classNames({ 'is-active': sex === null })}
        >
          All
        </Link>
        <Link
          to={{ search: getSearchWith(searchParams, { sex: SexType.MALE }) }}
          className={classNames({ 'is-active': sex === SexType.MALE })}
        >
          Male
        </Link>
        <Link
          to={{ search: getSearchWith(searchParams, { sex: SexType.FEMALE }) }}
          className={classNames({ 'is-active': sex === SexType.FEMALE })}
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
            onChange={handleQuery}
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
                to={{
                  search: getSearchWith(searchParams, {
                    centuries: centuries.includes(century.toString())
                      ? centuries.filter(el => el !== century.toString())
                      : [...centuries, century.toString()],
                  }),
                }}
                className={classNames('button mr-1', {
                  'is-info': centuries.includes(century.toString()),
                })}
              >
                {century}
              </Link>
            ))}
          </div>

          <div className="level-right ml-4">
            <Link
              to={{ search: getSearchWith(searchParams, { centuries: [] }) }}
              data-cy="centuryALL"
              className={classNames('button is-success ', {
                'is-outlined': centuries.length > 0,
              })}
            >
              All
            </Link>
          </div>
        </div>
      </div>

      <div className="panel-block">
        <Link
          to={{
            search: getSearchWith(searchParams, {
              centuries: [],
              sex: null,
              query: null,
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
