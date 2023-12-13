import { useState } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import classNames from 'classnames';
import { Sex } from '../types';
import { getSearchWith } from '../utils/searchHelper';

export type PeopleFiltersProps = {
  centuriesList: number[]
};

export const PeopleFilters = ({ centuriesList }: PeopleFiltersProps) => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [query, setQuery] = useState<string>(searchParams.get('query') || '');
  const [selectedSex, setSelectedSex]
  = useState<Sex | null>(searchParams.get('sex') as Sex);
  const selectedCenturies = searchParams.getAll('centuries');

  const handleQuery = (event: React.ChangeEvent<HTMLInputElement>) => {
    const tmp = event.target.value;

    if (tmp && tmp.trim().length > 0) {
      searchParams.set('query', tmp.trim());
      setSearchParams(searchParams.toString());
    } else {
      searchParams.delete('query');
      setSearchParams(searchParams.toString());
    }

    setQuery(tmp);
  };

  const handleReset = () => {
    setSelectedSex(null);
  };

  return (
    <nav className="panel">
      <p className="panel-heading">Filters</p>

      <p className="panel-tabs" data-cy="SexFilter">
        <Link
          className={classNames({ 'is-active': !selectedSex })}
          to={{
            search: getSearchWith(
              searchParams, { sex: null },
            ),
          }}
          onClick={() => setSelectedSex(null)}
        >
          All

        </Link>
        <Link
          className={classNames({ 'is-active': selectedSex === Sex.Male })}
          to={{
            search: getSearchWith(
              searchParams, { sex: Sex.Male },
            ),
          }}
          onClick={() => setSelectedSex(Sex.Male)}
        >
          Male

        </Link>

        <Link
          className={classNames({ 'is-active': selectedSex === Sex.Female })}
          to={{
            search: getSearchWith(
              searchParams, { sex: Sex.Female },
            ),
          }}
          onClick={() => setSelectedSex(Sex.Female)}
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
            onChange={handleQuery}
          />

          <span className="icon is-left">
            <i className="fas fa-search" aria-hidden="true" />
          </span>
        </p>
      </div>

      <div className="panel-block">
        <div className="level is-flex-grow-1 is-mobile" data-cy="CenturyFilter">
          <div className="level-left">
            {centuriesList.map((century) => {
              const newSearchParams = new URLSearchParams(searchParams);

              if (selectedCenturies.includes(century.toString())) {
                newSearchParams.delete('centuries');
                selectedCenturies
                  .filter((c) => c !== century.toString())
                  .forEach((c) => newSearchParams.append('centuries', c));
              } else {
                newSearchParams.append('centuries', century.toString());
              }

              return (
                <Link
                  key={century}
                  data-cy="century"
                  className={classNames(
                    'button mr-1', {
                      'is-info':
                    selectedCenturies.includes(century.toString()),
                    },
                  )}
                  to={{
                    search: newSearchParams.toString(),
                  }}
                >
                  {century}
                </Link>
              );
            })}
          </div>

          <div className="level-right ml-4">
            <Link
              data-cy="centuryALL"
              className={classNames('button is-success',
                { 'is-outlined': selectedCenturies.length > 0 })}
              to={{
                search: getSearchWith(
                  searchParams, { centuries: null },
                ),
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
            search: '',
          }}
          onClick={handleReset}
        >
          Reset all filters
        </Link>
      </div>
    </nav>
  );
};
