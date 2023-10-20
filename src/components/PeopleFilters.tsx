import { useState } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import classNames from 'classnames';
import { SearchLink } from './SearchLink';

export const PeopleFilters = () => {
  const centuries = [16, 17, 18, 19, 20];
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const [query, setQuery] = useState<string>('');

  const getCenturyParams = (century: string) => {
    const currentCenturies = searchParams.getAll('centuries');

    return currentCenturies.includes(century)
      ? currentCenturies.filter(item => item !== century)
      : [String(century), ...searchParams.getAll('centuries')];
  };

  const handleQuery: React.ChangeEventHandler<HTMLInputElement> = (event) => {
    const newQuery = event.target.value;

    setQuery(newQuery);
    const updatedSearchParams = new URLSearchParams(searchParams.toString());

    if (newQuery) {
      updatedSearchParams.set('query', newQuery);
    } else {
      updatedSearchParams.delete('query');
    }

    navigate(`?${updatedSearchParams.toString()}`);
  };

  return (
    <nav className="panel">
      <p className="panel-heading">Filters</p>

      <p className="panel-tabs" data-cy="SexFilter">
        <SearchLink
          className={searchParams.get('sex') === null ? 'is-active' : ''}
          params={{ sex: null }}
        >
          All
        </SearchLink>
        <SearchLink
          className={searchParams.get('sex') === 'm' ? 'is-active' : ''}
          params={{ sex: 'm' }}
        >
          Male
        </SearchLink>
        <SearchLink
          className={searchParams.get('sex') === 'f' ? 'is-active' : ''}
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
            value={query}
            onChange={handleQuery}
          />

          <span className="icon is-left">
            <i className="fas fa-search" aria-hidden="true" />
          </span>
        </p>
      </div>

      <div className="panel-block">
        <div className="level is-flex-grow-1 is-mobile" data-cy="CenturyFilter">
          <div className="level-left">
            {centuries.map(century => {
              return (
                <SearchLink
                  key={century}
                  data-cy="century"
                  className={classNames('button mr-1', {
                    'is-info': searchParams.getAll('centuries')
                      .includes(String(century)),
                  })}
                  params={{
                    centuries: getCenturyParams(String(century)),
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
              className={classNames('button is-success', {
                'is-outlined': searchParams.getAll('centuries').length > 0,
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
          params={{ sex: null, query: null, centuries: null }}
        >
          Reset all filters
        </SearchLink>
      </div>
    </nav>
  );
};
