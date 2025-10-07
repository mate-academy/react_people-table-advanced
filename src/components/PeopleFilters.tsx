import cn from 'classnames';
import { useSearchParams } from 'react-router-dom';
import { getSearchWith } from '../utils/searchHelper';
import { SearchLink } from './SearchLink';

export const PeopleFilters: React.FC = ({}) => {
  const [searchParams, setSearchParams] = useSearchParams();
  const centurys = ['16', '17', '18', '19', '20'];

  const valueQuery = searchParams.get('query') || '';
  const valueCenturys = searchParams.getAll('centuries');
  const valueSex = searchParams.get('sex');

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  function setSearchWith(params: any) {
    const search = getSearchWith(searchParams, params);

    setSearchParams(search);
  }

  function handleQueryChange(e: React.ChangeEvent<HTMLInputElement>) {
    const val = e.target.value;

    setSearchWith({ query: val.trim() || null });
  }

  function toggleCentury(c: string) {
    const newCentury = valueCenturys.includes(c)
      ? valueCenturys.filter(x => x !== c)
      : [...valueCenturys, c];

    setSearchWith({ centuries: newCentury || null });
  }

  return (
    <nav className="panel">
      <p className="panel-heading">Filters</p>

      <p className="panel-tabs" data-cy="SexFilter">
        <SearchLink
          className={cn('', {
            'is-active': !valueSex,
          })}
          params={{ sex: null }}
        >
          All
        </SearchLink>
        <SearchLink
          params={{ sex: 'm' }}
          className={cn('', {
            'is-active': valueSex === 'm',
          })}
        >
          Male
        </SearchLink>
        <SearchLink
          params={{ sex: 'f' }}
          className={cn('', {
            'is-active': valueSex === 'f',
          })}
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
            value={valueQuery}
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
            {centurys.map(centur => (
              <button
                key={centur}
                data-cy="century"
                className={cn('button mr-1', {
                  'is-info': valueCenturys.includes(centur),
                })}
                onClick={() => {
                  toggleCentury(centur);
                }}
              >
                {centur}
              </button>
            ))}
          </div>

          <div className="level-right ml-4">
            <SearchLink
              data-cy="centuryALL"
              className={cn('button is-success', {
                'is-outlined': valueCenturys.length,
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
          params={{ sex: null, centuries: null, query: null }}
        >
          Reset all filters
        </SearchLink>
      </div>
    </nav>
  );
};
