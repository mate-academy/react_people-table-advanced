import { useParams, useSearchParams } from 'react-router-dom';
import classNames from 'classnames';

const CENTURIES = ['16', '17', '18', '19', '20'] as const;

export const PeopleFilters = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const { personName } = useParams();

  const centuries = searchParams.getAll('centuries');

  function handleSearch(e: React.ChangeEvent<HTMLInputElement>) {
    const params = new URLSearchParams(searchParams);
    const value = e.target.value.toLowerCase();

    if (value === '') {
      params.delete('query');
    } else {
      params.set('query', value);
    }

    setSearchParams(params);
  }

  function handleCentury(century: string) {
    const params = new URLSearchParams(searchParams);
    let newCenturies: string[] = [];

    newCenturies = centuries.includes(century)
      ? centuries.filter(c => c !== century)
      : [...centuries, century];

    params.delete('centuries');
    newCenturies.forEach(c => params.append('centuries', c));
    setSearchParams(params);
  }

  function handleCenturyReset() {
    const params = new URLSearchParams(searchParams);

    params.delete('centuries');
    setSearchParams(params);
  }

  function getCenturyHref(century: string) {
    const params = new URLSearchParams(searchParams);
    let result = '';

    params.append('centuries', century);

    if (personName) {
      result += `/${personName}`;
    }

    if (centuries.includes(century)) {
      const filteredCenturies = centuries.filter(c => c !== century);

      params.delete('centuries');
      filteredCenturies.forEach(c => params.append('centuries', c));
    }

    result += params.toString() ? `?${params.toString()}` : '';

    return result;
  }

  return (
    <nav className="panel">
      <p className="panel-heading">Filters</p>

      <p className="panel-tabs" data-cy="SexFilter">
        <a
          className={classNames({ 'is-active': sexParam === null })}
          href={`#/people?${getSearchWith(searchParams, {})}`}
          onClick={e => handleSexClick(e, null)}
        >
          All
        </a>
        <a
          className={classNames({ 'is-active': sexParam === 'm' })}
          href={`#/people?${getSearchWith(searchParams, { sex: 'm' })}`}
          onClick={e => handleSexClick(e, 'm')}
        >
          Male
        </a>
        <a
          className={classNames({ 'is-active': sexParam === 'f' })}
          href={`#/people?${getSearchWith(searchParams, { sex: 'f' })}`}
          onClick={e => handleSexClick(e, 'f')}
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
            onChange={handleSearch}
            value={searchParams.get('query') || ''}
          />

          <span className="icon is-left">
            <i className="fas fa-search" aria-hidden="true" />
          </span>
        </p>
      </div>

      <div className="panel-block">
        <div className="level is-flex-grow-1 is-mobile" data-cy="CenturyFilter">
          <div className="level-left">
            {CENTURIES.map(century => (
              <a
                key={century}
                data-cy="century"
                className={classNames('button mr-1', {
                  'is-info': centuries.includes(century),
                })}
                href={`#/people${getCenturyHref(century)}`}
                onClick={e => {
                  e.preventDefault();
                  handleCentury(century);
                }}
              >
                {century}
              </a>
            ))}
          </div>

          <div className="level-right ml-4">
            <a
              data-cy="centuryALL"
              className="button is-success is-outlined"
              href="#/people"
              onClick={e => {
                e.preventDefault();
                handleCenturyReset();
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
          onClick={e => handleResetFilters(e)}
        >
          Reset all filters
        </a>
      </div>
    </nav>
  );
};
