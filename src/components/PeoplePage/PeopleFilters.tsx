import { useQueryParams } from './PeoplePage';
import classNames from 'classnames';
import { useLocation } from 'react-router-dom';

export const PeopleFilters = () => {
  const location = useLocation();
  const { searchParams, updateParams, setSearchParams } = useQueryParams();

  const centuries = searchParams.getAll('centuries');

  const handleNameFilterChange = (
    even: React.ChangeEvent<HTMLInputElement>,
  ) => {
    updateParams('query', even.target.value || null);
  };

  const resetFilters = () => {
    const params = new URLSearchParams(searchParams);

    params.delete('centuries');
    params.delete('sex');
    params.delete('query');
    setSearchParams(params);
  };

  const toggleCentury = c => {
    const params = new URLSearchParams(searchParams);
    const newCenturies = centuries.includes(String(c))
      ? centuries.filter(century => century !== String(c))
      : [...centuries, String(c)];

    params.delete('centuries');
    newCenturies.forEach(century => params.append('centuries', century));
    setSearchParams(params);
  };

  return (
    <nav className="panel">
      <p className="panel-heading">Filters</p>

      <p className="panel-tabs" data-cy="SexFilter">
        <a
          className={!searchParams.get('sex') ? 'is-active' : ''}
          onClick={() => {
            const params = new URLSearchParams(searchParams);

            params.delete('sex');
            setSearchParams(params);
          }}
        >
          All
        </a>
        <a
          className={searchParams.get('sex') === 'm' ? 'is-active' : ''}
          onClick={() => {
            const params = new URLSearchParams(searchParams);

            params.set('sex', 'm');
            setSearchParams(params);
          }}
        >
          Male
        </a>
        <a
          className={searchParams.get('sex') === 'f' ? 'is-active' : ''}
          onClick={() => {
            const params = new URLSearchParams(searchParams);

            params.set('sex', 'f');
            setSearchParams(params);
          }}
        >
          Female
        </a>
      </p>

      <div className="panel-block">
        <p className="control has-icons-left">
          <input
            value={searchParams.get('query') || ''}
            data-cy="NameFilter"
            type="search"
            className="input"
            placeholder="Search"
            onChange={ev => handleNameFilterChange(ev)}
          />

          <span className="icon is-left">
            <i className="fas fa-search" aria-hidden="true" />
          </span>
        </p>
      </div>

      <div className="panel-block">
        <div className="level is-flex-grow-1 is-mobile" data-cy="CenturyFilter">
          <div className="level-left">
            {[16, 17, 18, 19, 20].map(century => (
              <button
                data-cy="century"
                key={century}
                onClick={() => toggleCentury(century)}
                className={classNames('button', 'mr-1', {
                  'is-info': searchParams
                    .getAll('centuries')
                    .includes(String(century)),
                })}
              >
                {century}
              </button>
            ))}
          </div>

          <div className="level-right ml-4">
            <button
              data-cy="centuryALL"
              className={classNames(
                'button',
                { 'is-outlined': location.pathname.endsWith('/people') },
                'is-success',
              )}
              onClick={() => {
                const params = new URLSearchParams(searchParams);

                params.delete('centuries');
                setSearchParams(params);
              }}
            >
              All
            </button>
          </div>
        </div>
      </div>

      <div className="panel-block">
        <a
          className="button is-link is-outlined is-fullwidth"
          onClick={() => resetFilters()}
        >
          Reset all filters
        </a>
      </div>
    </nav>
  );
};
