import { useNavigate, useSearchParams } from 'react-router-dom';
import cn from 'classnames';
import { SearchLink } from '../SearchLink';
import { getSearchWith } from '../../utils/searchHelper';

const centuriesData = ['16', '17', '18', '19', '20'];

export const PeopleFilters = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();

  const sex = searchParams.get('sex');
  const centuries = searchParams.getAll('centuries');
  const query = searchParams.get('query') || '';

  const handleChangeQuery = (newQuery: string) => {
    let newSearchParams: string;

    if (newQuery) {
      newSearchParams = getSearchWith(searchParams, { query: newQuery });
    } else {
      newSearchParams = getSearchWith(searchParams, { query: null });
    }

    navigate({ search: newSearchParams });
  };

  return (
    <nav className="panel">
      <p className="panel-heading">Filters</p>

      <p className="panel-tabs" data-cy="SexFilter">
        <SearchLink
          params={{ sex: null }}
          className={cn({ 'is-active': sex === null })}
        >
          All
        </SearchLink>

        <SearchLink
          params={{ sex: 'm' }}
          className={cn({ 'is-active': sex === 'm' })}
        >
          Male
        </SearchLink>

        <SearchLink
          params={{ sex: 'f' }}
          className={cn({ 'is-active': sex === 'f' })}
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
            value={query}
            onChange={({ target }) => handleChangeQuery(target.value)}
          />

          <span className="icon is-left">
            <i className="fas fa-search" aria-hidden="true" />
          </span>
        </p>
      </div>

      <div className="panel-block">
        <div className="level is-flex-grow-1 is-mobile" data-cy="CenturyFilter">
          <div className="level-left">
            {centuriesData.map(centurie => (
              <SearchLink
                key={centurie}
                data-cy="century"
                className={
                  cn('button mr-1', { 'is-info': centuries.includes(centurie) })
                }
                params={{
                  centuries: centuries.includes(centurie)
                    ? [...centuries.filter(c => c !== centurie)]
                    : [...centuries, centurie],
                }}
              >
                {centurie}
              </SearchLink>
            ))}
          </div>

          <div className="level-right ml-4">
            <SearchLink
              data-cy="centuryALL"
              params={{ centuries: null }}
              className={cn('button is-success',
                { 'is-outlined': !!centuries.length })}
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
            sex: null,
            query: null,
            centuries: null,
          }}
        >
          Reset all filters
        </SearchLink>
      </div>
    </nav>
  );
};
