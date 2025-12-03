import classNames from 'classnames';
import { useSearchParams } from 'react-router-dom';

const centuries = ['16', '17', '18', '19', '20'];

export const PeopleFilters = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const query = searchParams.get('query') || '';

  const handleQueryChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value;

    if (value) {
      searchParams.set('query', value);
    } else {
      searchParams.delete('query');
    }

    setSearchParams(searchParams);
  };

  const selectedCenturies = searchParams.getAll('centuries');

  const toggleCentury = (century: string) => {
    const newParams = new URLSearchParams(searchParams);

    const current = newParams.getAll('centuries');

    if (current.includes(century)) {
      const updated = current.filter(c => c !== century);

      newParams.delete('centuries');
      updated.forEach(c => newParams.append('centuries', c));
    } else {
      newParams.append('centuries', century);
    }

    setSearchParams(newParams);
  };

  const clearCenturies = () => {
    const newParams = new URLSearchParams(searchParams);

    newParams.delete('centuries');
    setSearchParams(newParams);
  };

  const sex = searchParams.get('sex');

  const setSex = (value: string | null) => {
    const newParams = new URLSearchParams(searchParams);

    if (value) {
      newParams.set('sex', value);
    } else {
      newParams.delete('sex');
    }

    setSearchParams(newParams);
  };

  const resetFilters = () => {
    setSearchParams(new URLSearchParams());
  };

  return (
    <nav className="panel">
      <p className="panel-heading">Filters</p>

      <p className="panel-tabs" data-cy="SexFilter">
        <button
          className={classNames({ 'is-active': !sex })}
          onClick={() => setSex(null)}
        >
          All
        </button>

        <button
          className={classNames({ 'is-active': sex === 'm' })}
          onClick={() => setSex('m')}
        >
          Male
        </button>

        <button
          className={classNames({ 'is-active': sex === 'f' })}
          onClick={() => setSex('f')}
        >
          Female
        </button>
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
            {centuries.map(century => (
              <button
                key={century}
                data-cy="century"
                className={classNames('button mr-1', {
                  'is-info': selectedCenturies.includes(century),
                })}
                onClick={() => toggleCentury(century)}
              >
                {century}
              </button>
            ))}
          </div>

          <div className="level-right ml-4">
            <button
              data-cy="centuryALL"
              className="button is-success is-outlined"
              onClick={clearCenturies}
            >
              All
            </button>
          </div>
        </div>
      </div>

      <div className="panel-block">
        <button
          className="button is-link is-outlined is-fullwidth"
          onClick={resetFilters}
        >
          Reset all filters
        </button>
      </div>
    </nav>
  );
};
