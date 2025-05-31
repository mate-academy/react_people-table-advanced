import React from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import { getSearchWith, SearchParams } from '../utils/searchHelper';

type Props = {
  selectedSex?: string;
  selectedCenturies?: string[];
};

export const PeopleFilters: React.FC<Props> = ({
  selectedSex,
  selectedCenturies = [],
}) => {
  const [searchParams, setSearchParams] = useSearchParams();
  const query = searchParams.get('query') || '';
  const centuries = searchParams.getAll('centuries') || [];

  function setSearchWith(params: SearchParams) {
    const search = getSearchWith(searchParams, params);

    setSearchParams(search);
  }

  function handleQueryChange(event: React.ChangeEvent<HTMLInputElement>) {
    setSearchWith({ query: event.target.value || null });
  }

  function getUpdatedLetters(century: string): string[] {
    return centuries.includes(century)
      ? centuries.filter(ch => century !== ch)
      : [...centuries, century];
  }

  return (
    <nav className="panel">
      <p className="panel-heading">Filters</p>

      <p className="panel-tabs" data-cy="SexFilter">
        <Link
          key=""
          className={!selectedSex ? 'is-active' : ''}
          to={`/people?${getSearchWith(searchParams, { sex: null })}`}
        >
          All
        </Link>
        <Link
          key="m"
          className={selectedSex === 'm' ? 'is-active' : ''}
          to={`/people?${getSearchWith(searchParams, { sex: 'm' })}`}
        >
          Male
        </Link>
        <Link
          key="f"
          className={selectedSex === 'f' ? 'is-active' : ''}
          to={`/people?${getSearchWith(searchParams, { sex: 'f' })}`}
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
            placeholder="Search by name"
            value={query}
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
              <Link
                key={century}
                data-cy="century"
                className={`button mr-1 ${selectedCenturies.includes(century.toString()) ? 'is-info' : ''}`}
                to={`/people?${getSearchWith(searchParams, { centuries: getUpdatedLetters(century.toString()) })}`}
              >
                {century}
              </Link>
            ))}
          </div>

          <div className="level-right ml-4">
            <Link
              data-cy="centuryALL"
              className="button is-success is-outlined"
              to={`/people?${getSearchWith(searchParams, { centuries: null })}`}
            >
              All
            </Link>
          </div>
        </div>
      </div>

      <div className="panel-block">
        <Link
          className="button is-link is-outlined is-fullwidth"
          to={`/people?${getSearchWith(searchParams, { centuries: null, sex: null, query: null })}`}
        >
          Reset all filters
        </Link>
      </div>
    </nav>
  );
};
