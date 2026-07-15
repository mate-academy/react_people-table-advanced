import classNames from 'classnames';
import { useSearchParams } from 'react-router-dom';

export const PeopleFilters = () => {
  const [searchParams, setSearchParams] = useSearchParams();

  const centuries = searchParams.getAll('centuries') || [];
  const query = searchParams.get('query') || '';
  const sex = searchParams.get('sex');

  function handleQueryChange(event: React.ChangeEvent<HTMLInputElement>) {
    const params = new URLSearchParams(searchParams);
    const value = event.target.value;

    if (value.trim()) {
      params.set('query', value);
    } else {
      params.delete('query');
    }

    setSearchParams(params);
  }

  function toggleCentury(num: string) {
    const params = new URLSearchParams(searchParams);

    const newCenturies = centuries.includes(num)
      ? centuries.filter(century => century !== num)
      : [...centuries, num];

    params.delete('centuries');
    newCenturies.forEach(century => params.append('centuries', century));
    setSearchParams(params);
  }

  function clearCenturies() {
    const params = new URLSearchParams(searchParams);

    params.delete('centuries');
    setSearchParams(params);
  }

  function handleSexChange(newSex: string | null) {
    const params = new URLSearchParams(searchParams);

    if (newSex) {
      params.set('sex', newSex);
    } else {
      params.delete('sex');
    }

    setSearchParams(params);
  }

  function resetAll() {
    const params = new URLSearchParams(searchParams);

    params.delete('centuries');
    params.delete('sex');
    params.delete('query');
    setSearchParams(params);
  }

  return (
    <nav className="panel">
      <p className="panel-heading">Filters</p>

      <p className="panel-tabs" data-cy="SexFilter">
        <a
          className={classNames({ 'is-active': sex === null })}
          onClick={() => handleSexChange(null)}
        >
          All
        </a>
        <a
          className={classNames({ 'is-active': sex === 'm' })}
          onClick={() => handleSexChange('m')}
        >
          Male
        </a>
        <a
          className={classNames({ 'is-active': sex === 'f' })}
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
            {[16, 17, 18, 19, 20].map(century => (
              <a
                data-cy="century"
                key={century}
                onClick={() => toggleCentury(century.toString())}
                className={classNames('button', 'mr-1', {
                  'is-info': centuries.includes(century.toString()),
                })}
              >
                {century}
              </a>
            ))}
          </div>

          <div className="level-right ml-4">
            <a
              data-cy="centuryALL"
              className="button is-success is-outlined"
              onClick={() => clearCenturies()}
            >
              All
            </a>
          </div>
        </div>
      </div>

      <div className="panel-block">
        <a
          className="button is-link is-outlined is-fullwidth"
          onClick={() => resetAll()}
        >
          Reset all filters
        </a>
      </div>
    </nav>
  );
};
