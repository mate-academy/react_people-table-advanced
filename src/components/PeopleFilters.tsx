import { Link, useLocation, useSearchParams } from 'react-router-dom';
import { getSearchWith } from '../utils/searchHelper';
import classNames from 'classnames';
import {
  centuryFilterOptions,
  sexFilterOptions,
} from '../utils/filterSortOptions';
import { Filter } from '../types/Filter';

export const PeopleFilters = () => {
  const { pathname } = useLocation();
  const [searchParams, setSearchParams] = useSearchParams();

  function getToggledFilterValue(
    filter: Exclude<Filter, 'sex'>,
    newValue: string | null,
  ) {
    const currentValue = searchParams.getAll(filter);

    if (!newValue || currentValue.includes(newValue)) {
      return currentValue.filter(value => value !== newValue);
    }

    return [...currentValue, newValue];
  }

  function onInput(event: React.ChangeEvent<HTMLInputElement>) {
    const query = event.target.value;

    if (query === '') {
      searchParams.delete('query');
    } else {
      searchParams.set('query', query);
    }

    setSearchParams(searchParams);
  }

  return (
    <nav className="panel">
      <p className="panel-heading">Filters</p>

      <p className="panel-tabs" data-cy="SexFilter">
        {sexFilterOptions.map(sex => (
          <Link
            className={classNames({
              'is-active': searchParams.get('sex') === sex.symbol,
            })}
            to={{
              search: getSearchWith(searchParams, {
                sex: sex.symbol,
              }),
            }}
            key={sex.title}
          >
            {sex.title}
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
            value={`${searchParams.get('query') || ''}`}
            onChange={onInput}
          />

          <span className="icon is-left">
            <i className="fas fa-search" aria-hidden="true" />
          </span>
        </p>
      </div>

      <div className="panel-block">
        <div className="level is-flex-grow-1 is-mobile" data-cy="CenturyFilter">
          <div className="level-left">
            {centuryFilterOptions.map(century => (
              <Link
                data-cy="century"
                className={classNames('button mr-1', {
                  'is-info': searchParams
                    .getAll('century')
                    .includes(`${century}`),
                })}
                to={{
                  search: getSearchWith(searchParams, {
                    century: getToggledFilterValue('century', `${century}`),
                  }),
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
              className="button is-success is-outlined"
              to={{ search: getSearchWith(searchParams, { century: null }) }}
            >
              All
            </Link>
          </div>
        </div>
      </div>

      <div className="panel-block">
        <Link className="button is-link is-outlined is-fullwidth" to={pathname}>
          Reset all filters
        </Link>
      </div>
    </nav>
  );
};
