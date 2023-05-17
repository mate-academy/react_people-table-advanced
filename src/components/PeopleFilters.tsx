import classNames from 'classnames';
import React, { FC } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import { Person } from '../types';
import { getSearchWith } from '../utils/searchHelper';

interface Props {
  setPeople: (people: Person[] | any) => void;
}

enum FilterBy {
  ALL = 'all',
  SEX = 'sex',
  CENTURY = 'century',
}

export const PeopleFilters: FC<Props> = ({ setPeople }) => {
  const [searchParams, setSearchParams] = useSearchParams();
  const centuries = searchParams.getAll('centuries') || [];
  const query = searchParams.get('query') || '';
  const sex = searchParams.get('sex') || '';

  const prepare = (element: string) => {
    return element.replace(/\s/g, "").toLowerCase().trim();
  }

  const onQueryChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchParams(
      getSearchWith(searchParams, { query: e.target.value || null }),
    );
    if (!!query.length) {
      setPeople((currPeople: Person[]) => {
        return currPeople
          .filter((person: Person) => {
            const preparedQuery = prepare(query);
            const preparedName = prepare(person.name);
  
            return prepare(preparedName).includes(preparedQuery)
          });
      });
    }
  };

  const filterPeople = (filterBy: string = FilterBy.ALL) => {
    switch (filterBy) {
      case FilterBy.SEX:
        setPeople((currPeople: Person[]) => {
          return currPeople.filter((person: Person) => person.sex === sex);
        });
        break;

      case FilterBy.CENTURY:
        setPeople((currPeople: Person[]) => currPeople.filter(person => {
          const convertedYearToCentury = Math.ceil(person.born / 100);

          return centuries.includes(convertedYearToCentury.toString());
        }));
        break;

      default:

        break;
    }
  };

  return (
    <nav className="panel">
      <p className="panel-heading">Filters</p>

      <p className="panel-tabs" data-cy="SexFilter">
        <Link
          className={
            classNames({ 'is-active': !sex })
          }
          to={{
            search: getSearchWith(searchParams, {
              sex: null,
            }),
          }}
          onClick={() => filterPeople(FilterBy.ALL)}
        >
          All
        </Link>
        <Link
          className={
            classNames({ 'is-active': sex === 'm' })
          }
          to={{
            search: getSearchWith(searchParams, {
              sex: 'm',
            }),
          }}
          onClick={() => filterPeople(FilterBy.SEX)}
        >
          Male
        </Link>
        <Link
          className={
            classNames({ 'is-active': sex === 'f' })
          }
          to={{
            search: getSearchWith(searchParams, {
              sex: 'f',
            }),
          }}
          onClick={() => filterPeople(FilterBy.SEX)}
        >
          Female
        </Link>
      </p>

      <div className="panel-block">
        <p className="control has-icons-left">
          <input
            data-cy="NameFilter"
            value={query}
            onChange={onQueryChange}
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
            {['16', '17', '18', '19', '20'].map(century => (
              <Link
                key={century}
                data-cy="century"
                className={
                  classNames('button mr-1',
                    { 'is-info': centuries.includes(century) })
                }
                to={{
                  search: getSearchWith(searchParams, {
                    centuries: centuries.includes(century)
                      ? centuries.filter(c => c !== century)
                      : [...centuries, century],
                  }),
                }}
                onClick={() => filterPeople(FilterBy.CENTURY)}
              >
                {century}
              </Link>
            ))}
          </div>

          <div className="level-right ml-4">
            <Link
              data-cy="centuryALL"
              className={classNames('button is-success',
                { 'is-outlined': centuries.length })}
              to={{
                search: getSearchWith(searchParams, {
                  centuries: null,
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
          to={{
            search: getSearchWith(searchParams, {
              centuries: null,
              query: null,
              sex: null,
            }),
          }}
        >
          Reset all filters
        </Link>
      </div>
    </nav>
  );
};
