import { NavLink, useLocation, useSearchParams } from 'react-router-dom';
import classNames from 'classnames';

export const PeopleFilters = () => {
  const [searchParams, setSearchParams] = useSearchParams();

  const location = useLocation();
  const filterParams = new URLSearchParams(location.search);
  const centuries = filterParams.getAll('centuries');

  function handleQueryChange(param: string) {
    const newParams = new URLSearchParams(searchParams);

    newParams.set('query', param);
    setSearchParams(newParams);

    if (newParams.get('query') === '') {
      newParams.delete('query');
      setSearchParams(newParams);
    }
  }

  function handleCenturyChange(century: string) {
    const newParams = new URLSearchParams(searchParams);
    const centuriesParams = newParams.getAll('centuries');

    if (centuriesParams.includes(century)) {
      const updated = centuriesParams.filter(c => c !== century);

      newParams.delete('centuries');
      updated.forEach(c => newParams.append('centuries', c));
    } else {
      newParams.append('centuries', century);
    }

    setSearchParams(newParams.toString());
  }

  function removeAllCenturies() {
    const allParams = new URLSearchParams(location.search);

    allParams.delete('centuries');

    setSearchParams(allParams);
  }

  const createGenderLink = (gender: string | null) => {
    const newSearchParams = new URLSearchParams(searchParams.toString());

    if (gender) {
      newSearchParams.set('sex', gender);
    } else {
      newSearchParams.delete('sex');
    }

    return `${location.pathname}?${newSearchParams.toString()}`;
  };

  const resetAllFilters = () => {
    const newSearchParams = new URLSearchParams(searchParams);

    newSearchParams.delete('sex');
    newSearchParams.delete('centuries');
    newSearchParams.delete('query');

    setSearchParams(newSearchParams);
  };

  const currentSexParam = searchParams.get('sex');

  return (
    <nav className="panel">
      <p className="panel-heading">Filters</p>

      <p className="panel-tabs" data-cy="SexFilter">
        <NavLink
          className={() => {
            return !currentSexParam ? 'is-active' : '';
          }}
          to={createGenderLink(null)}
        >
          All
        </NavLink>
        <NavLink
          className={() => (currentSexParam === 'm' ? 'is-active' : '')}
          to={createGenderLink('m')}
        >
          Male
        </NavLink>
        <NavLink
          className={() => (currentSexParam === 'f' ? 'is-active' : '')}
          to={createGenderLink('f')}
        >
          Female
        </NavLink>
      </p>

      <div className="panel-block">
        <p className="control has-icons-left">
          <input
            data-cy="NameFilter"
            type="search"
            className="input"
            value={searchParams.get('query') || ''}
            placeholder="Search"
            onChange={e => handleQueryChange(e.target.value)}
          />

          <span className="icon is-left">
            <i className="fas fa-search" aria-hidden="true" />
          </span>
        </p>
      </div>

      <div className="panel-block">
        <div className="level is-flex-grow-1 is-mobile" data-cy="CenturyFilter">
          <div className="level-left">
            <button
              data-cy="century"
              className={classNames('button', 'mr-1', {
                'is-info': centuries.includes('16'),
              })}
              onClick={() => handleCenturyChange('16')}
            >
              16
            </button>

            <button
              data-cy="century"
              className={classNames('button', 'mr-1', {
                'is-info': centuries.includes('17'),
              })}
              onClick={() => handleCenturyChange('17')}
            >
              17
            </button>

            <button
              data-cy="century"
              className={classNames('button', 'mr-1', {
                'is-info': centuries.includes('18'),
              })}
              onClick={() => handleCenturyChange('18')}
            >
              18
            </button>

            <button
              data-cy="century"
              className={classNames('button', 'mr-1', {
                'is-info': centuries.includes('19'),
              })}
              onClick={() => handleCenturyChange('19')}
            >
              19
            </button>

            <button
              data-cy="century"
              className={classNames('button', 'mr-1', {
                'is-info': centuries.includes('20'),
              })}
              onClick={() => handleCenturyChange('20')}
            >
              20
            </button>
          </div>

          <div className="level-right ml-4">
            <button
              data-cy="centuryALL"
              className="button is-success is-outlined"
              onClick={() => removeAllCenturies()}
            >
              All
            </button>
          </div>
        </div>
      </div>

      <div className="panel-block">
        <button
          className="button is-link is-outlined is-fullwidth"
          onClick={resetAllFilters}
        >
          Reset all filters
        </button>
      </div>
    </nav>
  );
};
