import { useEffect, useState } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import { SexFilter } from '../types/SexFilter';
import classNames from 'classnames';
import { getSearchWith } from '../utils/searchHelper';
import type { PeopleFiltersType } from '../types/PeopleFiltersType';

const SEX_FILTERS = [
  { id: 0, label: 'All', value: null },
  { id: 1, label: 'Male', value: SexFilter.MALE },
  { id: 2, label: 'Female', value: SexFilter.FEMALE },
];

const centuries = [
  { id: 0, value: '16' },
  { id: 1, value: '17' },
  { id: 2, value: '18' },
  { id: 3, value: '19' },
  { id: 4, value: '20' },
];

export const PeopleFilters = ({
  peopleList,
  onPeople,
  onError,
}: PeopleFiltersType) => {
  const [searchParams, setSearchParams] = useSearchParams();
  const currentSex = searchParams.get('sex');
  const allCenturies = searchParams.getAll('centuries');
  const [info, setInfo] = useState<boolean>(false);
  const [originalList, setOriginalList] = useState(peopleList);
  const [query, setQuery] = useState<string>('');
  const [isInitialized, setIsInitialized] = useState(false);

  const getCentury = (birthYear: number): string => {
    return Math.ceil(birthYear / 100).toString();
  };

  const applyAllFilters = (
    nameQuery: string,
    sex: string | null,
    centuriesList: string[],
  ) => {
    let filtered = originalList;

    if (nameQuery.length > 0) {
      const searchLower = nameQuery.toLocaleLowerCase();

      filtered = filtered.filter(item =>
        [item.name, item.motherName, item.fatherName].some(field =>
          field?.toLocaleLowerCase().includes(searchLower),
        ),
      );
    }

    if (sex) {
      filtered = filtered.filter(item => item.sex === sex);
    }

    if (centuriesList.length > 0) {
      filtered = filtered.filter(item =>
        centuriesList.includes(getCentury(item.born)),
      );
    }

    if (filtered.length > 0) {
      onPeople(filtered);
      onError?.('');
    } else if (nameQuery.length > 0 || sex || centuriesList.length > 0) {
      onError?.('There are no people matching the current search criteria');
      onPeople([]);
    } else {
      onPeople(originalList);
      onError?.('');
    }
  };

  useEffect(() => {
    setOriginalList(peopleList);
  }, [peopleList]);

  useEffect(() => {
    if (isInitialized) {
      return;
    }

    const queryFromUrl = searchParams.get('query') || '';
    const sexFromUrl = searchParams.get('sex');
    const centuriesFromUrl = searchParams.getAll('centuries');

    setQuery(queryFromUrl);

    applyAllFilters(queryFromUrl, sexFromUrl, centuriesFromUrl);
    setIsInitialized(true);
  }, []);

  const handleNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;

    setQuery(value);

    applyAllFilters(value, currentSex, allCenturies);

    const searchString = getSearchWith(searchParams, {
      query: value.length > 0 ? value : null,
    });

    setSearchParams(searchString);
  };

  const handleSexChange = (label: string | null) => {
    applyAllFilters(query, label, allCenturies);
    const searchString = getSearchWith(searchParams, {
      sex: label,
    });

    setSearchParams(searchString);
  };

  const handleCenturiesChange = (label: string) => {
    const selectedCenturies = allCenturies.includes(label)
      ? allCenturies.filter(item => item !== label)
      : [...allCenturies, label];

    applyAllFilters(query, currentSex, selectedCenturies);

    const searchString = getSearchWith(searchParams, {
      centuries: selectedCenturies.length > 0 ? selectedCenturies : null,
    });

    setSearchParams(searchString);
  };

  const clearAllFilters = () => {
    const params = new URLSearchParams();

    onPeople(originalList);
    setQuery('');
    setSearchParams(params);
    setInfo(false);
  };

  return (
    <>
      <nav className="panel">
        <p className="panel-heading">Filters</p>
        <p className="panel-tabs" data-cy="SexFilter">
          {SEX_FILTERS.map(item => {
            const searchString = getSearchWith(searchParams, {
              sex: item.value,
            });

            return (
              <Link
                key={item.id}
                to={`/people${searchString ? `?${searchString}` : ''}`}
                className={currentSex === item.value ? 'is-active' : ''}
                onClick={e => {
                  e.preventDefault();
                  handleSexChange(item.value);
                }}
              >
                {item.label}
              </Link>
            );
          })}
        </p>

        <div className="panel-block">
          <p className="control has-icons-left">
            <input
              data-cy="NameFilter"
              type="search"
              className="input"
              placeholder="Search"
              value={query}
              onChange={e => {
                handleNameChange(e);
              }}
            />

            <span className="icon is-left">
              <i className="fas fa-search" aria-hidden="true" />
            </span>
          </p>
        </div>

        <div className="panel-block">
          <div
            className="level is-flex-grow-1 is-mobile"
            data-cy="CenturyFilter"
          >
            <div className="level-left">
              {centuries.map(item => (
                <button
                  key={item.id}
                  data-cy="century"
                  className={classNames('button mr-1', {
                    'is-info': allCenturies.includes(item.value),
                  })}
                  onClick={() => {
                    handleCenturiesChange(item.value);
                  }}
                >
                  {item.value}
                </button>
              ))}
            </div>

            <div className="level-right ml-4">
              <a
                data-cy="centuryALL"
                className={classNames('button is-success', {
                  'is-outlined': info,
                })}
                href="#/people"
                onClick={e => {
                  e.preventDefault();
                  clearAllFilters();
                }}
              >
                All
              </a>
            </div>
          </div>
        </div>

        <div className="panel-block">
          <a
            className="button is-link is-outlined is-fullwidth"
            href="#/people"
            onClick={e => {
              e.preventDefault();
              clearAllFilters();
            }}
          >
            Reset all filters
          </a>
        </div>
      </nav>
    </>
  );
};
