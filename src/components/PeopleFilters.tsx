import { useSearchParams } from 'react-router-dom';

export const PeopleFilters = () => {
  const [searchParams, setSearchParams] = useSearchParams();

  const centuries = searchParams.getAll('centuries');

  const sex = searchParams.get('sex') || '';

  const handleSex = (value: string) => {
    const params = new URLSearchParams(searchParams);

    if (value) {
      params.set('sex', value);
    } else {
      params.delete('sex');
    }

    setSearchParams(params);
  };

  const hundleAllCenturies = () => {
    const params = new URLSearchParams(searchParams);

    params.delete('centuries');
    setSearchParams(params);
  };

  const hundleReset = () => {
    const params = new URLSearchParams(searchParams);

    params.delete('query');
    params.delete('sex');
    params.delete('centuries');
    setSearchParams(params);
  };

  const hundleCentury = (c: string) => {
    const params = new URLSearchParams(searchParams);

    if (centuries.includes(c)) {
      params.delete('centuries');
      centuries
        .filter(cent => cent !== c)
        .forEach(cent => {
          params.append('centuries', cent);
        });
    } else {
      params.append('centuries', c);
    }

    setSearchParams(params);
  };

  const hundleSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
    const params = new URLSearchParams(searchParams);

    if (event.target.value) {
      params.set('query', event.target.value);
    } else {
      params.delete('query');
    }

    setSearchParams(params);
  };

  return (
    <nav className="panel">
      <p className="panel-heading">Filters</p>

      <p className="panel-tabs" data-cy="SexFilter">
        <a
          className={sex === '' ? 'is-active' : ''}
          onClick={() => handleSex('')}
        >
          All
        </a>
        <a
          className={sex === 'm' ? 'is-active' : ''}
          onClick={() => handleSex('m')}
        >
          Male
        </a>
        <a
          className={sex === 'f' ? 'is-active' : ''}
          onClick={() => handleSex('f')}
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
            value={searchParams.get('query') || ''}
            onChange={hundleSearch}
          />

          <span className="icon is-left">
            <i className="fas fa-search" aria-hidden="true" />
          </span>
        </p>
      </div>

      <div className="panel-block">
        <div className="level is-flex-grow-1 is-mobile" data-cy="CenturyFilter">
          <div className="level-left">
            {[16, 17, 18, 19, 20].map(c => (
              <a
                key={c}
                data-cy="century"
                className={`button mr-1 ${centuries.includes(String(c)) ? 'is-info' : ''}`}
                onClick={() => hundleCentury(String(c))}
              >
                {c}
              </a>
            ))}
          </div>

          <div className="level-right ml-4">
            <a
              data-cy="centuryALL"
              className="button is-success is-outlined"
              onClick={hundleAllCenturies}
            >
              All
            </a>
          </div>
        </div>
      </div>

      <div className="panel-block">
        <a
          className="button is-link is-outlined is-fullwidth"
          onClick={hundleReset}
        >
          Reset all filters
        </a>
      </div>
    </nav>
  );
};
