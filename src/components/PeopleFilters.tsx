import classNames from 'classnames';
import { useSearchParams } from 'react-router-dom';

export const PeopleFilters = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const query = searchParams.get('query') || '';
  const currentSex = searchParams.get('sex') || '';
  const centuries = searchParams.getAll('centuries') || [];

  function handleQueryChange(e: React.ChangeEvent<HTMLInputElement>) {
    const params = new URLSearchParams(searchParams);
    const value = e.target.value;

    if (value.trim() === '') {
      params.delete('query');
    } else {
      params.set('query', e.target.value);
    }

    setSearchParams(params);
  }

  function handleSexClick(sexClicked: string) {
    const params = new URLSearchParams(searchParams);

    if (sexClicked === 'all') {
      params.delete('sex');
    } else {
      params.set('sex', sexClicked);
    }

    setSearchParams(params);
  }

  function toggleCenturies(century: string) {
    const params = new URLSearchParams(searchParams);

    const newCenturies = centuries.includes(century)
      ? centuries.filter(c => c !== century)
      : [...centuries, century];

    params.delete('centuries');
    newCenturies.forEach(c => params.append('centuries', c));
    setSearchParams(params);
  }

  function resetCenturies() {
    const params = new URLSearchParams(searchParams);

    params.delete('centuries');
    setSearchParams(params);
  }

  function resetAllFilters() {
    const params = new URLSearchParams(searchParams);

    params.delete('query');
    params.delete('sex');
    params.delete('centuries');

    setSearchParams(params);
  }

  return (
    <nav className="panel">
      <p className="panel-heading">Filters</p>

      <p className="panel-tabs" data-cy="SexFilter">
        <a
          className={classNames({ 'is-active': !currentSex })}
          onClick={() => handleSexClick('all')}
        >
          All
        </a>
        <a
          className={classNames({ 'is-active': currentSex === 'm' })}
          onClick={() => handleSexClick('m')}
        >
          Male
        </a>
        <a
          className={classNames({ 'is-active': currentSex === 'f' })}
          onClick={() => handleSexClick('f')}
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
            onChange={e => handleQueryChange(e)}
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
              className={classNames('button mr-1', {
                'is-info': centuries.includes('16'),
              })}
              onClick={() => toggleCenturies('16')}
            >
              16
            </a>

            <a
              data-cy="century"
              className={classNames('button mr-1', {
                'is-info': centuries.includes('17'),
              })}
              onClick={() => toggleCenturies('17')}
            >
              17
            </a>

            <a
              data-cy="century"
              className={classNames('button mr-1', {
                'is-info': centuries.includes('18'),
              })}
              onClick={() => toggleCenturies('18')}
            >
              18
            </a>

            <a
              data-cy="century"
              className={classNames('button mr-1', {
                'is-info': centuries.includes('19'),
              })}
              onClick={() => toggleCenturies('19')}
            >
              19
            </a>

            <a
              data-cy="century"
              className={classNames('button mr-1', {
                'is-info': centuries.includes('20'),
              })}
              onClick={() => toggleCenturies('20')}
            >
              20
            </a>
          </div>

          <div className="level-right ml-4">
            <a
              data-cy="centuryALL"
              className="button is-success is-outlined"
              onClick={() => resetCenturies()}
            >
              All
            </a>
          </div>
        </div>
      </div>

      <div className="panel-block">
        <a
          className="button is-link is-outlined is-fullwidth"
          onClick={() => resetAllFilters()}
        >
          Reset all filters
        </a>
      </div>
    </nav>
  );
};
