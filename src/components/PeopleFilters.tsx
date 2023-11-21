import cn from 'classnames';
import { Link, useSearchParams } from 'react-router-dom';
import { SearchParams, getSearchWith } from '../utils/searchHelper';

export const PeopleFilters = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const query = searchParams.get('query') || '';
  const sex = searchParams.get('sex') || '';

  const centuries = searchParams.getAll('centuries') || [];
  const allCenturies = [16, 17, 18, 19, 20];

  const setSearchWith = (params: SearchParams) => {
    const search = getSearchWith(searchParams, params);

    setSearchParams(search);
  };

  // const toggleCentury = (century: number) => {
  //   const newCenturies = centuries.includes(century.toString())
  //     ? centuries.filter(cent => +cent !== century)
  //     : [...centuries, century.toString()];

  //   setSearchWith({ centuries: newCenturies });
  // };

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchWith({ query: event.target.value || null });
  };

  return (
    <nav className="panel">
      <p className="panel-heading">Filters</p>

      <p className="panel-tabs" data-cy="SexFilter">
        <Link
          className={cn({ 'is-active': !sex })}
          to={{
            search: getSearchWith(searchParams, { sex: null }),
          }}
        >
          All
        </Link>

        <Link
          className={cn({ 'is-active': sex === 'm' })}
          to={{
            search: getSearchWith(searchParams, { sex: 'm' }),
          }}
        >
          Male
        </Link>

        <Link
          className={cn({ 'is-active': sex === 'f' })}
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
            className="input"
            placeholder="Search"
            value={query}
            onChange={handleInputChange}
          />

          <span className="icon is-left">
            <i className="fas fa-search" aria-hidden="true" />
          </span>
        </p>
      </div>

      <div className="panel-block">
        <div className="level is-flex-grow-1 is-mobile" data-cy="CenturyFilter">
          <div className="level-left">
            {allCenturies.map(century => (
              <Link
                key={century}
                data-cy="century"
                className={cn('button mr-1', {
                  'is-info': centuries.includes(century.toString()),
                })}
                to={{
                  search: getSearchWith(searchParams, {
                    centuries: centuries.includes(century.toString())
                      ? centuries.filter(cent => +cent !== century)
                      : [...centuries, century.toString()],
                  }),
                }} // `?centuries=${century}`
              // onClick={() => {
              //   toggleCentury(century);
              //   console.log(centuries);
              // }}
              >
                {century}
              </Link>
            ))}
          </div>

          <div className="level-right ml-4">
            <Link
              data-cy="centuryALL"
              className="button is-success is-outlined"
              to={{ search: getSearchWith(searchParams, { centuries: [] }) }}
            >
              All
            </Link>
          </div>
        </div>
      </div>

      <div className="panel-block">
        <a
          className="button is-link is-outlined is-fullwidth"
          href="#/people"
        >
          Reset all filters
        </a>
      </div>
    </nav>
  );
};
