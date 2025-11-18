import { useEffect } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import { getSearchWith, SearchParams } from '../utils/searchHelper';

interface Props {
  filterPeople: (query: string, centuries: string[], sex?: string) => void;
}

export const PeopleFilters = ({ filterPeople }: Props) => {
  const [searchParams, setSearchParams] = useSearchParams();
  const query = searchParams.get('query') || '';
  const centuries = searchParams.getAll('centuries') || [];
  const centuriesKey = centuries.join(',');
  const sex = searchParams.get('sex') || '';

  const setSearchWith = (params: SearchParams) => {
    const newParams = new URLSearchParams(searchParams);

    const search = getSearchWith(newParams, params);

    setSearchParams(search);
  };

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchWith({ query: event.target.value || null });
  };

  const filterCenturies = (ch: string) => {
    return centuries.includes(ch)
      ? centuries.filter(cent => cent !== ch)
      : [...centuries, ch];
  };

  useEffect(() => {
    filterPeople(query, centuries, sex);
  }, [query, centuriesKey, sex]);

  return (
    <nav className="panel">
      <p className="panel-heading">Filters</p>

      <p className="panel-tabs" data-cy="SexFilter">
        <Link
          className={!sex ? 'is-active' : ''}
          to={{ search: getSearchWith(searchParams, { sex: null }) }}
        >
          All
        </Link>
        <Link
          className={sex === 'm' ? 'is-active' : ''}
          to={{ search: getSearchWith(searchParams, { sex: 'm' }) }}
        >
          Male
        </Link>
        <Link
          className={sex === 'f' ? 'is-active' : ''}
          to={{
            search: getSearchWith(searchParams, { sex: 'f' }),
          }}
        >
          Female
        </Link>
      </p>

      <div className="panel-block">
        <p className="control has-icons-left">
          <input
            data-cy="NameFilter"
            type="search"
            onChange={event => handleInputChange(event)}
            value={query}
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
            <Link
              data-cy="century"
              className={
                centuries.includes('16') ? 'button mr-1 is-info' : 'button mr-1'
              }
              to={{
                search: getSearchWith(searchParams, {
                  centuries: filterCenturies('16'),
                }),
              }}
            >
              16
            </Link>

            <Link
              data-cy="century"
              className={
                centuries.includes('17') ? 'button mr-1 is-info' : 'button mr-1'
              }
              to={{
                search: getSearchWith(searchParams, {
                  centuries: filterCenturies('17'),
                }),
              }}
            >
              17
            </Link>

            <Link
              data-cy="century"
              className={
                centuries.includes('18') ? 'button mr-1 is-info' : 'button mr-1'
              }
              to={{
                search: getSearchWith(searchParams, {
                  centuries: filterCenturies('18'),
                }),
              }}
            >
              18
            </Link>

            <Link
              data-cy="century"
              className={
                centuries.includes('19') ? 'button mr-1 is-info' : 'button mr-1'
              }
              to={{
                search: getSearchWith(searchParams, {
                  centuries: filterCenturies('19'),
                }),
              }}
            >
              19
            </Link>
            <Link
              data-cy="century"
              className={
                centuries.includes('20') ? 'button mr-1 is-info' : 'button mr-1'
              }
              to={{
                search: getSearchWith(searchParams, {
                  centuries: filterCenturies('20'),
                }),
              }}
            >
              20
            </Link>
          </div>

          <div className="level-right ml-4">
            <Link
              data-cy="centuryALL"
              className={
                !centuries.length
                  ? 'button is-success'
                  : 'button is-success is-outlined'
              }
              to="#/people"
            >
              All
            </Link>
          </div>
        </div>
      </div>

      <div className="panel-block">
        <Link className="button is-link is-outlined is-fullwidth" to="#/people">
          Reset all filters
        </Link>
      </div>
    </nav>
  );
};
