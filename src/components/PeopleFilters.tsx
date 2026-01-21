import { useSearchParams } from 'react-router-dom';
import { SearchLink } from './SearchLink';
import classNames from 'classnames';
import { useEffect, useState } from 'react';

export const PeopleFilters = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [appliedQuery, setAppliedQuery] = useState(
    searchParams.get('query') || '',
  );
  const currentSex = searchParams.get('sex');
  const activeCenturies = searchParams.getAll('centuries');

  const getCenturyParams = (century: number) => {
    const centuryStr = century.toString();

    if (activeCenturies.includes(centuryStr)) {
      return {
        centuries: activeCenturies.filter(c => c !== centuryStr),
      };
    }

    return {
      centuries: [...activeCenturies, centuryStr],
    };
  };

  useEffect(() => {
    const timeoutId = setTimeout(() => {
      if (appliedQuery === (searchParams.get('query') || '')) {
        return;
      }

      const newParams = new URLSearchParams(searchParams);

      if (appliedQuery) {
        newParams.set('query', appliedQuery);
      } else {
        newParams.delete('query');
      }

      setSearchParams(newParams);
    }, 300);

    return () => clearTimeout(timeoutId);
  }, [appliedQuery, searchParams, setSearchParams]);

  const handleQueryChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setAppliedQuery(event.target.value);
  };

  const queryFromUrl = searchParams.get('query') || '';

  useEffect(() => {
    setAppliedQuery(queryFromUrl);
  }, [queryFromUrl]);

  return (
    <nav className="panel">
      <p className="panel-heading">Filters</p>

      <p className="panel-tabs" data-cy="SexFilter">
        <SearchLink
          params={{ sex: null }}
          className={classNames({ 'is-active': currentSex === null })}
        >
          All
        </SearchLink>

        <SearchLink
          params={{ sex: 'm' }}
          className={classNames({ 'is-active': currentSex === 'm' })}
        >
          Male
        </SearchLink>

        <SearchLink
          params={{ sex: 'f' }}
          className={classNames({ 'is-active': currentSex === 'f' })}
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
            value={appliedQuery}
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
            {[16, 17, 18, 19, 20].map(century => (
              <SearchLink
                key={century}
                params={getCenturyParams(century)}
                className={classNames('button', {
                  'is-info': activeCenturies.includes(century.toString()),
                })}
              >
                {century}th
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
        <SearchLink
          className="button is-link is-outlined is-fullwidth"
          params={{
            sex: null,
            query: null,
            centuries: null,
            sort: null,
            order: null,
          }}
        >
          Reset all filters
        </SearchLink>
      </div>
    </nav>
  );
};
