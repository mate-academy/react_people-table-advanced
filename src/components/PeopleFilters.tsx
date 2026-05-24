import { ChangeEvent } from 'react';
import { Link, useSearchParams } from 'react-router-dom';

import { getSearchWith } from '../utils/searchHelper';

const CENTURIES = ['16', '17', '18', '19', '20'];

export const PeopleFilters = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const selectedSex = searchParams.get('sex');
  const query = searchParams.get('query') ?? '';
  const selectedCenturies = searchParams.getAll('centuries');

  const handleQueryChange = (event: ChangeEvent<HTMLInputElement>) => {
    const { value } = event.target;
    const nextSearchParams = new URLSearchParams(searchParams);

    if (!value.trim()) {
      nextSearchParams.delete('query');
    } else {
      nextSearchParams.set('query', value);
    }

    setSearchParams(nextSearchParams);
  };

  const buildPeopleLink = (
    paramsToUpdate: Record<string, string | string[] | null>,
  ) => ({
    pathname: '/people',
    search: getSearchWith(searchParams, paramsToUpdate),
  });

  const toggleCentury = (century: string) => {
    const nextCenturies = selectedCenturies.includes(century)
      ? selectedCenturies.filter(item => item !== century)
      : [...selectedCenturies, century];

    return buildPeopleLink({
      centuries: nextCenturies.length ? nextCenturies : null,
    });
  };

  return (
    <nav className="panel">
      <p className="panel-heading">Filters</p>

      <p className="panel-tabs" data-cy="SexFilter">
        <Link
          className={!selectedSex ? 'is-active' : ''}
          to={buildPeopleLink({ sex: null })}
        >
          All
        </Link>

        <Link
          className={selectedSex === 'm' ? 'is-active' : ''}
          to={buildPeopleLink({ sex: 'm' })}
        >
          Male
        </Link>

        <Link
          className={selectedSex === 'f' ? 'is-active' : ''}
          to={buildPeopleLink({ sex: 'f' })}
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
            {CENTURIES.map(century => {
              const isActive = selectedCenturies.includes(century);

              return (
                <Link
                  key={century}
                  data-cy="century"
                  className={`button mr-1 ${isActive ? 'is-info' : ''}`}
                  to={toggleCentury(century)}
                >
                  {century}
                </Link>
              );
            })}
          </div>

          <div className="level-right ml-4">
            <Link
              data-cy="centuryALL"
              className={`button is-success ${
                selectedCenturies.length === 0 ? 'is-outlined' : ''
              }`}
              to={buildPeopleLink({ centuries: null })}
            >
              All
            </Link>
          </div>
        </div>
      </div>

      <div className="panel-block">
        <Link
          className="button is-link is-outlined is-fullwidth"
          to={{ pathname: '/people', search: '' }}
        >
          Reset all filters
        </Link>
      </div>
    </nav>
  );
};
