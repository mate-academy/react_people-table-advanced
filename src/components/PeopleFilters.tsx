import { useSearchParams, Link } from 'react-router-dom';
import { getSearchWith, setSearchWith } from '../utils/searchHelper';
import classNames from 'classnames';

export const PeopleFilters = () => {
  const [searchParams, setSearchParams] = useSearchParams();

  const centuriesInFilterOptions = ['16', '17', '18', '19', '20'];

  const sex = searchParams.get('sex') || '';

  const query = searchParams.get('query') || '';

  const centuries = searchParams.getAll('centuries') || [];

  function handleSexChange(s: string) {
    setSearchWith(searchParams, setSearchParams, { sex: s || null });
  }

  function handleQueryChange(event: React.ChangeEvent<HTMLInputElement>) {
    setSearchWith(searchParams, setSearchParams, {
      query: event.target.value || null,
    });
  }

  function toggleCenturies(cn: string) {
    const newCenturies = centuries.includes(cn)
      ? centuries.filter(currCentury => currCentury !== cn)
      : [...centuries, cn];

    setSearchWith(searchParams, setSearchParams, { centuries: newCenturies });
  }

  function handleQueryСlear() {
    setSearchWith(searchParams, setSearchParams, { query: '' });
  }

  function handleResetFilters() {
    setSearchWith(searchParams, setSearchParams, {
      query: null,
      sex: null,
      cn: null,
    });
  }

  return (
    <nav className="panel">
      <p className="panel-heading">Filters</p>

      <p className="panel-tabs" data-cy="SexFilter">
        <Link
          className={classNames('', { 'is-active': !sex })}
          onClick={() => handleSexChange('')}
          to={{ search: getSearchWith(searchParams, { sex: null }) }}
        >
          All
        </Link>
        <Link
          className={classNames('', { 'is-active': sex === 'm' })}
          onClick={() => handleSexChange('m')}
          to={{ search: getSearchWith(searchParams, { sex: 'm' }) }}
        >
          Male
        </Link>
        <Link
          className={classNames('', { 'is-active': sex === 'f' })}
          onClick={() => handleSexChange('f')}
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
            onChange={handleQueryChange}
          />

          <span className="icon is-left">
            <i
              className="fas fa-search"
              aria-hidden="true"
              onClick={handleQueryСlear}
            />
          </span>
        </p>
      </div>

      <div className="panel-block">
        <div className="level is-flex-grow-1 is-mobile" data-cy="CenturyFilter">
          <div className="level-left">
            {centuriesInFilterOptions.map(century => (
              <Link
                key={century}
                data-cy="century"
                className={classNames('button', 'mr-1', {
                  'is-info': centuries.includes(century),
                })}
                onClick={() => toggleCenturies(century)}
                to={{
                  search: getSearchWith(searchParams, {
                    centuries: centuries.includes(century)
                      ? centuries.filter(currCentury => currCentury !== century)
                      : [...centuries, century],
                  }),
                }}
              >
                {century}
              </Link>
            ))}
          </div>

          <div className="level-right ml-4">
            <Link
              data-cy="centuryALL"
              className="button is-success is-outlined"
              to={{ search: getSearchWith(searchParams, { centuries: null }) }}
            >
              All
            </Link>
          </div>
        </div>
      </div>

      <div className="panel-block">
        <Link
          className="button is-link is-outlined is-fullwidth"
          onClick={handleResetFilters}
          to={{
            search: getSearchWith(searchParams, {
              query: null,
              sex: null,
              centuries: null,
            }),
          }}
        >
          Reset all filters
        </Link>
      </div>
    </nav>
  );
};
