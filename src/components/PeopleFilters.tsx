/* eslint-disable @typescript-eslint/indent */
import {
  Link,
  useLocation,
  useParams,
  useSearchParams,
} from 'react-router-dom';
import { Person } from '../types';
import { Dispatch, SetStateAction, useEffect, useState } from 'react';
import classNames from 'classnames';
import { getSearchWith } from '../utils/searchHelper';

type Props = {
  people: Person[];
  setFilteredPeople: Dispatch<SetStateAction<Person[]>>;
};

export const PeopleFilters: React.FC<Props> = ({
  people,
  setFilteredPeople,
}) => {
  enum FilterBy {
    all = '',
    male = 'm',
    female = 'f',
  }

  const { slug } = useParams();
  const { pathname, search } = useLocation();
  const [searchParams, setSearchParams] = useSearchParams();

  const [value, setValue] = useState('');

  const sex = searchParams.get('sex') || '';
  const centuries = searchParams.getAll('centuries') || [];

  useEffect(() => {
    const filtered = people
      .filter(person => {
        switch (sex) {
          case 'm':
            return person.sex === 'm';
          case 'f':
            return person.sex === 'f';
          default:
            return person;
        }
      })
      .filter(person => {
        if (!value) {
          return true;
        }

        return [person.name, person.motherName, person.fatherName].some(field =>
          field?.toLocaleUpperCase().includes(value.toLocaleUpperCase()),
        );
      })
      .filter(person => {
        if (centuries.length === 0) {
          return person;
        }

        const century = Math.floor((person.born - 1) / 100 + 1);

        if (centuries.some(c => c === century.toString())) {
          return person;
        }
      });

    setFilteredPeople(filtered);
  }, [searchParams, people, value]);

  const handleCenturyClick = (century: string): string => {
    const current = searchParams.getAll('centuries');

    if (current.includes(century)) {
      const currentIndex = current.indexOf(century);

      return getSearchWith(searchParams, {
        centuries: [
          ...current.slice(0, currentIndex),
          ...current.slice(currentIndex + 1),
        ],
      });
    } else {
      return getSearchWith(searchParams, {
        centuries: [...centuries, century],
      });
    }
  };

  const isActived = (century: string) => {
    if (centuries.includes(century)) {
      return true;
    }
    return false;
  };

  return (
    <nav className="panel">
      <p className="panel-heading">Filters</p>

      <p className="panel-tabs" data-cy="SexFilter">
        <Link
          className={classNames({ 'is-active': sex === FilterBy.all })}
          to={`?${getSearchWith(searchParams, { sex: null })}`}
        >
          All
        </Link>
        <Link
          className={classNames({ 'is-active': sex === FilterBy.male })}
          to={`${pathname}?${getSearchWith(searchParams, { sex: FilterBy.male })}`}
        >
          Male
        </Link>
        <Link
          className={classNames({ 'is-active': sex === FilterBy.female })}
          to={`${pathname}?${getSearchWith(searchParams, { sex: FilterBy.female })}`}
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
            value={value}
            onChange={e => {
              setValue(e.target.value);
              setSearchParams(
                e.target.value === ''
                  ? getSearchWith(searchParams, { query: null })
                  : getSearchWith(searchParams, { query: e.target.value }),
              );
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
            <Link
              data-cy="century"
              className={classNames('button mr-1', {
                'is-info': isActived('16'),
              })}
              to={{
                pathname,
                search: `?${handleCenturyClick('16')}`,
              }}
            >
              16
            </Link>

            <Link
              data-cy="century"
              className={classNames('button mr-1', {
                'is-info': isActived('17'),
              })}
              to={{
                pathname,
                search: `?${handleCenturyClick('17')}`,
              }}
            >
              17
            </Link>

            <Link
              data-cy="century"
              className={classNames('button mr-1', {
                'is-info': isActived('18'),
              })}
              to={{
                pathname,
                search: `?${handleCenturyClick('18')}`,
              }}
            >
              18
            </Link>

            <Link
              data-cy="century"
              className={classNames('button mr-1', {
                'is-info': isActived('19'),
              })}
              to={{
                pathname,
                search: `?${handleCenturyClick('19')}`,
              }}
            >
              19
            </Link>

            <Link
              data-cy="century"
              className={classNames('button mr-1', {
                'is-info': isActived('20'),
              })}
              to={{
                pathname,
                search: `?${handleCenturyClick('20')}`,
              }}
            >
              20
            </Link>
          </div>

          <div className="level-right ml-4">
            <Link
              data-cy="centuryALL"
              className={classNames('button is-success', {
                'is-outlined': centuries.length > 0,
              })}
              to={{
                pathname,
                search: `?${getSearchWith(searchParams, { centuries: null })}`,
              }}
            >
              All
            </Link>
          </div>
        </div>
      </div>

      <div className="panel-block">
        <a className="button is-link is-outlined is-fullwidth" href="#/people">
          Reset all filters
        </a>
      </div>
    </nav>
  );
};
