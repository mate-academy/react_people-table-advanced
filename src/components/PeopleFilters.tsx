import { useSearchParams } from 'react-router-dom';

export const PeopleFilters = () => {
  const [searchParams, setSearchParams] = useSearchParams();

  const changeSearchParam = (key: string, value?: string) => {
    const params = new URLSearchParams(searchParams);

    if (value) {
      params.set(key, value);
    } else {
      params.delete(key);
    }

    setSearchParams(params);
  };

  const selectedCenturies = searchParams.getAll('centuries');

  const toggleCentury = (centuryNumber: string) => {
    const params = new URLSearchParams(searchParams);

    if (selectedCenturies.includes(centuryNumber)) {
      const updatedCenturies = selectedCenturies.filter(
        century => century !== centuryNumber,
      );

      params.delete('centuries');

      updatedCenturies.forEach(century => {
        params.append('centuries', century);
      });
    } else {
      params.append('centuries', centuryNumber);
    }

    setSearchParams(params);
  };

  const resetCenturies = () => {
    const params = new URLSearchParams(searchParams);

    params.delete('centuries');
    setSearchParams(params);
  };

  const resetFilters = () => {
    setSearchParams({});
  };

  return (
    <nav className="panel">
      <p className="panel-heading">Filters</p>

      <p className="panel-tabs" data-cy="SexFilter">
        <a
          className={!searchParams.has('sex') ? 'is-active' : ''}
          onClick={() => changeSearchParam('sex')}
        >
          All
        </a>

        <a
          className={searchParams.get('sex') === 'm' ? 'is-active' : ''}
          onClick={() => changeSearchParam('sex', 'm')}
        >
          Male
        </a>

        <a
          className={searchParams.get('sex') === 'f' ? 'is-active' : ''}
          onClick={() => changeSearchParam('sex', 'f')}
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
            onChange={event => {
              changeSearchParam('query', event.target.value);
            }}
            value={searchParams.get('query') ?? ''}
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
                selectedCenturies.includes('16')
                  ? 'button mr-1 is-info'
                  : 'button mr-1'
              }
              onClick={() => toggleCentury('16')}
            >
              16
            </a>

            <a
              data-cy="century"
              className={
                selectedCenturies.includes('17')
                  ? 'button mr-1 is-info'
                  : 'button mr-1'
              }
              onClick={() => toggleCentury('17')}
            >
              17
            </a>

            <a
              data-cy="century"
              className={
                selectedCenturies.includes('18')
                  ? 'button mr-1 is-info'
                  : 'button mr-1'
              }
              onClick={() => toggleCentury('18')}
            >
              18
            </a>

            <a
              data-cy="century"
              className={
                selectedCenturies.includes('19')
                  ? 'button mr-1 is-info'
                  : 'button mr-1'
              }
              onClick={() => toggleCentury('19')}
            >
              19
            </a>

            <a
              data-cy="century"
              className={
                selectedCenturies.includes('20')
                  ? 'button mr-1 is-info'
                  : 'button mr-1'
              }
              onClick={() => toggleCentury('20')}
            >
              20
            </a>
          </div>

          <div className="level-right ml-4">
            <a
              data-cy="centuryALL"
              className="button is-success is-outlined"
              onClick={resetCenturies}
            >
              All
            </a>
          </div>
        </div>
      </div>

      <div className="panel-block">
        <a
          className="button is-link is-outlined is-fullwidth"
          onClick={resetFilters}
        >
          Reset all filters
        </a>
      </div>
    </nav>
  );
};
