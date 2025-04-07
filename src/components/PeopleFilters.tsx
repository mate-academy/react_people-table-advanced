import classNames from 'classnames';
import { useSearchParams } from 'react-router-dom';

enum Sex {
  Male = 'm',
  Female = 'f',
}

export const PeopleFilters = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const sex = searchParams.get('sex') || '';
  const query = searchParams.get('query') || '';
  const century = searchParams.getAll('centuries') || [];
  const centuries = ['16', '17', '18', '19', '20'];
  const sexFilters = ['All', 'Male', 'Female'];

  function activeSex(value: string) {
    if (value === 'Male') {
      return classNames({ 'is-active': sex === Sex.Male });
    }

    if (value === 'Female') {
      return classNames({ 'is-active': sex === Sex.Female });
    }

    return classNames({ 'is-active': sex === '' });
  }

  function handleQueryChange(e: React.ChangeEvent<HTMLInputElement>) {
    const params = new URLSearchParams(searchParams);

    if (e.target.value) {
      params.set('query', e.target.value);
    } else {
      params.delete('query');
    }

    setSearchParams(params);
  }

  function handleCenturyFilter(ch: string) {
    const params = new URLSearchParams(searchParams);

    if (ch === 'All') {
      params.delete('centuries');

      return setSearchParams(params);
    }

    const newParams = century.includes(ch)
      ? century.filter(item => item !== ch)
      : [...century, ch];

    params.delete('centuries');
    newParams.forEach(item => params.append('centuries', item));

    return setSearchParams(params);
  }

  function handleSexFilter(ch: string) {
    const params = new URLSearchParams(searchParams);

    if (ch === 'Male') {
      params.set('sex', Sex.Male);
    }

    if (ch === 'Female') {
      params.set('sex', Sex.Female);
    }

    if (ch === 'All') {
      params.delete('sex');
    }

    return setSearchParams(params);
  }

  function clearFilters() {
    setSearchParams(new URLSearchParams());
  }

  return (
    <nav className="panel">
      <p className="panel-heading">Filters</p>

      <p className="panel-tabs" data-cy="SexFilter">
        {sexFilters.map((item: string) => (
          <a
            className={activeSex(item)}
            key={item}
            onClick={() => handleSexFilter(item)}
          >
            {item}
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
            onChange={e => handleQueryChange(e)}
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
            {centuries.map(item => (
              <button
                data-cy="century"
                className={classNames('button', 'mr-1', {
                  'is-info': century.includes(item),
                })}
                key={item}
                onClick={() => handleCenturyFilter(item)}
              >
                {item}
              </button>
            ))}
          </div>

          <div className="level-right ml-4">
            <a
              data-cy="centuryALL"
              onClick={() => handleCenturyFilter('All')}
              className={classNames('button', 'is-outlined', {
                'is-success': century.length === 0,
              })}
            >
              All
            </a>
          </div>
        </div>
      </div>

      <div className="panel-block">
        <a
          className="button is-link is-outlined is-fullwidth"
          onClick={() => clearFilters()}
        >
          Reset all filters
        </a>
      </div>
    </nav>
  );
};
