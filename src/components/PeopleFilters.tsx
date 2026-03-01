import { Link, NavLink, useSearchParams } from 'react-router-dom';

export const PeopleFilters = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const query = searchParams.get('query') || '';

  const centuriesParam = searchParams.getAll('centuries') || [];
  const selectedCenturies = centuriesParam.map(Number);

  const centuryNumbers = [16, 17, 18, 19, 20];

  const sex = searchParams.get('sex') || '';

  function getSexLink(newSex: string | null) {
    const params = new URLSearchParams(searchParams);

    if (newSex) {
      params.set('sex', newSex);
    } else {
      params.delete('sex');
    }

    return `/people?${params.toString()}`;
  }

  function handleQueryChange(event: React.ChangeEvent<HTMLInputElement>) {
    const value = event.target.value;
    const params = new URLSearchParams(searchParams);

    if (value) {
      params.set('query', value);
    } else {
      params.delete('query'); // если поле пустое, убираем параметр
    }

    setSearchParams(params);
  }

  function toggleCentury(century: number) {
    const params = new URLSearchParams(searchParams);
    const allCenturies = params.getAll('centuries').map(Number);

    if (allCenturies.includes(century)) {
      const newCenturies = allCenturies.filter(c => c !== century);

      params.delete('centuries');
      newCenturies.forEach(c => params.append('centuries', c.toString()));
    } else {
      params.append('centuries', century.toString());
    }

    setSearchParams(params);
  }

  function getClearCenturiesLink() {
    const params = new URLSearchParams(searchParams);

    params.delete('centuries');

    const queryString = params.toString();

    return queryString ? `/people?${queryString}` : '/people';
  }

  return (
    <nav className="panel">
      <p className="panel-heading">Filters</p>

      <p className="panel-tabs" data-cy="SexFilter">
        <NavLink
          className={() => (!sex ? 'is-active' : '')}
          to={getSexLink(null)}
        >
          All
        </NavLink>
        <NavLink
          className={() => (sex === 'm' ? 'is-active' : '')}
          to={getSexLink('m')}
        >
          Male
        </NavLink>
        <NavLink
          className={() => (sex === 'f' ? 'is-active' : '')}
          to={getSexLink('f')}
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
            {centuryNumbers.map(c => (
              <button
                key={c}
                className={`button mr-1 ${selectedCenturies.includes(c) ? 'is-info' : ''}`}
                onClick={() => toggleCentury(c)}
              >
                {c}
              </button>
            ))}
          </div>

          <div className="level-right ml-4">
            <Link
              data-cy="centuryALL"
              className="button is-success is-outlined"
              to={getClearCenturiesLink()}
            >
              All
            </Link>
          </div>
        </div>
      </div>

      <div className="panel-block">
        <Link className="button is-link is-outlined is-fullwidth" to="/people">
          Reset all filters
        </Link>
      </div>
    </nav>
  );
};
