import React, { useEffect, useMemo, useCallback } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import cn from 'classnames';
import { getSearchWith } from '../utils/searchHelper';
import { Person } from '../types';

interface Props {
  originalPeoples: Person[];
  setPeoples: (b: Person[]) => void;
}

export const PeopleFilters = ({ originalPeoples, setPeoples }: Props) => {
  const [searchParams, setSearchParams] = useSearchParams();
  const getSex = searchParams.get('sex');
  const query = searchParams.get('query') || '';

  const setSearchWith = (params: Record<string, string | null>) => {
    const search = getSearchWith(searchParams, params);

    setSearchParams(search);
  };

  const handleQueryChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchWith({ query: event.target.value || null });
  };

  const centuries = useMemo(
    () => searchParams.getAll('centuries') || [],
    [searchParams],
  );

  const getCenturyRange = (century: number): [number, number] => {
    const start = (century - 1) * 100 + 1;
    const end = century * 100;

    return [start, end];
  };

  const filterPeople = useCallback(() => {
    let filtered = originalPeoples;

    if (getSex) {
      filtered = originalPeoples.filter(person => person.sex === getSex);
    }

    if (query) {
      filtered = filtered.filter(
        person =>
          person.name.toLowerCase().includes(query.toLowerCase()) ||
          person.motherName?.toLowerCase().includes(query.toLowerCase()) ||
          person.fatherName?.toLowerCase().includes(query.toLowerCase()),
      );
    }

    if (centuries.length > 0) {
      filtered = filtered.filter(person =>
        centuries.some(century => {
          const [start, end] = getCenturyRange(parseInt(century, 10));

          return person.born >= start && person.born <= end;
        }),
      );
    }

    setPeoples(filtered);
  }, [originalPeoples, getSex, query, centuries, setPeoples]);

  useEffect(() => {
    filterPeople();
  }, [filterPeople]);

  return (
    <nav className="panel">
      <p className="panel-heading">Filters</p>
      <p className="panel-tabs" data-cy="SexFilter">
        <Link
          className={cn('', { 'is-active': !getSex })}
          to={{ search: getSearchWith(searchParams, { sex: null }) }}
        >
          All
        </Link>
        <Link
          className={cn('', { 'is-active': getSex === 'm' })}
          to={{ search: getSearchWith(searchParams, { sex: 'm' }) }}
        >
          Male
        </Link>
        <Link
          className={cn('', { 'is-active': getSex === 'f' })}
          to={{ search: getSearchWith(searchParams, { sex: 'f' }) }}
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
            value={query}
            onChange={event => handleQueryChange(event)}
          />
          <span className="icon is-left">
            <i className="fas fa-search" aria-hidden="true" />
          </span>
        </p>
      </div>

      <div className="panel-block">
        <div className="level is-flex-grow-1 is-mobile" data-cy="CenturyFilter">
          <div className="level-left">
            {[16, 17, 18, 19, 20].map(value => (
              <Link
                data-cy="century"
                key={value}
                className={cn('button mr-1', {
                  'is-info': centuries.includes(value.toString()),
                })}
                to={{
                  // eslint-disable-next-line
                  search: getSearchWith(searchParams, {
                    centuries: centuries.includes(value.toString()) // eslint-disable-next-line
                      ? centuries.filter( // eslint-disable-next-line
                          centurie => centurie !== value.toString(), // eslint-disable-next-line @typescript-eslint/indent
                        ) // eslint-disable-next-line @typescript-eslint/indent
                      : [...centuries, value.toString()],
                  }),
                }}
              >
                {value}
              </Link>
            ))}
          </div>

          <div className="level-right ml-4">
            <Link
              data-cy="centuryALL"
              className={cn('button is-success', {
                'is-outlined': centuries.length > 0,
              })}
              to={{ search: getSearchWith(searchParams, { centuries: [] }) }}
            >
              All
            </Link>
          </div>
        </div>
      </div>

      <div className="panel-block">
        <Link className="button is-link is-outlined is-fullwidth" to="/people">
          Reset all filters
        </Link>
      </div>
    </nav>
  );
};
