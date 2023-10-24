import cn from 'classnames';
import { Link, useSearchParams } from 'react-router-dom';
import { SearchLink } from '../SearchLink';
import { getSearchWith } from '../../utils/searchHelper';

type Century = {
  [key: string]: string,
};

const centuries: Century = {
  sixteen: '16',
  seventeen: '17',
  eighteen: '18',
  nineteen: '19',
  twelve: '20',
};

export const PeopleFilters: React.FC = () => {
  const [searchParams, setSearchParams] = useSearchParams();

  const sexParam = searchParams.get('sex');
  const queryParam = searchParams.get('query') || '';
  const centuriesParam = searchParams.getAll('centuries') || [];

  const handleQueryTyping = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchParams(
      getSearchWith(searchParams, { query: event.target.value || null }),
    );
  };

  return (
    <nav className="panel">
      <p className="panel-heading">Filters</p>

      <p className="panel-tabs" data-cy="SexFilter">
        <SearchLink
          className={cn({
            'is-active': sexParam === null,
          })}
          params={{ sex: null }}
        >
          All
        </SearchLink>
        <SearchLink
          className={cn({
            'is-active': sexParam === 'm',
          })}
          params={{ sex: 'm' }}
        >
          Male
        </SearchLink>
        <SearchLink
          className={cn({
            'is-active': sexParam === 'f',
          })}
          params={{ sex: 'f' }}
        >
          Female
        </SearchLink>
      </p>

      <div className="panel-block">
        <p className="control has-icons-left">
          <input
            data-cy="NameFilter"
            type="search"
            className="input"
            placeholder="Search"
            value={queryParam}
            onChange={handleQueryTyping}
          />

          <span className="icon is-left">
            <i className="fas fa-search" aria-hidden="true" />
          </span>
        </p>
      </div>

      <div className="panel-block">
        <div className="level is-flex-grow-1 is-mobile" data-cy="CenturyFilter">
          <div className="level-left">
            {Object.keys(centuries).map(centuryKey => {
              const centuryValue = centuries[centuryKey];

              return (
                <SearchLink
                  key={centuryKey}
                  className={cn('button mr-1', {
                    'is-info': centuriesParam.includes(centuryValue),
                  })}
                  params={{
                    centuries: centuriesParam.includes(centuryValue)
                      ? centuriesParam.filter(cent => cent !== centuryValue)
                      : [...centuriesParam, centuryValue],
                  }}
                  data-cy="century"
                >
                  {centuryValue}
                </SearchLink>
              );
            })}
          </div>

          <div className="level-right ml-4">
            <SearchLink
              className={cn('button is-success', {
                'is-outlined': centuriesParam.length,
              })}
              params={{ centuries: null }}
              data-cy="centuryALL"
            >
              All
            </SearchLink>
          </div>
        </div>
      </div>

      <div className="panel-block">
        <Link
          to="#/people"
          className="button is-link is-outlined is-fullwidth"
        >
          Reset all filters
        </Link>
      </div>
    </nav>
  );
};
