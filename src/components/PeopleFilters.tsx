import classNames from 'classnames';
import { SearchLink } from './SearchLink';
import { SortBy } from '../types/SortBy';

type Props = {
  handleFilter: (value: string) => void,
  handleCentury:(value: string) => void,
  century: string[],
  sex: string,
  query: string
  hendleQuery: (value: string) => void,
};

export const PeopleFilters:React.FC<Props> = ({
  handleFilter,
  handleCentury,
  century,
  sex,
  query,
  hendleQuery,
}) => {
  const centuryArray = ['16', '17', '18', '19', '20'];

  return (
    <nav className="panel">
      <p className="panel-heading">Filters</p>

      <p className="panel-tabs" data-cy="SexFilter">
        <SearchLink
          className={classNames({
            'is-active': sex === '',
          })}
          params={{ sex: null }}
        >
          All
        </SearchLink>
        <SearchLink
          params={{ sex: SortBy.Male }}
          // "#/people?sex=m"
          className={classNames({
            'is-active': sex === 'm',
          })}
          onClick={(e) => {
            e.preventDefault();
            handleFilter('m');
          }}
        >
          Male
        </SearchLink>
        <SearchLink
          params={{ sex: SortBy.Female }}
          className={classNames({
            'is-active': sex === 'f',
          })}
          onClick={(e) => {
            e.preventDefault();
            handleFilter('f');
          }}
        >
          Female
        </SearchLink>
      </p>

      <div className="panel-block">
        <p className="control has-icons-left">
          <input
            data-cy="NameFilter"
            type="search"
            value={query}
            className="input"
            placeholder="Search"
            onChange={(e) => hendleQuery(e.target.value)}
          />

          <span className="icon is-left">
            <i className="fas fa-search" aria-hidden="true" />
          </span>
        </p>
      </div>

      <div className="panel-block">
        <div className="level is-flex-grow-1 is-mobile" data-cy="CenturyFilter">
          <div className="level-left">
            {centuryArray.map(num => (
              <SearchLink
                key={num}
                data-cy="century"
                className={classNames('button mr-1', {
                  'is-info': century.includes(num.toString()),
                })}
                params={{ century: num }}
                onClick={(e) => {
                  e.preventDefault();
                  handleCentury(num.toString());
                }}
              >
                {num}
              </SearchLink>
            ))}
          </div>

          <div className="level-right ml-4">
            <SearchLink
              data-cy="centuryALL"
              className={classNames('button is-success', {
                'is-outlined': century.length,
              })}
              params={{ century: null }}
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
            century: null,
            query: null,
            sex: null,
          }}
        >
          Reset all filters
        </SearchLink>
      </div>
    </nav>
  );
};
