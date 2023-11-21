import cn from 'classnames';
import { Link, useSearchParams } from 'react-router-dom';
import { filterOptions } from '../types/filterBySex';
import { CenturyFilter } from '../types/CenturyFilter';
import { SearchParams, getSearchWith } from '../utils/searchHelper';
import { SearchLink } from './SearchLink';

type Props = {
  setSearchWith: (params: SearchParams) => void;
};

export const PeopleFilters: React.FC<Props> = ({ setSearchWith }) => {
  const [searchParams] = useSearchParams();

  const query = searchParams.get('query') || '';
  const filterBySex = searchParams.get('sex') || null;
  const filterByCentury = searchParams.getAll('centuries') || [];

  const handleQueryChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchWith({ query: event.target.value || null });
  };

  return (
    <nav className="panel">
      <p className="panel-heading">Filters</p>

      <p className="panel-tabs" data-cy="SexFilter">
        {filterOptions.map(option => (
          <SearchLink
            key={option.title}
            params={{ sex: option.value }}
            className={cn({ 'is-active': filterBySex === option.value })}
          >
            {option.title}
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
            {CenturyFilter.map(item => (
              <SearchLink
                key={item}
                data-cy="century"
                className={cn('button mr-1', {
                  'is-info': filterByCentury.includes(item),
                })}
                params={{
                  centuries: filterByCentury.includes(item)
                    ? filterByCentury.filter(el => el !== item)
                    : [...filterByCentury, item],
                }}
              >
                {item}
              </SearchLink>
            ))}
          </div>

          <div className="level-right ml-4">
            <SearchLink
              data-cy="centuryALL"
              className="button is-success is-outlined"
              params={{ centuries: null }}
            >
              All
            </SearchLink>
          </div>
        </div>
      </div>

      <div className="panel-block">
        <Link
          className="button is-link is-outlined is-fullwidth"
          to={{
            search: getSearchWith({
              centuries: null,
              sex: null,
              query: null,
            }, searchParams),
          }}
        >
          Reset all filters
        </Link>
      </div>
    </nav>
  );
};
