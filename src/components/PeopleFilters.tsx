import { useSearchParams } from 'react-router-dom';

export const PeopleFilters = () => {
  const [searchParams, setSearchParams] = useSearchParams();

  const query = searchParams.get('query') || '';
  const allCenturies = searchParams.getAll('centuries');

  const handleQueryChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const newQuery = event.target.value;
    const newSearchParams = new URLSearchParams(searchParams);

    if (newQuery) {
      newSearchParams.set('query', newQuery);
    } else {
      newSearchParams.delete('query');
    }

    setSearchParams(newSearchParams);
  };

  const handleOneCentury = (century: string) => {
    const newSearchParams = new URLSearchParams(searchParams);

    if (allCenturies.includes(century)) {
      const filteredCenturies = allCenturies.filter(item => item !== century);

      newSearchParams.delete('centuries');

      filteredCenturies.forEach(item => {
        newSearchParams.append('centuries', item);
      });
    } else {
      newSearchParams.append('centuries', century);
    }

    setSearchParams(newSearchParams);
  };

  const handleAllCenturies = () => {
    const newSearchParams = new URLSearchParams(searchParams);

    newSearchParams.delete('centuries');

    setSearchParams(newSearchParams);
  };

  const isCenturySelected = (century: string) => {
    if (allCenturies.includes(century)) {
      return true;
    } else {
      return false;
    }
  };

  return (
    <nav className="panel">
      <p className="panel-heading">Filters</p>

      <p className="panel-tabs" data-cy="SexFilter">
        <a className="is-active" href="#/people">
          All
        </a>
        <a className="" href="#/people?sex=m">
          Male
        </a>
        <a className="" href="#/people?sex=f">
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
              className={
                isCenturySelected('16') ? 'button mr-1 is-info' : 'button mr-1'
              }
              href="#/people?centuries=16"
              onClick={() => handleOneCentury('16')}
            >
              16
            </a>

            <a
              data-cy="century"
              className={
                isCenturySelected('17') ? 'button mr-1 is-info' : 'button mr-1'
              }
              href="#/people?centuries=17"
              onClick={() => handleOneCentury('17')}
            >
              17
            </a>

            <a
              data-cy="century"
              className={
                isCenturySelected('18') ? 'button mr-1 is-info' : 'button mr-1'
              }
              href="#/people?centuries=18"
              onClick={() => handleOneCentury('18')}
            >
              18
            </a>

            <a
              data-cy="century"
              className={
                isCenturySelected('19') ? 'button mr-1 is-info' : 'button mr-1'
              }
              href="#/people?centuries=19"
              onClick={() => handleOneCentury('19')}
            >
              19
            </a>

            <a
              data-cy="century"
              className={
                isCenturySelected('20') ? 'button mr-1 is-info' : 'button mr-1'
              }
              href="#/people?centuries=20"
              onClick={() => handleOneCentury('20')}
            >
              20
            </a>
          </div>

          <div className="level-right ml-4">
            <a
              data-cy="centuryALL"
              className="button is-success is-outlined"
              href="#/people"
              onClick={handleAllCenturies}
            >
              All
            </a>
          </div>
        </div>
      </div>

      <div className="panel-block">
        <a className="button is-link is-outlined is-fullwidth" href="#/people">
          Reset all filters
        </a>
      </div>
    </nav>
  );
};
