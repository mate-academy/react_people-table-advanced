import { useSearchParams } from 'react-router-dom';
import classNames from 'classnames'; // або самі пишіть умовні класи

export const PeopleFilters = () => {
  const [searchParams, setSearchParams] = useSearchParams();

  // Зчитуємо поточні значення
  const sex = searchParams.get('sex') || ''; // '' | 'm' | 'f'
  const query = searchParams.get('query') || ''; // для пошуку по імені
  const centuriesStr = searchParams.get('centuries') || ''; // "17,18,19" або "17"
  const centuries = centuriesStr
    ? centuriesStr.split(',').map(Number).filter(Boolean)
    : [];

  // ─── handlers ───────────────────────────────────────────────

  const updateParams = (newParams: Record<string, string | null>) => {
    setSearchParams(prev => {
      const next = new URLSearchParams(prev);

      Object.entries(newParams).forEach(([k, v]) => {
        if (v === null || v === '') {
          next.delete(k);
        } else {
          next.set(k, v);
        }
      });

      return next;
    });
  };

  const handleSexChange = (value: string) => {
    updateParams({ sex: value || null });
  };

  const handleQueryChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    updateParams({ query: e.target.value || null });
  };

  const toggleCentury = (cent: number) => {
    const newCenturies = centuries.includes(cent)
      ? centuries.filter(c => c !== cent)
      : [...centuries, cent];

    const value =
      newCenturies.length > 0
        ? newCenturies.sort((a, b) => a - b).join(',')
        : null;

    updateParams({ centuries: value });
  };

  const resetAll = () => {
    setSearchParams({});
  };

  // ─── render ─────────────────────────────────────────────────

  return (
    <nav className="panel">
      <p className="panel-heading">Filters</p>

      {/* Sex */}
      <p className="panel-tabs" data-cy="SexFilter">
        <a
          className={classNames({ 'is-active': sex === '' })}
          onClick={() => handleSexChange('')}
          style={{ cursor: 'pointer' }}
        >
          All
        </a>
        <a
          className={classNames({ 'is-active': sex === 'm' })}
          onClick={() => handleSexChange('m')}
          style={{ cursor: 'pointer' }}
        >
          Male
        </a>
        <a
          className={classNames({ 'is-active': sex === 'f' })}
          onClick={() => handleSexChange('f')}
          style={{ cursor: 'pointer' }}
        >
          Female
        </a>
      </p>

      {/* Name search */}
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

      {/* Centuries – multi-select */}
      <div className="panel-block">
        <div className="level is-flex-grow-1 is-mobile" data-cy="CenturyFilter">
          <div className="level-left">
            {[16, 17, 18, 19, 20].map(c => (
              <a
                key={c}
                data-cy="century"
                className={classNames('button mr-1', {
                  'is-info': centuries.includes(c),
                })}
                onClick={() => toggleCentury(c)}
                style={{ cursor: 'pointer' }}
              >
                {c}
              </a>
            ))}
          </div>

          <div className="level-right ml-4">
            <a
              data-cy="centuryALL"
              className="button is-success is-outlined"
              onClick={() => updateParams({ centuries: null })}
              style={{ cursor: 'pointer' }}
            >
              All
            </a>
          </div>
        </div>
      </div>

      {/* Reset */}
      <div className="panel-block">
        <a
          className="button is-link is-outlined is-fullwidth"
          onClick={resetAll}
          style={{ cursor: 'pointer' }}
        >
          Reset all filters
        </a>
      </div>
    </nav>
  );
};
