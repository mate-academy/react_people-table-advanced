import { Link, useSearchParams } from 'react-router-dom';
import { getSearchWith } from '../utils/searchHelper';
import cn from 'classnames';

const ALL = 'null';
const MALE = 'm';
const FEMALE = 'f';

export const PeopleFilters = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const centuries = ['16', '17', '18', '19', '20'];

  const handleNameFilterChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const paramsToUpdate = { query: e.target.value || null };

    setSearchParams(getSearchWith(searchParams, paramsToUpdate));
  };

  const handleResetAllFilters = (
    e: React.MouseEvent<HTMLAnchorElement, MouseEvent>,
  ) => {
    e.preventDefault();
    setSearchParams('');
  };

  const handleSexFilterChange = (sex: string | null) => {
    const paramsToUpdate = { sex };

    setSearchParams(getSearchWith(searchParams, paramsToUpdate));
  };

  const handleCenturyFilterChange = (
    e: React.MouseEvent<HTMLAnchorElement, MouseEvent>,
    century: string,
  ) => {
    e.preventDefault();
    const currentCenturies = searchParams.getAll('centuries');
    const newCenturies = currentCenturies.includes(century)
      ? currentCenturies.filter(c => c !== century)
      : [...currentCenturies, century];

    const paramsToUpdate = {
      centuries: newCenturies.length > 0 ? newCenturies : null,
    };

    setSearchParams(getSearchWith(searchParams, paramsToUpdate));
  };

  const isAllSexActive = !searchParams.get('sex');
  const hasSelectedCenturies = searchParams.getAll('centuries').length !== 0;
  const isAllCenturiesActive = !hasSelectedCenturies;

  return (
    <nav className="panel">
      <p className="panel-heading">Filters</p>

      <p className="panel-tabs" data-cy="SexFilter">
        <Link
          className={cn({
            'is-active': isAllSexActive,
          })}
          to="/people"
          onClick={() => handleSexFilterChange(ALL)}
        >
          All
        </Link>
        <Link
          className={cn({ 'is-active': searchParams.get('sex') === MALE })}
          to={`/people?sex=${MALE}`}
          onClick={() => handleSexFilterChange(MALE)}
        >
          Male
        </Link>
        <Link
          className={cn({ 'is-active': searchParams.get('sex') === FEMALE })}
          to={`/people?sex=${FEMALE}`}
          onClick={() => handleSexFilterChange(FEMALE)}
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
            onChange={handleNameFilterChange}
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
              <Link
                key={century}
                data-cy="century"
                className={cn('button mr-1', {
                  'is-info': searchParams.getAll('centuries').includes(century),
                })}
                to={`/people?centuries=${century}`}
                onClick={e => handleCenturyFilterChange(e, century)}
              >
                {century}
              </Link>
            ))}
          </div>

          <div className="level-right ml-4">
            <Link
              data-cy="centuryALL"
              className={cn('button', {
                'is-success': isAllCenturiesActive,
                'is-outlined': hasSelectedCenturies,
              })}
              to="/people"
              onClick={handleResetAllFilters}
            >
              All
            </Link>
          </div>
        </div>
      </div>

      <div className="panel-block">
        <Link
          className="button is-link is-outlined is-fullwidth"
          to="/people"
          onClick={handleResetAllFilters}
        >
          Reset all filters
        </Link>
      </div>
    </nav>
  );
};
