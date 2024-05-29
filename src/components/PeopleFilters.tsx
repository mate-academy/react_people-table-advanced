import classNames from 'classnames';
import { SetURLSearchParams } from 'react-router-dom';
import { getSearchWith } from '../utils/searchHelper';

const CENTURIES_OPTIONS = ['16', '17', '18', '19', '20'];

type Props = {
  searchParams: URLSearchParams;
  setSearchParams: SetURLSearchParams;
};

export const PeopleFilters: React.FC<Props> = ({
  searchParams,
  setSearchParams,
}) => {
  const sex = searchParams.get('sex') || 'All';
  const query = searchParams.get('query') || '';
  const centuries = searchParams.getAll('centuries') || [];

  function setSearchWith(params: any) {
    const search = getSearchWith(params, searchParams);

    setSearchParams(search);
  }

  function handleSexChange(sexInput: string) {
    setSearchWith({ sex: sexInput });
  }

  function handleQueryChange(event: React.ChangeEvent<HTMLInputElement>) {
    setSearchWith({ query: event.target.value || null });
  }

  function toggleCentury(centuryInput: string) {
    const newCenturies = centuries.includes(centuryInput)
      ? centuries.filter(century => centuryInput !== century)
      : [...centuries, centuryInput];

    setSearchWith({ centuries: newCenturies });
  }

  function toggleAllCenturies() {
    setSearchWith({ centuries: null });
  }

  function resetAllFilters() {
    setSearchParams({});
  }

  return (
    <nav className="panel">
      <p className="panel-heading">Filters</p>

      <p className="panel-tabs" data-cy="SexFilter">
        <a
          className={sex === 'All' ? 'is-active' : ''}
          href="#/people"
          onClick={() => handleSexChange('All')}
        >
          All
        </a>
        <a
          className={sex === 'm' ? 'is-active' : ''}
          href="#/people?sex=m"
          onClick={() => handleSexChange('m')}
        >
          Male
        </a>
        <a
          className={sex === 'f' ? 'is-active' : ''}
          href="#/people?sex=f"
          onClick={() => handleSexChange('f')}
        >
          Female
        </a>
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
            {CENTURIES_OPTIONS.map(century => (
              <button
                data-cy="century"
                className={classNames('button mr-1', {
                  'is-info': centuries.includes(century),
                })}
                key={century}
                onClick={() => toggleCentury(century)}
              >
                {century}
              </button>
            ))}
          </div>

          <div className="level-right ml-4">
            <button
              data-cy="centuryALL"
              className={classNames('button', {
                'is-success': centuries.length === 0,
                'is-success is-outlined': centuries.length > 0,
              })}
              onClick={toggleAllCenturies}
            >
              All
            </button>
          </div>
        </div>
      </div>

      <div className="panel-block">
        <button
          className="button is-link is-outlined is-fullwidth"
          onClick={resetAllFilters}
        >
          Reset all filters
        </button>
      </div>
    </nav>
  );
};
