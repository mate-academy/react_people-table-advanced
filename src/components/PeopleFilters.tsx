import classNames from 'classnames';
import { useSearchParams } from 'react-router-dom';

function range(start: number, end: number) {
  return Array.from({ length: end - start + 1 }, (_, i) => start + i);
}

export const PeopleFilters = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const query = searchParams.get('query') || '';
  const sex = searchParams.get('sex') || '';
  const centuries = searchParams.getAll('centuries') || [];
  const centuriesCount = range(16, 20);

  function handleFilterByCentury(newCentury: string) {
    const params = new URLSearchParams(searchParams);

    if (newCentury === 'All') {
      params.delete('centuries');
      setSearchParams(params);

      return;
    }

    const newCenturies = centuries.includes(newCentury)
      ? centuries.filter(century => century !== newCentury)
      : [...centuries, newCentury];

    params.delete('centuries');
    newCenturies.forEach(century => params.append('centuries', century));
    setSearchParams(params);
  }

  function resetFilters() {
    const params = new URLSearchParams(searchParams);

    params.delete('sex');
    params.delete('query');
    params.delete('centuries');
    setSearchParams(params);
  }

  function handleFilterBySex(value: string) {
    const params = new URLSearchParams(searchParams);

    if (value === '') {
      params.delete('sex');
      setSearchParams(params);

      return;
    }

    params.set('sex', value);
    setSearchParams(params);
  }

  function handleFilterByInput(e: React.ChangeEvent<HTMLInputElement>) {
    const params = new URLSearchParams(searchParams);

    if (e.target.value === '') {
      params.delete('query');
      setSearchParams(params);

      return;
    }

    params.set('query', e.target.value);

    setSearchParams(params);
  }

  return (
    <nav className="panel">
      <p className="panel-heading">Filters</p>

      <p className="panel-tabs" data-cy="SexFilter">
        <a
          className={classNames('', { 'is-active': !sex })}
          onClick={() => handleFilterBySex('')}
        >
          All
        </a>
        <a
          className={classNames('', { 'is-active': sex === 'm' })}
          onClick={() => handleFilterBySex('m')}
        >
          Male
        </a>
        <a
          className={classNames('', { 'is-active': sex === 'f' })}
          onClick={() => handleFilterBySex('f')}
        >
          Female
        </a>
        {/* <a className="is-active" href="#/people">
          All
        </a>
        <a className="" href="#/people?sex=m">
          Male
        </a>
        <a className="" href="#/people?sex=f">
          Female
        </a> */}
      </p>

      <div className="panel-block">
        <p className="control has-icons-left">
          <input
            data-cy="NameFilter"
            type="search"
            className="input"
            placeholder="Search"
            onChange={handleFilterByInput}
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
            {centuriesCount.map(century => {
              return (
                <a
                  key={century}
                  onClick={() => handleFilterByCentury(String(century))}
                  data-cy="century"
                  className={classNames('button mr-1', {
                    'is-info': centuries.includes(String(century)),
                  })}
                >
                  {century}
                </a>
              );
            })}
          </div>

          <div className="level-right ml-4">
            <a
              onClick={() => handleFilterByCentury('All')}
              className={classNames('button is-success', {
                'is-outlined': centuries.length > 0,
              })}
              data-cy="centuryALL"
            >
              All
            </a>
          </div>
        </div>
      </div>

      <div className="panel-block">
        <a
          onClick={resetFilters}
          className="button is-link is-outlined is-fullwidth"
        >
          Reset all filters
        </a>
      </div>
    </nav>
  );
};
