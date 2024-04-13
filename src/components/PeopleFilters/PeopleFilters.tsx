import { Link, useSearchParams } from 'react-router-dom';
import { Filter } from '../../types/Filter';
import cn from 'classnames';
import { useMemo, useState } from 'react';
import { Person } from '../../types';

type Props = {
  setResultPeopleArray: (people: Person[]) => void;
  people: Person[];
};

export const PeopleFilters: React.FC<Props> = ({
  setResultPeopleArray,
  people,
}) => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [queryValue, setQueryValue] = useState('');

  const query = searchParams.get('query') || '';
  const sexFilter = searchParams.get('sex') || Filter.All;
  const centuries = useMemo(
    () => searchParams.getAll('centuries') || [],
    [searchParams],
  );

  const centuryArray = ['16', '17', '18', '19', '20'];

  function getFilteredPeople(
    peopleArray: Person[],

    queryParam: string,
    filter: string,
    centuriesParam: string[],
  ) {
    const copyPeopleArray = [...peopleArray];
    let result = copyPeopleArray;

    switch (filter) {
      case Filter.All:
        break;
      case Filter.Male:
        result = copyPeopleArray.filter(person => person.sex === 'm');
        break;
      case Filter.Female:
        result = copyPeopleArray.filter(person => person.sex === 'f');
        break;
    }

    if (queryParam) {
      result = result.filter(
        person =>
          person.name.toLowerCase().includes(queryParam.toLocaleLowerCase()) ||
          person.motherName
            ?.toLowerCase()
            .includes(queryParam.toLocaleLowerCase()) ||
          person.fatherName
            ?.toLowerCase()
            .includes(queryParam.toLocaleLowerCase()),
      );
    }

    if (centuriesParam.length > 0) {
      result = result.filter(person =>
        centuriesParam.includes(Math.ceil(person.born / 100).toString()),
      );
    }

    if (centuriesParam.length === 0) {
      return result;
    }

    return result;
  }

  const resultPeopleArray = useMemo(
    () => getFilteredPeople(people, query, sexFilter, centuries),
    [centuries, people, query, sexFilter],
  );

  setResultPeopleArray(resultPeopleArray);

  type Param = string | Filter;
  type Params = {
    [key: string]: Param[] | Param | null;
  };

  function getSearchWith(params: Params, search?: string | URLSearchParams) {
    const newParams = new URLSearchParams(search);

    for (const [key, value] of Object.entries(params)) {
      if (value === null) {
        newParams.delete(key);
      } else if (Array.isArray(value)) {
        newParams.delete(key);
        value.forEach(item => newParams.append(key, item.toString()));
      } else {
        newParams.set(key, value.toString());
      }
    }

    return newParams.toString();
  }

  function setSearchWith(params: Params) {
    const search = getSearchWith(params, searchParams);

    setSearchParams(search);
  }

  const getCenturies = (currentCentury: string) => {
    const currentCenturies = centuries.includes(currentCentury)
      ? centuries.filter(ch => ch !== currentCentury)
      : [...centuries, currentCentury];

    return currentCenturies;
  };

  const allCenturiesClasses = cn('button is-success is-outlined', {
    'is-active': centuries.length === 0,
  });

  return (
    <nav className="panel">
      <p className="panel-heading">Filters</p>

      <p className="panel-tabs" data-cy="SexFilter">
        <Link
          to={{ search: getSearchWith({ sex: null }, searchParams) }}
          className={cn({
            'is-active': sexFilter === Filter.All,
          })}
        >
          All
        </Link>

        <Link
          to={{ search: getSearchWith({ sex: Filter.Male }, searchParams) }}
          className={cn({
            'is-active': sexFilter === Filter.Male,
          })}
        >
          Male
        </Link>
        <Link
          to={{ search: getSearchWith({ sex: Filter.Female }, searchParams) }}
          className={cn({
            'is-active': sexFilter === Filter.Female,
          })}
        >
          Female
        </Link>
      </p>

      <div className="panel-block">
        <p className="control has-icons-left">
          <input
            data-cy="NameFilter"
            type="search"
            value={queryValue}
            className="input"
            placeholder="Search"
            onChange={e => {
              setQueryValue(e.target.value);
              setSearchWith({ query: e.target.value || null });
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
            {centuryArray.map(century => (
              <Link
                key={century}
                data-cy="century"
                to={{
                  search: getSearchWith(
                    {
                      centuries: getCenturies(century),
                    },
                    searchParams,
                  ),
                }}
                className={cn('button mr-1', {
                  'is-info': centuries.includes(century),
                })}
              >
                {century}
              </Link>
            ))}
          </div>

          <div className="level-right ml-4">
            <Link
              className={allCenturiesClasses}
              data-cy="centuryALL"
              to={{ search: getSearchWith({ centuries: null }, searchParams) }}
            >
              All
            </Link>
          </div>
        </div>
      </div>

      <div className="panel-block">
        <Link
          className="button is-link is-outlined is-fullwidth"
          to={{ search: '' }}
          onClick={() => setQueryValue('')}
        >
          Reset all filters
        </Link>
      </div>
    </nav>
  );
};
