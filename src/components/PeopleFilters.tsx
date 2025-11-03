import { Sex } from '../types';
import { useLocation, useNavigate } from 'react-router-dom';
import { getSearchWith } from '../utils/searchHelper';
import cn from 'classnames';

const CENTURIES = [16, 17, 18, 19, 20];

export const PeopleFilters = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const params = new URLSearchParams(location.search);
  const currentSex = params.get('sex');
  const currentSearch = params.get('query')?.trimStart() || '';
  const selectedCenturies = params.getAll('centuries').map(Number);

  const handleSexChanges = (
    event: React.MouseEvent<HTMLAnchorElement>,
    sex?: Sex,
  ) => {
    event.preventDefault();

    const currentParams = new URLSearchParams(location.search);
    const updatedSearch = getSearchWith(currentParams, {
      sex: sex || null,
    });

    navigate(`?${updatedSearch}`, { replace: true });
  };

  const handleSearchChanges = (val: string) => {
    const currentParams = new URLSearchParams(location.search);
    const updatedSearch = getSearchWith(currentParams, {
      query: val.trim() ? val : null,
    });

    navigate(`?${updatedSearch}`, { replace: true });
  };

  const handleCenturySelection = (
    event: React.MouseEvent<HTMLAnchorElement>,
    century: number,
  ) => {
    event.preventDefault();

    const currentParams = new URLSearchParams(location.search);
    const existingCenturies = currentParams.getAll('centuries').map(Number);

    const updatedCenturies = existingCenturies.includes(century)
      ? existingCenturies.filter(item => item !== century)
      : [...existingCenturies, century];

    currentParams.delete('centuries');
    updatedCenturies.forEach(c => currentParams.append('centuries', String(c)));

    navigate(`?${currentParams.toString()}`, { replace: true });
  };

  const handleClearCenturies = (event: React.MouseEvent<HTMLAnchorElement>) => {
    event.preventDefault();

    const currentParams = new URLSearchParams(location.search);

    currentParams.delete('centuries');
    navigate(`?${currentParams.toString()}`, { replace: true });
  };

  const resetFilters = (event: React.MouseEvent<HTMLAnchorElement>) => {
    event.preventDefault();

    const currentParams = new URLSearchParams(location.search);

    currentParams.delete('sex');
    currentParams.delete('query');
    currentParams.delete('centuries');

    navigate(`?${currentParams.toString()}`, { replace: true });
  };

  return (
    <nav className="panel">
      <p className="panel-heading">Filters</p>

      <p className="panel-tabs" data-cy="SexFilter">
        <a
          className={cn({ 'is-active': !currentSex })}
          href="#/people"
          onClick={event => handleSexChanges(event)}
        >
          All
        </a>

        {Object.entries(Sex).map(([key, value]) => (
          <a
            className={cn({ 'is-active': value === currentSex })}
            key={key}
            href={`#/people?sex=${value}`}
            onClick={event => handleSexChanges(event, value as Sex)}
          >
            {key}
          </a>
        ))}
      </p>

      <div className="panel-block">
        <p className="control has-icons-left">
          <input
            data-cy="NameFilter"
            type="search"
            className="input"
            placeholder="Search"
            value={currentSearch}
            onChange={event => handleSearchChanges(event.target.value)}
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
              <a
                key={century}
                data-cy="century"
                className={cn('button mr-1', {
                  'is-info': selectedCenturies.includes(century),
                })}
                href={`#/people?centuries=${century}`}
                onClick={event => handleCenturySelection(event, century)}
              >
                {century}
              </a>
            ))}
          </div>

          <div className="level-right ml-4">
            <a
              data-cy="centuryALL"
              className={cn('button is-success', {
                'is-outlined': selectedCenturies.length !== 0,
              })}
              href="#/people"
              onClick={handleClearCenturies}
            >
              All
            </a>
          </div>
        </div>
      </div>

      <div className="panel-block">
        <a
          className="button is-link is-outlined is-fullwidth"
          href="#/people"
          onClick={resetFilters}
        >
          Reset all filters
        </a>
      </div>
    </nav>
  );
};
