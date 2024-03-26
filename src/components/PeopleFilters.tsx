import { Link, useSearchParams } from 'react-router-dom';
import classNames from 'classnames';
import { getSearchWith } from '../utils/searchHelper';
import { SexStatus } from '../types/SexStatus';

export const PeopleFilters = () => {
  const [searchParams, setSearchParams] = useSearchParams();

  const sex = searchParams.get('sex') || '';
  const query = searchParams.get('query') || '';
  const centuries = searchParams.getAll('centuries') || [];

  const setSearchWith = (params: any) => {
    const search = getSearchWith(searchParams, params);

    setSearchParams(search);
  };

  const centuriesArr = ['16', '17', '18', '19', '20'];

  const handleCenturies = (centuryNum: string) => {
    const newcenturies = centuries.includes(centuryNum)
      ? centuries.filter(e => e !== centuryNum)
      : [...centuries, centuryNum];

    return newcenturies;
  };

  const handleQueryChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchWith({ query: event.target.value || null });
  };

  return (
    <nav className="panel">
      <p className="panel-heading">Filters</p>

      <p className="panel-tabs" data-cy="SexFilter">
        <Link
          className={classNames('', { 'is-active': sex === SexStatus.All })}
          to={{ search: getSearchWith(searchParams, { sex: null }) }}
        >
          All
        </Link>

        <Link
          className={classNames('', { 'is-active': sex === SexStatus.Male })}
          to={{ search: getSearchWith(searchParams, { sex: SexStatus.Male }) }}
        >
          Male
        </Link>

        <Link
          className={classNames('', { 'is-active': sex === SexStatus.Female })}
          to={{
            search: getSearchWith(searchParams, { sex: SexStatus.Female }),
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
            {centuriesArr.map(century => (
              <Link
                key={century}
                data-cy="century"
                className={classNames('button mr-1', {
                  'is-info': centuries.includes(century),
                })}
                to={{
                  search: getSearchWith(searchParams, {
                    centuries: handleCenturies(century),
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
              className={classNames('button is-success', {
                'is-outlined': !!centuries.length,
              })}
              to={{
                search: getSearchWith(searchParams, { centuries: null }),
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
          to={{ search: '' }}
        >
          Reset all filters
        </Link>
      </div>
    </nav>
  );
};
