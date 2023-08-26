import { Link, useSearchParams } from 'react-router-dom';
import cn from 'classnames';
import { SexFilter } from '../types/SexFilter';
import { getSearchWith } from '../utils/searchHelper';

export const PeopleFilters: React.FC = () => {
  const centurysData = ['16', '17', '18', '19', '20'];

  const [searchParams, setSearchParams] = useSearchParams();

  const sex = searchParams.get('sex') || '';
  const centuries = searchParams.getAll('centuries') || [];
  const query = searchParams.get('query') || '';

  function getFilterLinkTo(value: SexFilter) {
    return (
      {
        search: getSearchWith(
          searchParams, {
            sex: value || null,
          },
        ),
      }
    );
  }

  const handleQueryChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const search = getSearchWith(searchParams, {
      query: e.target.value || null,
    });

    setSearchParams(search);
  };

  return (
    <nav className="panel">
      <p className="panel-heading">Filters</p>

      <p className="panel-tabs" data-cy="SexFilter">
        <Link
          className={cn({ 'is-active': sex === SexFilter.All })}
          to={getFilterLinkTo(SexFilter.All)}
        >
          All
        </Link>

        <Link
          className={cn({ 'is-active': sex === SexFilter.Male })}
          to={getFilterLinkTo(SexFilter.Male)}
        >
          Male
        </Link>

        <Link
          className={cn({ 'is-active': sex === SexFilter.Female })}
          to={getFilterLinkTo(SexFilter.Female)}
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
            onChange={handleQueryChange}
            value={query}
          />

          <span className="icon is-left">
            <i className="fas fa-search" aria-hidden="true" />
          </span>
        </p>
      </div>

      <div className="panel-block">
        <div className="level is-flex-grow-1 is-mobile" data-cy="CenturyFilter">
          <div className="level-left">
            {centurysData.map(century => (
              <Link
                data-cy="century"
                className={
                  cn('button mr-1',
                    { 'is-info': centuries.includes(century) })
                }
                to={{
                  search: getSearchWith(
                    searchParams,
                    {
                      centuries: centuries.includes(century)
                        ? centuries.filter(cent => century !== cent)
                        : [...centuries, century],
                    },
                  ),
                }}
              >
                {century}
              </Link>
            ))}
          </div>

          <div className="level-right ml-4">
            <Link
              data-cy="centuryALL"
              className={cn('button is-success',
                { 'is-outlined': centuries.length })}
              to={{
                search: getSearchWith(
                  searchParams,
                  {
                    centuries: [],
                  },
                ),
              }}
            >
              All
            </Link>
          </div>
        </div>
      </div>

      <div className="panel-block">
        <Link
          className="button is-link is-outlined is-fullwidth"
          to={{ search: '' }}
        >
          Reset all filters
        </Link>
      </div>
    </nav>
  );
};
