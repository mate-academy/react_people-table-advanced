import classNames from 'classnames';
import debounce from 'lodash/debounce';
import { Person } from '../types/Person';
import { useEffect, useRef, useState } from 'react';

import {
  getSaveSearchParams,
  searchParamsSetSex,
  searchQueryParams,
} from '../utils/utilsPeopleFilters';

import { Link, NavLink, useLocation, useSearchParams } from 'react-router-dom';

type Props = {
  setPeoplesList: (Set: Person[] | null) => void;
  initialList: Person[] | null;
};

export const PeopleFilters: React.FC<Props> = ({
  initialList,
  setPeoplesList,
}) => {
  const [inputValue, setInputValue] = useState<string>('');
  const [searchParams, setSearchParams] = useSearchParams();
  const { search } = useLocation();

  if (!initialList) {
    return null;
  }

  const debouncedFilter = useRef(
    debounce((list: Person[], filterText: string) => {
      const filtered = list.filter(
        person =>
          typeof person.father === 'string' &&
          person.father.toLowerCase().includes(filterText.toLowerCase()),
      );

      setPeoplesList(filtered);
    }, 200),
  );

  useEffect(() => {
    const centuriesValues = searchParams.getAll('centuries');
    const sexSearchParams = searchParams.get('sex');

    let filtered: Person[] | null = null;
    let result: Person[] | null = null;

    if (sexSearchParams === 'm') {
      filtered = initialList.filter(person => person.sex === 'm');
    } else if (sexSearchParams === 'f') {
      filtered = initialList.filter(person => person.sex === 'f');
    } else {
      filtered = initialList;
    }

    if (searchParams.get('centuries')) {
      result = filtered.filter(person => {
        const century = Math.ceil(person.born / 100).toString();

        return centuriesValues.includes(century);
      });
    } else {
      result = filtered;
    }

    debouncedFilter.current(result, inputValue);

    /*
      const filtered = initialList
      .filter(p => sexSearchParams ? p.sex === sexSearchParams : true)
      .filter(p => {
        if (centuriesValues.length === 0) return true;
        const century = Math.ceil(p.born / 100).toString();
        return centuriesValues.includes(century);
      });

      setPeoplesList(filtered);
    */
  }, [searchParams, initialList, inputValue]);

  return (
    <nav className="panel">
      <p className="panel-heading">Filters</p>

      <p className="panel-tabs" data-cy="SexFilter">
        <NavLink
          className={({ isActive }) =>
            isActive && search === '' ? 'is-active' : ''
          }
          to="/people"
        >
          All
        </NavLink>
        <Link
          className={classNames({
            'is-active': searchQueryParams(searchParams, 'sex', 'm'),
          })}
          to={{ search: searchParamsSetSex(searchParams, 'sex', 'm') }}
        >
          Male
        </Link>
        <Link
          className={classNames({
            'is-active': searchQueryParams(searchParams, 'sex', 'f'),
          })}
          to={{ search: searchParamsSetSex(searchParams, 'sex', 'f') }}
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
            value={inputValue}
            onChange={e => {
              setInputValue(e.target.value);
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
            {['16', '17', '18', '19', '20'].map(item => {
              const isActive = searchQueryParams(
                searchParams,
                'centuries',
                item,
              );

              return (
                <button
                  key={item + 3}
                  data-cy="century"
                  className={classNames('button mr-1', {
                    'is-info': isActive,
                  })}
                  onClick={() => {
                    const newSearch = getSaveSearchParams(
                      searchParams,
                      'centuries',
                      item,
                    );

                    setSearchParams(newSearch);
                  }}
                >
                  {item}
                </button>
              );
            })}
          </div>

          <div className="level-right ml-4">
            <Link
              data-cy="centuryALL"
              className="button is-success is-outlined"
              to="/people"
            >
              All
            </Link>
          </div>
        </div>
      </div>

      <div className="panel-block">
        <a className="button is-link is-outlined is-fullwidth" href="/people">
          Reset all filters
        </a>
      </div>
    </nav>
  );
};
