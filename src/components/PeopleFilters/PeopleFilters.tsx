import classNames from 'classnames';
import { useSearchParams } from 'react-router-dom';
import { SearchLink } from '../SearchLink';
import { getSearchWith } from '../../utils/searchHelper';

export const PeopleFilters = () => {
  const [searchParams, setSearchParams] = useSearchParams();

  const getCenturySearchParams = (century: string) => {
    const allCenturies = searchParams.getAll('centuries');

    return allCenturies.includes(century)
      ? allCenturies.filter((current) => current !== century)
      : [String(century), ...allCenturies];
  };

  return (
    <nav className="panel">
      <p className="panel-heading">Filters</p>

      <p className="panel-tabs" data-cy="SexFilter">
        <SearchLink
          params={{ sex: null }}
          className={classNames({
            'is-active': !searchParams.has('sex'),
          })}
        >
          All
        </SearchLink>
        <SearchLink
          params={{ sex: 'f' }}
          className={classNames({
            'is-active': searchParams.get('sex') === 'f',
          })}
        >
          Female
        </SearchLink>
        <SearchLink
          params={{ sex: 'm' }}
          className={classNames({
            'is-active': searchParams.get('sex') === 'm',
          })}
        >
          Male
        </SearchLink>
      </p>

      <div className="panel-block">
        <p className="control has-icons-left">
          <input
            data-cy="NameFilter"
            type="search"
            className="input"
            placeholder="Search"
            value={searchParams.has('query')
              ? String(searchParams.get('query'))
              : ''}
            onChange={(event) => {
              const currentParams = getSearchWith(searchParams, {
                query: event.target.value || null,
              });

              setSearchParams(currentParams);
            }}
          />

          <span className="icon is-left">
            <i className="fas fa-search" aria-hidden="true" />
          </span>
        </p>
      </div>

      <div className="panel-block">
        <div className="level is-flex-grow-1 is-mobile" data-cy="CenturyFilter">
          <div className="level-left">
            {[16, 17, 18, 19, 20].map((century) => {
              return (
                <SearchLink
                  key={century}
                  data-cy="century"
                  className={
                    classNames('button mr-1', {
                      'is-info': searchParams.getAll('centuries')
                        .includes(String(century)),
                    })
                  }
                  params={{
                    centuries: getCenturySearchParams(String(century)),
                  }}
                >
                  {century}
                </SearchLink>
              );
            })}
          </div>

          <div className="level-right ml-4">
            <SearchLink
              data-cy="centuryALL"
              className={
                classNames('button is-success',
                  { 'is-outlined': searchParams.has('centuries') })
              }
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
            sex: null, centuries: null, query: null,
          }}
        >
          Reset all filters
        </SearchLink>
      </div>
    </nav>
  );
};
