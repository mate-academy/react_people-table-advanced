import { useEffect, useState } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import { getSearchWith } from '../utils/searchHelper';

type Props = {
  handleChange: (query: string) => void;
};

export const PeopleFilters: React.FC<Props> = ({ handleChange }) => {
  const [searchParams] = useSearchParams();
  const [query, setQuery] = useState<string>(
    () => searchParams.get('query') || '',
  );

  const selectedSex = searchParams.get('sex');
  const selectedCenturies = searchParams.getAll('centuries');

  useEffect(() => {
    handleChange(query);
  }, [query, handleChange]);

  const handleCenturyToggle = (century: string) => {
    const params = new URLSearchParams(searchParams);
    const currentCenturies = params.getAll('centuries');

    if (currentCenturies.includes(century)) {
      // Remove the century
      params.delete('centuries');
      currentCenturies
        .filter(c => c !== century)
        .forEach(c => {
          params.append('centuries', c);
        });
    } else {
      // Add the century
      params.append('centuries', century);
    }

    return params.toString();
  };

  const clearAllCenturies = () => {
    return getSearchWith(searchParams, { centuries: null });
  };

  return (
    <nav className="panel">
      <p className="panel-heading">Filters</p>

      <p className="panel-tabs" data-cy="SexFilter">
        <Link
          className={selectedSex === null ? 'is-active' : ''}
          to={{ search: getSearchWith(searchParams, { sex: null }) }}
        >
          All
        </Link>
        <Link
          className={selectedSex === 'm' ? 'is-active' : ''}
          to={{ search: getSearchWith(searchParams, { sex: 'm' }) }}
        >
          Male
        </Link>
        <Link
          className={selectedSex === 'f' ? 'is-active' : ''}
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
            onChange={e => setQuery(e.target.value)}
          />

          <span className="icon is-left">
            <i
              className="fas fa-search"
              aria-hidden="true"
              onClick={() => setQuery('')}
            />
          </span>
        </p>
      </div>

      <div className="panel-block">
        <div className="level is-flex-grow-1 is-mobile" data-cy="CenturyFilter">
          <div className="level-left">
            <Link
              data-cy="century"
              className={
                selectedCenturies.includes('16')
                  ? 'button mr-1 is-info'
                  : 'button mr-1'
              }
              to={{ search: handleCenturyToggle('16') }}
            >
              16
            </Link>

            <Link
              data-cy="century"
              className={
                selectedCenturies.includes('17')
                  ? 'button mr-1 is-info'
                  : 'button mr-1'
              }
              to={{ search: handleCenturyToggle('17') }}
            >
              17
            </Link>

            <Link
              data-cy="century"
              className={
                selectedCenturies.includes('18')
                  ? 'button mr-1 is-info'
                  : 'button mr-1'
              }
              to={{ search: handleCenturyToggle('18') }}
            >
              18
            </Link>

            <Link
              data-cy="century"
              className={
                selectedCenturies.includes('19')
                  ? 'button mr-1 is-info'
                  : 'button mr-1'
              }
              to={{ search: handleCenturyToggle('19') }}
            >
              19
            </Link>

            <Link
              data-cy="century"
              className={
                selectedCenturies.includes('20')
                  ? 'button mr-1 is-info'
                  : 'button mr-1'
              }
              to={{ search: handleCenturyToggle('20') }}
            >
              20
            </Link>
          </div>

          <div className="level-right ml-4">
            <Link
              data-cy="centuryALL"
              className={
                selectedCenturies.length === 0
                  ? 'button is-success'
                  : 'button is-success is-outlined'
              }
              to={{ search: clearAllCenturies() }}
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
