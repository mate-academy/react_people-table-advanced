import { useEffect } from 'react';
import { SearchLink } from './SearchLink';
import classNames from 'classnames';
import { useSearchParams } from 'react-router-dom';
import { getSearchWith } from '../utils/searchHelper';

const centuries = [16, 17, 18, 19, 20];

export const PeopleFilters = () => {
  const [searchParams, setSearchParams] = useSearchParams();

  const filterBySex = searchParams.get('sex') || '';
  const filterByQuery = searchParams.get('query') || '';
  const filterByCenturies = searchParams.getAll('centuries');
  const sortBy = searchParams.get('sortBy') || '';

  const handleSearchQuery = (event: React.ChangeEvent<HTMLInputElement>) => {
    const newQuery = event.target.value.trim() ? event.target.value : '';
    const newSearchParams = getSearchWith(searchParams, {
      query: newQuery,
    });

    setSearchParams(newSearchParams);
  };

  const centuriesUpdate = (newCentury: string) => {
    return {
      centuries: filterByCenturies.includes(newCentury)
        ? [...filterByCenturies].filter(century => century !== newCentury)
        : [...filterByCenturies, newCentury],
    };
  };

  useEffect(() => {
    const newSearchParams = new URLSearchParams(searchParams);

    if (!filterBySex) {
      newSearchParams.delete('sex');
    }

    if (!filterByQuery) {
      newSearchParams.delete('query');
    }

    if (!sortBy) {
      newSearchParams.delete('sortBy');
    }

    setSearchParams(newSearchParams);
  }, [filterByQuery, filterBySex, searchParams, setSearchParams, sortBy]);

  return (
    <nav className="panel">
      <p className="panel-heading">Filters</p>

      <p className="panel-tabs" data-cy="SexFilter">
        <SearchLink
          params={{ sex: '' }}
          className={classNames({ 'is-active': filterBySex === '' })}
        >
          All
        </SearchLink>

        <SearchLink
          params={{ sex: 'm' }}
          className={classNames({ 'is-active': filterBySex === 'm' })}
        >
          Male
        </SearchLink>

        <SearchLink
          params={{ sex: 'f' }}
          className={classNames({ 'is-active': filterBySex === 'f' })}
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
            value={filterByQuery}
            onChange={handleSearchQuery}
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
                  data-cy="century"
                  className={classNames('button', 'mr-1', {
                    'is-info': filterByCenturies.includes(century.toString()),
                  })}
                  params={centuriesUpdate(century.toString())}
                  key={century}
                >
                  {century}
                </SearchLink>
              );
            })}
          </div>

          <div className="level-right ml-4">
            <SearchLink
              data-cy="centuryALL"
              className={classNames('button', 'is-success', {
                'is-outlined': filterByCenturies.length,
              })}
              params={{ centuries: [] }}
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
            centuries: [],
            sex: '',
            query: '',
          }}
        >
          Reset all filters
        </SearchLink>
      </div>
    </nav>
  );
};
