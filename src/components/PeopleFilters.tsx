// import { useEffect } from 'react';
import { useSearchParamsContext } from '../SearchParamsContext';
// import { Link } from 'react-router-dom';

const CENTURIES = ['16', '17', '18', '19', '20'];

export const PeopleFilters = () => {
  const { searchParams, setSearchParams } = useSearchParamsContext();
  // const [isAllSelected, setIsAllSelected] = useState(true);

  const selectedCenturies = searchParams.getAll('centuries');
  const inputValue = searchParams.get('query') || '';

  // useEffect(() => {
  //   console.log("useEffect triggered", selectedCenturies);
  //   setIsAllSelected(selectedCenturies.length === 0);
  // }, [selectedCenturies]);

  const handleNameFilterChange = (event: React.ChangeEvent<
    HTMLInputElement
    >) => {
    const query = event.target.value;

    if (query) {
      searchParams.set('query', query);
    } else {
      searchParams.delete('query');
    }

    setSearchParams(new URLSearchParams(searchParams.toString()));
  };

  const handleResetCenturyFilters = () => {
    const query = searchParams.get('query');

    searchParams.delete('centuries');

    const newParams = new URLSearchParams(searchParams.toString());

    if (query) {
      newParams.set('query', query);
    }

    setSearchParams(newParams);
  };

  const handleCenturyFilterChange = (century: string) => {
    const currentCenturies = searchParams.getAll('centuries');

    if (currentCenturies.includes(century)) {
      const newCenturies = currentCenturies.filter(c => c !== century);

      searchParams.delete('centuries');
      newCenturies.forEach(c => searchParams.append('centuries', c));
    } else {
      searchParams.append('centuries', century);
    }

    setSearchParams(new URLSearchParams(searchParams.toString()));
  };

  const handleResetFilters = () => {
    setSearchParams(new URLSearchParams());
  };

  return (
    <nav className="panel">
      <p className="panel-heading">Filters</p>

      <p className="panel-tabs" data-cy="SexFilter">
        <a className="is-active" href="#/people">All</a>
        <a className="" href="#/people?sex=m">Male</a>
        <a className="" href="#/people?sex=f">Female</a>
      </p>

      <div className="panel-block">
        <p className="control has-icons-left">
          <input
            data-cy="NameFilter"
            type="search"
            className="input"
            placeholder="Search"
            onChange={handleNameFilterChange}
            value={inputValue}
          />

          <span className="icon is-left">
            <i className="fas fa-search" aria-hidden="true" />
          </span>
        </p>
      </div>

      <div className="panel-block">
        <div className="level is-flex-grow-1 is-mobile" data-cy="CenturyFilter">
          <div className="level-left">
            {CENTURIES.map((century) => (
              <button
                key={century}
                data-cy="century"
                type="button"
                className={`button mr-1 ${selectedCenturies.includes(century) ? 'is-info' : ''}`}
                onClick={() => handleCenturyFilterChange(century)}
              >
                {century}
              </button>
            ))}
          </div>

          <div className="level-right ml-4">
            <button
              data-cy="centuryALL"
              type="button"
              className={`button is-outlined ${selectedCenturies.length === 0 ? 'is-success' : 'is-success'}`}
              onClick={handleResetCenturyFilters}
            >
              All
            </button>
          </div>
        </div>
      </div>

      <div className="panel-block">
        <a
          className="button is-link is-outlined is-fullwidth"
          href="#/people"
          onClick={handleResetFilters}
        >
          Reset all filters
        </a>
      </div>
    </nav>
  );
};
