import { useSearchParams } from 'react-router-dom';
import cn from 'classnames';
import { getSearchWith } from '../utils/searchHelper';
import { SearchLink } from './SearchLink';

const centuries = ['16', '17', '18', '19', '20'];
const sexes = [
  { label: 'All', value: null },
  { label: 'Male', value: 'm' },
  { label: 'Female', value: 'f' },
];

export const PeopleFilters = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const selectedCenturies = searchParams.getAll('centuries');
  const sex = searchParams.get('sex');

  return (
    <nav className="panel">
      <p className="panel-heading">Filters</p>
      <p className="panel-tabs" data-cy="SexFilter">
        {sexes.map(({ label, value }) => (
          <SearchLink
            key={label}
            params={{ sex: value }}
            className={cn({ 'is-active': sex === value })}
          >
            {label}
          </SearchLink>
        ))}
      </p>
      <div className="panel-block">
        <p className="control has-icons-left">
          <input
            data-cy="NameFilter"
            type="search"
            className="input"
            placeholder="Search"
            aria-label="Search people"
            value={searchParams.get('query') || ''}
            onChange={event =>
              setSearchParams(
                getSearchWith(searchParams, {
                  query: event.target.value || null,
                }),
              )
            }
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
              <SearchLink
                key={century}
                data-cy="century"
                className={cn('button mr-1', {
                  'is-info': selectedCenturies.includes(century),
                })}
                params={{
                  centuries: selectedCenturies.includes(century)
                    ? selectedCenturies.filter(value => value !== century)
                    : [...selectedCenturies, century],
                }}
              >
                {century}
              </SearchLink>
            ))}
          </div>
          <div className="level-right ml-4">
            <SearchLink
              data-cy="centuryALL"
              className={cn('button is-success', {
                'is-outlined': selectedCenturies.length > 0,
              })}
              params={{ centuries: null }}
            >
              All
            </SearchLink>
          </div>
        </div>
      </div>
      <div className="panel-block">
        <SearchLink
          className="button is-link is-outlined is-fullwidth"
          params={{
            query: null,
            sex: null,
            centuries: null,
            sort: null,
            order: null,
          }}
        >
          Reset all filters
        </SearchLink>
      </div>
    </nav>
  );
};
