import React from 'react';
import { useSearchParams } from 'react-router-dom';

export const PeopleFilters = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const query = searchParams.get('query') || '';
  const centuries = searchParams.getAll('centuries') || [];
  const sex = searchParams.get('sex') || '';

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;

    if (value) {
      searchParams.set('query', value);
    } else {
      searchParams.delete('query');
    }

    setSearchParams(searchParams);
  };

  function toggleCentury(ch: string) {
    const params = new URLSearchParams(searchParams);
    const currentCenturies = params.getAll('centuries');
    const newCenturies = currentCenturies.includes(ch)
      ? currentCenturies.filter(century => century !== ch)
      : [...currentCenturies, ch];

    params.delete('centuries');
    newCenturies.forEach(century => params.append('centuries', century));
    setSearchParams(params);
  }

  return (
    <nav className="panel">
      <p className="panel-heading">Filters</p>

      <p className="panel-tabs" data-cy="SexFilter">
        <a
          className={`${!sex ? 'is-active' : ''}`}
          onClick={() => {
            const params = new URLSearchParams(searchParams);

            params.delete('sex');
            setSearchParams(params);
          }}
        >
          All
        </a>

        <a
          className={`${sex === 'm' ? 'is-active' : ''}`}
          onClick={() => {
            const params = new URLSearchParams(searchParams);

            params.set('sex', 'm');
            setSearchParams(params);
          }}
        >
          Male
        </a>

        <a
          className={`${sex === 'f' ? 'is-active' : ''}`}
          onClick={() => {
            const params = new URLSearchParams(searchParams);

            params.set('sex', 'f');
            setSearchParams(params);
          }}
        >
          Female
        </a>
      </p>

      <div className="panel-block">
        <p className="control has-icons-left">
          <input
            data-cy="NameFilter"
            type="search"
            value={query}
            onChange={handleChange}
            className="input"
            placeholder="Search"
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
              className={`button mr-1 ${centuries.includes('16') ? 'is-info' : ''}`}
              onClick={() => toggleCentury('16')}
            >
              16
            </a>

            <a
              data-cy="century"
              className={`button mr-1 ${centuries.includes('17') ? 'is-info' : ''}`}
              onClick={() => toggleCentury('17')}
            >
              17
            </a>

            <a
              data-cy="century"
              className={`button mr-1 ${centuries.includes('18') ? 'is-info' : ''}`}
              onClick={() => toggleCentury('18')}
            >
              18
            </a>

            <a
              data-cy="century"
              className={`button mr-1 ${centuries.includes('19') ? 'is-info' : ''}`}
              onClick={() => toggleCentury('19')}
            >
              19
            </a>

            <a
              data-cy="century"
              className={`button mr-1 ${centuries.includes('20') ? 'is-info' : ''}`}
              onClick={() => toggleCentury('20')}
            >
              20
            </a>
          </div>

          <div className="level-right ml-4">
            <a
              data-cy="centuryALL"
              className={`button ${centuries.length === 0 ? 'is-success is-active' : 'is-outlined'}`}
              onClick={() => {
                const params = new URLSearchParams(searchParams);

                params.delete('centuries');
                setSearchParams(params);
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
          onClick={() => {
            const params = new URLSearchParams();

            setSearchParams(params);
          }}
        >
          Reset all filters
        </a>
      </div>
    </nav>
  );
};
