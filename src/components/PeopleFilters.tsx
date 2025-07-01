import { Link, useSearchParams } from 'react-router-dom';

export const PeopleFilters = () => {
  const [searchParams, setSearchParams] = useSearchParams();

  const query = searchParams.get('query') || '';

  const handleQueryChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const newQuery = event.target.value;
    const updated = new URLSearchParams(searchParams);

    if (newQuery.trim() === '') {
      updated.delete('query');
    } else {
      updated.set('query', newQuery.trim());
    }

    setSearchParams(updated);
  };

  const centuriesList = ['16', '17', '18', '19', '20'];
  const selectedCenturies = searchParams.getAll('centuries');

  const toggleCentury = (century: string) => {
    const updated = new URLSearchParams(searchParams);

    const alreadySelected = updated.getAll('centuries').includes(century);

    if (alreadySelected) {
      const newCenturies = updated
        .getAll('centuries')
        .filter(c => c !== century);

      updated.delete('centuries');
      newCenturies.forEach(c => updated.append('centuries', c));
    } else {
      updated.append('centuries', century);
    }

    setSearchParams(updated);
  };

  const clearCenturies = () => {
    const updated = new URLSearchParams(searchParams);

    updated.delete('centuries');
    setSearchParams(updated);
  };

  const sex = searchParams.get('sex') || '';

  const handleClick = (newSex: string) => {
    const updated = new URLSearchParams(searchParams);

    if (newSex === '') {
      updated.delete('sex');
    } else {
      updated.set('sex', newSex);
    }

    setSearchParams(updated);
  };

  const resetFilters = (e: React.MouseEvent) => {
    e.preventDefault();
    setSearchParams(new URLSearchParams());
  };

  const createLinkWithSex = (newSex: string) => {
    const updated = new URLSearchParams(searchParams);

    if (newSex === '') {
      updated.delete('sex');
    } else {
      updated.set('sex', newSex);
    }

    return `?${updated.toString()}`;
  };

  return (
    <nav className="panel">
      <p className="panel-heading">Filters</p>

      <p className="panel-tabs" data-cy="SexFilter">
        <Link
          to={createLinkWithSex('')}
          className={sex === '' ? 'is-active' : ''}
          onClick={e => {
            e.preventDefault();
            handleClick('');
          }}
        >
          All
        </Link>
        <Link
          to={createLinkWithSex('m')}
          className={sex === 'm' ? 'is-active' : ''}
          onClick={e => {
            e.preventDefault();
            handleClick('m');
          }}
        >
          Male
        </Link>

        <Link
          to={createLinkWithSex('f')}
          className={sex === 'f' ? 'is-active' : ''}
          onClick={e => {
            e.preventDefault();
            handleClick('f');
          }}
        >
          Female
        </Link>
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
            {centuriesList.map(century => (
              <button
                key={century}
                data-cy="century"
                className={`button mr-1 ${selectedCenturies.includes(century) ? 'is-info' : ''}`}
                onClick={() => toggleCentury(century)}
              >
                {century}
              </button>
            ))}
          </div>

          <div className="level-right ml-4">
            <button
              data-cy="centuryALL"
              className={`button is-success ${selectedCenturies.length > 0 ? 'is-outlined' : ''}`}
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
