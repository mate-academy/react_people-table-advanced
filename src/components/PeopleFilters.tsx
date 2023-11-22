import React, { useEffect } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import cn from 'classnames';
import { Person } from '../types';
import { getSearchWith } from '../utils/searchHelper';
import {
  ALL_KEY,
  CENTURIES_KEY,
  QUERY_KEY,
  SEX_KEY,
  centuries,
  sortBySex,
} from '../utils/constants';

type Props = {
  setFilteredPeople: React.Dispatch<React.SetStateAction<Person[]>>,
  allPeople: Person[];
};

export const PeopleFilters: React.FC<Props> = ({
  setFilteredPeople,
  allPeople,
}) => {
  const [searchParams, setSearchParams] = useSearchParams();
  const centuriesFromParams = searchParams.getAll(CENTURIES_KEY) || [];

  useEffect(() => {
    let filteredPeople = [...allPeople];
    const query = searchParams.get(QUERY_KEY) || '';
    const formattedQuery = query.toLowerCase().trim();

    if (formattedQuery) {
      filteredPeople = filteredPeople?.filter(p => p.name.toLowerCase()
        .includes(formattedQuery)
        || p.motherName?.toLowerCase().includes(formattedQuery)
        || p.fatherName?.toLowerCase()
          .includes(formattedQuery));
    }

    const sexParam = searchParams.get(SEX_KEY) || '';

    if (sexParam === ALL_KEY) {
      searchParams.delete(SEX_KEY);
    }

    if (searchParams.get(SEX_KEY)) {
      filteredPeople = filteredPeople
        .filter(p => p.sex === searchParams.get(SEX_KEY)?.slice(0, 1));
    }

    const centuriesToFilter = searchParams.getAll(CENTURIES_KEY);

    if (centuriesToFilter && centuriesToFilter.length) {
      filteredPeople = filteredPeople
        .filter(p => centuriesToFilter
          .includes((p.born + 99).toString().slice(0, 2)));
    }

    setFilteredPeople(filteredPeople);
  }, [searchParams]);

  const handleSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
    const params = new URLSearchParams(searchParams);

    params.set(QUERY_KEY, event.target.value);

    if (!event.target.value) {
      params.delete(QUERY_KEY);
    }

    setSearchParams(params);
  };

  return (
    <nav className="panel">
      <p className="panel-heading">Filters</p>

      <p className="panel-tabs" data-cy="SexFilter">
        {sortBySex.map(key => (
          <Link
            to={{
              search: getSearchWith(searchParams, {
                [SEX_KEY]: key === ALL_KEY ? null : key.toLowerCase(),
              }),
            }}
            key={key}
            className={cn({
              'is-active': (!searchParams.get(SEX_KEY) && key === ALL_KEY)
              || searchParams.get(SEX_KEY) === key.toLowerCase(),
            })}
          >
            {key}
          </Link>
        ))}

      </p>

      <div className="panel-block">
        <p className="control has-icons-left">
          <input
            data-cy="NameFilter"
            type="search"
            className="input"
            placeholder="Search"
            value={searchParams.get(QUERY_KEY) || ''}
            onChange={handleSearch}
          />

          <span className="icon is-left">
            <i
              className="fas fa-search"
              aria-hidden="true"
              onClick={() => searchParams.delete(QUERY_KEY)}
            />
          </span>
        </p>
      </div>

      <div className="panel-block">
        <div className="level is-flex-grow-1 is-mobile" data-cy="CenturyFilter">
          <div className="level-left">
            {centuries.map(century => (
              <Link
                to={{
                  search: getSearchWith(searchParams, {
                    [CENTURIES_KEY]: centuriesFromParams
                      .includes(century)
                      ? centuriesFromParams
                        .filter(c => c !== century)
                      : [...centuriesFromParams, century],
                  }),
                }}
                key={century}
                data-cy="century"
                className={cn('button mr-1', {
                  'is-info': searchParams
                    .getAll(CENTURIES_KEY).includes(century),
                })}
              >
                {century}
              </Link>
            ))}
          </div>

          <div className="level-right ml-4">
            <Link
              data-cy="centuryALL"
              className={cn('button is-success',
                {
                  'is-outlined': !!searchParams
                    .getAll(CENTURIES_KEY)?.length,
                })}
              to={{
                search: getSearchWith(searchParams, {
                  [CENTURIES_KEY]: null,
                }),
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
          to="/people"
        >
          Reset all filters
        </Link>
      </div>
    </nav>
  );
};
