import classNames from 'classnames';
import { useSearchParams } from 'react-router-dom';

export const PeopleFilters = () => {
  const [searchParams, setSearchParams] = useSearchParams();

  const sex = searchParams.get('sex');
  const centuries = searchParams.getAll('centuries');
  const name = searchParams.get('name') || '';

  const toggleCentury = (century: string) => {
    const newCenturies = new Set(centuries);

    if (newCenturies.has(century)) {
      newCenturies.delete(century);
    } else {
      newCenturies.add(century);
    }

    const newParams = new URLSearchParams(searchParams);

    newParams.delete('centuries');
    newCenturies.forEach(c => newParams.append('centuries', c));

    setSearchParams(newParams);
  };

  const updateParam = (key: string, value: string) => {
    const newParams = new URLSearchParams(searchParams);

    if (value === '') {
      newParams.delete(key);
    } else {
      newParams.set(key, value);
    }

    setSearchParams(newParams);
  };

  const resetFilters = () => {
    setSearchParams({});
  };

  return (
    <nav className="panel">
      <p className="panel-heading">Filters</p>

      <p className="panel-tabs" data-cy="SexFilter">
        {['', 'm', 'f'].map(s => (
          <a
            key={s}
            className={classNames({ 'is-active': sex === s || (!s && !sex) })}
            onClick={() => updateParam('sex', s)}
          >
            {s === 'm' ? 'Male' : s === 'f' ? 'Female' : 'All'}
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
            value={name}
            onChange={e => updateParam('name', e.target.value)}
          />
          <span className="icon is-left">
            <i className="fas fa-search" />
          </span>
        </p>
      </div>

      <div className="panel-block">
        <div className="level is-flex-grow-1 is-mobile" data-cy="CenturyFilter">
          <div className="level-left is-flex is-flex-wrap-wrap">
            {[16, 17, 18, 19, 20].map(c => (
              <a
                key={c}
                data-cy="century"
                className={classNames('button mr-1 mb-1', {
                  'is-info': centuries.includes(c.toString()),
                })}
                onClick={() => toggleCentury(c.toString())}
              >
                {c}
              </a>
            ))}
          </div>

          <div className="level-right ml-4">
            <a
              data-cy="centuryALL"
              className={classNames('button', {
                'is-success': centuries.length === 0,
                'is-success is-outlined': centuries.length > 0,
              })}
              onClick={() => {
                const newParams = new URLSearchParams(searchParams);

                newParams.delete('centuries');
                setSearchParams(newParams);
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
          onClick={resetFilters}
        >
          Reset all filters
        </a>
      </div>
    </nav>
  );
};
