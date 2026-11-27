import { useSearchParams } from 'react-router-dom';
import { getSearchWith } from '../utils/searchHelper';
import classNames from 'classnames';
import { SearchLink } from './SearchLink';

const CENTURIES = ['16', '17', '18', '19', '20'];
const SEX_OPTIONS = [
  { label: 'All', value: null },
  { label: 'Male', value: 'm' },
  { label: 'Female', value: 'f' },
];

export const PeopleFilters = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const query = searchParams.get('query') || '';
  const centuries = searchParams.getAll('centuries');
  const sex = searchParams.get('sex');

  const handleNameChange = (name: string) => {
    setSearchParams(getSearchWith(searchParams, { query: name || null }), {
      replace: true,
    });
  };

  const handleCenturyChange = (century: string) => {
    const newCenturies = centuries.includes(century)
      ? centuries.filter(c => c !== century)
      : [...centuries, century];

    setSearchParams(getSearchWith(searchParams, { centuries: newCenturies }));
  };

  const handleAllCenturies = () => {
    setSearchParams(getSearchWith(searchParams, { centuries: [] }));
  };

  const handleReset = () => {
    setSearchParams(
      getSearchWith(searchParams, {
        sex: null,
        query: null,
        centuries: null,
      }),
    );
  };

  return (
    <nav className="panel">
      <p className="panel-heading">Filters</p>

      <p className="panel-tabs" data-cy="SexFilter">
        {SEX_OPTIONS.map(option => (
          <SearchLink
            key={option.label}
            params={{ sex: option.value }}
            className={classNames({
              'is-active': sex === option.value,
            })}
          >
            {option.label}
          </SearchLink>
        ))}
      </p>

      <div className="panel-block">
        <p className="control has-icons-left">
          <input
            data-cy="NameFilter"
            type="search"
            className="input"
            placeholder="Search"
            value={query}
            onChange={e => handleNameChange(e.target.value)}
          />

          <span className="icon is-left">
            <i className="fas fa-search" aria-hidden="true" />
          </span>
        </p>
      </div>

      <div className="panel-block">
        <div className="level is-flex-grow-1 is-mobile" data-cy="CenturyFilter">
          <div className="level-left">
            {CENTURIES.map(century => (
              <button
                type="button"
                key={century}
                data-cy="century"
                className={classNames('button mr-1', {
                  'is-info': centuries.includes(century),
                })}
                onClick={() => handleCenturyChange(century)}
              >
                {century}
              </button>
            ))}
          </div>

          <div className="level-right ml-4">
            <button
              type="button"
              data-cy="centuryALL"
              className={classNames('button is-success', {
                'is-outlined': centuries.length > 0,
              })}
              onClick={handleAllCenturies}
            >
              All
            </button>
          </div>
        </div>
      </div>

      <div className="panel-block">
        <button
          type="button"
          className="button is-link is-outlined is-fullwidth"
          onClick={handleReset}
        >
          Reset all filters
        </button>
      </div>
    </nav>
  );
};
