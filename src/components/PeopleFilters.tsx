import cn from 'classnames';
import debounce from 'lodash.debounce';
import {
  ChangeEvent,
  useCallback,
  useEffect,
  useMemo,
  useState,
} from 'react';
import { Link, useLocation, useSearchParams } from 'react-router-dom';

const centuries = ['16', '17', '18', '19', '20'];

export const PeopleFilters = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [query, setQuery] = useState('');
  const [debouncedQuery, setDebouncedQuery] = useState('');

  const { search } = useLocation();

  const currentCenturies = useMemo(() => {
    return searchParams.getAll('century');
  }, [searchParams]);

  const currentSex = useMemo(() => {
    return searchParams.get('sex');
  }, [searchParams]);

  const applyQuery = useCallback(
    debounce(setDebouncedQuery, 500),

    [],
  );

  const resetFilterHandler = useCallback(() => {
    const filtersToReset = ['century', 'sex', 'query'];

    filtersToReset.forEach(filter => searchParams.delete(filter));
    setSearchParams(searchParams);
    setQuery('');
  }, [searchParams]);

  useEffect(() => {
    if (!debouncedQuery.length) {
      searchParams.delete('query');
      setSearchParams(searchParams);
    } else {
      searchParams.set('query', debouncedQuery);
      setSearchParams(searchParams);
    }
  }, [debouncedQuery]);

  const queryHandler = (event: ChangeEvent<HTMLInputElement>) => {
    setQuery(event.target.value);
    applyQuery(event.target.value);
  };

  const centuryButtonHandler = (currentCentury: string) => {
    if (currentCenturies.includes(currentCentury)) {
      searchParams.delete('century');
      const newValues = currentCenturies
        .filter((century) => century !== currentCentury);

      newValues.map((century) => searchParams.append('century', century));
    } else {
      searchParams.append('century', currentCentury);
    }

    setSearchParams(searchParams);
  };

  const allCenturyHandler = () => {
    searchParams.delete('century');
    setSearchParams(searchParams);
  };

  const sexFilterHandler = (sex: string) => {
    searchParams.set('sex', sex);
    setSearchParams(searchParams);
  };

  const allSexHandler = () => {
    searchParams.delete('sex');
    setSearchParams(searchParams);
  };

  return (
    <nav className="panel">
      <p className="panel-heading">Filters</p>

      <p className="panel-tabs" data-cy="SexFilter">
        <Link
          className={cn({ 'is-active': !currentSex })}
          to={`people/${search}`}
          onClick={(event) => {
            event.preventDefault();
            allSexHandler();
          }}
        >
          All
        </Link>
        {['m', 'f'].map(sex => (
          <Link
            key={sex}
            className={cn({ 'is-active': currentSex === sex })}
            to={`people/${search}`}
            onClick={(event) => {
              event.preventDefault();
              sexFilterHandler(sex);
            }}
          >
            {sex === 'm'
              ? 'Male'
              : 'Female'}
          </Link>
        ))}
      </p>

      <div className="panel-block">
        <p className="control has-icons-left">
          <input
            data-cy="NameFilter"
            value={query}
            onChange={queryHandler}
            type="search"
            className="input"
            placeholder="Search"
          />

          <span className="icon is-left">
            <i className="fas fa-search" aria-hidden="true" />
          </span>
        </p>
      </div>

      <div className="panel-block">
        <div className="level is-flex-grow-1 is-mobile" data-cy="CenturyFilter">
          <div className="level-left">
            {centuries.map(century => (
              <button
                onClick={
                  () => centuryButtonHandler(century)
                }
                key={century}
                type="button"
                data-cy="century"
                className={cn(
                  'button mr-1',
                  { 'is-info': currentCenturies.includes(century) },
                )}
              >
                {century}
              </button>
            ))}
          </div>

          <div className="level-right ml-4">
            <button
              type="button"
              data-cy="centuryALL"
              className="button is-success is-outlined"
              onClick={allCenturyHandler}
            >
              All
            </button>
          </div>
        </div>
      </div>

      <div className="panel-block">
        <Link
          onClick={(event) => {
            event?.preventDefault();
            resetFilterHandler();
          }}
          className="button is-link is-outlined is-fullwidth"
          to={`people/${search}`}
        >
          Reset all filters
        </Link>
      </div>
    </nav>
  );
};
