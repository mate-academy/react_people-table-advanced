import classNames from 'classnames';
import { useSearchParams } from 'react-router-dom';

export const PeopleFilters = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const query = searchParams.get('query') || '';
  const centuries = searchParams.getAll('century') || [];
  const sex = searchParams.get('sex');

  function handleQueryChange(event: React.ChangeEvent<HTMLInputElement>) {
    const params = new URLSearchParams(searchParams);

    if (event.target.value === '') {
      params.delete('query');
    } else {
      params.set('query', event.target.value);
    }

    setSearchParams(params);
  }

  function toggleSex(s: string | null) {
    const params = new URLSearchParams(searchParams);

    if (!s) {
      params.delete('sex');
    } else {
      params.set('sex', s);
    }

    setSearchParams(params);
  }

  function toggleCentury(century: string) {
    const params = new URLSearchParams(searchParams);

    const newCentury = centuries.includes(century)
      ? centuries.filter(c => c !== century)
      : [...centuries, century];

    params.delete('century');

    newCentury.forEach(c => params.append('century', c));
    setSearchParams(params);
  }

  function clearFilters() {
    setSearchParams('');
  }

  function toggleAllCentury() {
    const params = new URLSearchParams(searchParams);

    params.delete('century');
    setSearchParams(params);
  }

  return (
    <nav className="panel">
      <p className="panel-heading">Filters</p>

      <p className="panel-tabs" data-cy="SexFilter">
        <a
          className={classNames({ 'is-active': sex !== 'f' && sex !== 'm' })}
          onClick={() => toggleSex(null)}
        >
          All
        </a>
        <a
          className={classNames({ 'is-active': sex === 'm' })}
          onClick={() => toggleSex('m')}
        >
          Male
        </a>
        <a
          className={classNames({ 'is-active': sex === 'f' })}
          onClick={() => toggleSex('f')}
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
            <a
              data-cy="century"
              className={classNames('button', {
                'is-info': centuries.includes('16'),
              })}
              onClick={() => toggleCentury('16')}
            >
              16
            </a>

            <a
              data-cy="century"
              className={classNames('button', {
                'is-info': centuries.includes('17'),
              })}
              onClick={() => toggleCentury('17')}
            >
              17
            </a>

            <a
              data-cy="century"
              className={classNames('button', {
                'is-info': centuries.includes('18'),
              })}
              onClick={() => toggleCentury('18')}
            >
              18
            </a>

            <a
              data-cy="century"
              className={classNames('button', {
                'is-info': centuries.includes('19'),
              })}
              onClick={() => toggleCentury('19')}
            >
              19
            </a>

            <a
              data-cy="century"
              className={classNames('button', {
                'is-info': centuries.includes('20'),
              })}
              onClick={() => toggleCentury('20')}
            >
              20
            </a>
          </div>

          <div className="level-right ml-4">
            <a
              data-cy="centuryALL"
              className="button is-success is-outlined"
              href="#/people"
              onClick={e => {
                e.preventDefault();
                toggleAllCentury();
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
          onClick={clearFilters}
        >
          Reset all filters
        </a>
      </div>
    </nav>
  );
};
