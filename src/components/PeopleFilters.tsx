import classNames from 'classnames';
import { useSearchParams } from 'react-router-dom';
import { getSearchWith } from '../utils/searchHelper'; // перевір шлях до утиліти

const CENTURIES = ['16', '17', '18', '19', '20'];

export const PeopleFilters = () => {
  const [searchParams, setSearchParams] = useSearchParams();

  const sex = searchParams.get('sex') || '';
  const query = searchParams.get('query') || '';
  const centuries = searchParams.getAll('centuries');

  const handleSexChange = (newSex: string | null) => {
    setSearchParams(getSearchWith(searchParams, { sex: newSex }));
  };

  const handleQueryChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value;

    setSearchParams(
      getSearchWith(searchParams, {
        query: value.trim() ? value : null,
      }),
    );
  };

  const toggleCentury = (century: string) => {
    const updatedCenturies = centuries.includes(century)
      ? centuries.filter(item => item !== century)
      : [...centuries, century];

    setSearchParams(
      getSearchWith(searchParams, {
        centuries: updatedCenturies.length > 0 ? updatedCenturies : null,
      }),
    );
  };

  const handleResetAllCenturies = () => {
    setSearchParams(getSearchWith(searchParams, { centuries: null }));
  };

  const handleResetAllFilters = () => {
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
        <a
          href="#/people"
          className={classNames({ 'is-active': !sex })}
          onClick={e => {
            e.preventDefault();
            handleSexChange(null);
          }}
        >
          All
        </a>

        <a
          href="#/people"
          className={classNames({ 'is-active': sex === 'm' })}
          onClick={e => {
            e.preventDefault();
            handleSexChange('m');
          }}
        >
          Male
        </a>

        <a
          href="#/people"
          className={classNames({ 'is-active': sex === 'f' })}
          onClick={e => {
            e.preventDefault();
            handleSexChange('f');
          }}
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
            {CENTURIES.map(century => {
              const isSelected = centuries.includes(century);

              return (
                <a
                  key={century}
                  data-cy="century"
                  className={classNames('button mr-1', {
                    'is-info': isSelected,
                  })}
                  href="#/people"
                  onClick={e => {
                    e.preventDefault();
                    toggleCentury(century);
                  }}
                >
                  {century}
                </a>
              );
            })}
          </div>

          <div className="level-right ml-4">
            <a
              data-cy="centuryALL"
              className={classNames('button is-success', {
                'is-outlined': centuries.length > 0,
              })}
              href="#/people"
              onClick={e => {
                e.preventDefault();
                handleResetAllCenturies();
              }}
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
          onClick={e => {
            e.preventDefault();
            handleResetAllFilters();
          }}
        >
          Reset all filters
        </a>
      </div>
    </nav>
  );
};
