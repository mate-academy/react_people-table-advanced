import classNames from 'classnames';
import { useSearchParams } from 'react-router-dom';
import { SearchLink } from './SearchLink';

type Props = {
  query: string | null;
};

export const PeopleFilters: React.FC<Props> = ({ query }) => {
  const centuries = ['16', '17', '18', '19', '20'];
  const [searchParams, setSearchParams] = useSearchParams();

  const handleCenturyParams = (century: string) => {
    return (searchParams.getAll('centuries').includes(century)
      ? searchParams.getAll('centuries').filter(c => c !== century)
      : [...searchParams.getAll('centuries'), century]);
  };

  const handleNameFilter = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newQuery = e.target.value;
    const params = new URLSearchParams(searchParams);

    params.set('query', newQuery);

    if (newQuery.length === 0) {
      params.delete('query');
    }

    setSearchParams(params);
  };

  return (
    <nav className="panel">
      <p className="panel-heading">Filters</p>

      <p className="panel-tabs" data-cy="SexFilter">
        <SearchLink
          params={{ sex: null }}
          className={classNames({
            'is-active': searchParams.get('sex') === null,
          })}
        >
          All
        </SearchLink>
        <SearchLink
          params={{ sex: 'm' }}
          className={classNames({
            'is-active': searchParams.get('sex') === 'm',
          })}
        >
          Male
        </SearchLink>
        <SearchLink
          params={{ sex: 'f' }}
          className={classNames({
            'is-active': searchParams.get('sex') === 'f',
          })}
        >
          Female
        </SearchLink>
      </p>

      <div className="panel-block">
        <p className="control has-icons-left">
          <SearchLink
            params={{ query }}
          >
            <input
              data-cy="NameFilter"
              type="search"
              className="input"
              placeholder="Search"
              value={query || ''}
              onChange={(e) => {
                handleNameFilter(e);
              }}
            />
          </SearchLink>
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
                params={{ centuries: handleCenturyParams(century) }}
                className={classNames('button mr-1', {
                  'is-info': searchParams.getAll('centuries').includes(century),
                })}
              >
                {century}
              </SearchLink>
            ))}
          </div>

          <div className="level-right ml-4">
            <SearchLink
              params={{ centuries: null }}
              data-cy="centuryALL"
              className={classNames('button is-success', {
                'is-outlined': searchParams.getAll('centuries').length > 0,
              })}
            >
              All
            </SearchLink>
          </div>
        </div>
      </div>

      <div className="panel-block">
        <SearchLink
          params={{ sex: null, centuries: null, query: null }}
          className="button is-link is-outlined is-fullwidth"
        >
          Reset all filters
        </SearchLink>
      </div>
    </nav>
  );
};
