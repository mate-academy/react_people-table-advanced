import { NavLink } from 'react-router-dom';
import { getSearchWith } from '../utils/searchHelper';
import cn from 'classnames';
import { URLSearchParamsInit } from 'react-router-dom';

type Props = {
  searchParams: URLSearchParams;
  setSearchParams: (
    nextInit: URLSearchParamsInit,
    navigateOptions?: { replace?: boolean; state?: unknown },
  ) => void;
};

export const PeopleFilters: React.FC<Props> = ({
  searchParams,
  setSearchParams,
}) => {
  const currentGender = searchParams.get('sex');

  const query = searchParams.get('query') || '';
  const handleQueryChange = (inputQuery: string) => {
    const newSearch = getSearchWith(searchParams, {
      query: inputQuery || null,
    });

    setSearchParams(newSearch);
  };

  const centuries = [16, 17, 18, 19, 20];
  const selectedCentury = searchParams.getAll('centuries').map(Number) || [];

  const handleSelectedCentury = (century: number) => {
    const updatedCenturies = selectedCentury.includes(century)
      ? selectedCentury.filter(c => c !== century)
      : [...selectedCentury, century];

    return `/people?${getSearchWith(searchParams, { centuries: updatedCenturies.map(String) })}`;
  };

  return (
    <nav className="panel">
      <p className="panel-heading">Filters</p>

      <p className="panel-tabs" data-cy="SexFilter">
        <NavLink
          className={cn('', { 'is-active': currentGender === null })}
          to={`/people?${getSearchWith(searchParams, { sex: null })}`}
        >
          All
        </NavLink>

        <NavLink
          className={cn('', { 'is-active': currentGender === 'm' })}
          to={`/people?${getSearchWith(searchParams, { sex: 'm' })}`}
        >
          Male
        </NavLink>

        <NavLink
          className={cn('', { 'is-active': currentGender === 'f' })}
          to={`/people?${getSearchWith(searchParams, { sex: 'f' })}`}
        >
          Female
        </NavLink>
      </p>

      <div className="panel-block">
        <p className="control has-icons-left">
          <input
            data-cy="NameFilter"
            type="search"
            className="input"
            placeholder="Search"
            onChange={e => handleQueryChange(e.target.value)}
            value={query}
          />

          <span className="icon is-left">
            <i className="fas fa-search" aria-hidden="true" />
          </span>
        </p>
      </div>

      <div className="panel-block">
        <div className="level is-flex-grow-1 is-mobile" data-cy="CenturyFilter">
          <div className="level-left">
            {centuries.map(century => (
              <NavLink
                key={century}
                data-cy="century"
                className={cn('button mr-1', {
                  'is-info': selectedCentury.includes(century),
                })}
                to={handleSelectedCentury(century)}
              >
                {century}
              </NavLink>
            ))}
          </div>

          <div className="level-right ml-4">
            <NavLink
              data-cy="centuryALL"
              className={cn('button is-success', {
                'is-outlined': selectedCentury.length > 0,
              })}
              to={`/people?${getSearchWith(searchParams, { centuries: null })}`}
            >
              All
            </NavLink>
          </div>
        </div>
      </div>

      <div className="panel-block">
        <a className="button is-link is-outlined is-fullwidth" href="#/people">
          Reset all filters
        </a>
      </div>
    </nav>
  );
};
