import classNames from 'classnames';
import { useSearchParams } from 'react-router-dom';
import { CENTURIES } from '../config';

export const PeopleFilters = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const query = searchParams.get('query');
  const centuries = searchParams.getAll('century') || [];

  function handleQueryChange(e: React.ChangeEvent<HTMLInputElement>) {
    const { value } = e.target;
    const params = new URLSearchParams(searchParams);

    if (!value.length) {
      params.delete('query');
    } else {
      params.set('query', value);
    }

    setSearchParams(params);
  }

  function handleSettingCentury(century: string) {
    const params = new URLSearchParams(searchParams);

    const newCenturies = centuries.includes(century)
      ? centuries.filter(param => param !== century)
      : [...centuries, century];

    params.delete('century');
    newCenturies.forEach(newCentury => params.append('century', newCentury));

    setSearchParams(params);
  }

  function deleteCenturies() {
    const params = new URLSearchParams(searchParams);

    params.delete('century');
    setSearchParams(params);
  }

  function handleResettingAllFilters() {
    const params = new URLSearchParams(searchParams);

    params.delete('century');
    params.delete('sex');
    params.delete('query');

    setSearchParams(params);
  }

  function handleAddingSex(value: 'm' | 'f') {
    const params = new URLSearchParams();

    params.append('sex', value);

    setSearchParams(params);
  }

  const deleteSex = () => {
    const params = new URLSearchParams();

    params.delete('sex');

    setSearchParams(params);
  };

  return (
    <nav className="panel">
      <p className="panel-heading">Filters</p>
      <p className="panel-tabs" data-cy="SexFilter">
        <a
          className={classNames({ 'is-active': !searchParams.get('sex') })}
          onClick={deleteSex}
        >
          All
        </a>
        <a
          className={classNames({
            'is-active': searchParams.get('sex') === 'm',
          })}
          onClick={() => handleAddingSex('m')}
        >
          Male
        </a>
        <a
          className={classNames({
            'is-active': searchParams.get('sex') === 'f',
          })}
          onClick={() => handleAddingSex('f')}
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
            value={query || ''}
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
            {CENTURIES.map(century => (
              <a
                key={century}
                className={classNames('button', 'mr-1', {
                  'is-info': centuries.find(el => el === century),
                })}
                onClick={() => handleSettingCentury(century)}
              >
                {century}
              </a>
            ))}
          </div>

          <div className="level-right ml-4">
            <a
              data-cy="centuryALL"
              className="button is-success is-outlined"
              onClick={deleteCenturies}
            >
              All
            </a>
          </div>
        </div>
      </div>

      <div className="panel-block">
        <button
          className="button is-link is-outlined is-fullwidth"
          onClick={() => handleResettingAllFilters()}
        >
          Reset all filters
        </button>
      </div>
    </nav>
  );
};
