type Props = {
  searchParams: URLSearchParams;
  setSearchParams: (params: URLSearchParams) => void;
};

export const PeopleFilters: React.FC<Props> = ({
  searchParams,
  setSearchParams,
}) => {
  const updateParams = (updates: Record<string, string | null>) => {
    const newParams = new URLSearchParams(searchParams);

    Object.entries(updates).forEach(([key, value]) => {
      if (value === null) {
        newParams.delete(key);
      } else {
        newParams.set(key, value);
      }
    });

    setSearchParams(newParams);
  };

  const toggleCentury = (century: string) => {
    const current = searchParams.getAll('centuries');
    const newParams = new URLSearchParams(searchParams);

    if (current.includes(century)) {
      const updated = current.filter(c => c !== century);

      newParams.delete('centuries');
      updated.forEach(c => newParams.append('centuries', c));
    } else {
      newParams.append('centuries', century);
    }

    setSearchParams(newParams);
  };

  const selectedCenturies = searchParams.getAll('centuries');

  return (
    <nav className="panel">
      <p className="panel-heading">Filters</p>

      <p className="panel-tabs" data-cy="SexFilter">
        <a
          className={!searchParams.get('sex') ? 'is-active' : ''}
          onClick={() => updateParams({ sex: null })}
        >
          All
        </a>
        <a
          className={searchParams.get('sex') === 'm' ? 'is-active' : ''}
          onClick={() => updateParams({ sex: 'm' })}
        >
          Male
        </a>
        <a
          className={searchParams.get('sex') === 'f' ? 'is-active' : ''}
          onClick={() => updateParams({ sex: 'f' })}
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
            onChange={e => {
              const value = e.target.value.trim();

              updateParams({ query: value || null });
            }}
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
              className={`button mr-1 ${selectedCenturies?.includes('16') ? 'is-info' : ''}`}
              onClick={() => toggleCentury('16')}
            >
              16
            </a>

            <a
              data-cy="century"
              className={`button mr-1 ${selectedCenturies?.includes('17') ? 'is-info' : ''}`}
              onClick={() => toggleCentury('17')}
            >
              17
            </a>

            <a
              data-cy="century"
              className={`button mr-1 ${selectedCenturies?.includes('18') ? 'is-info' : ''}`}
              onClick={() => toggleCentury('18')}
            >
              18
            </a>

            <a
              data-cy="century"
              className={`button mr-1 ${selectedCenturies?.includes('19') ? 'is-info' : ''}`}
              onClick={() => toggleCentury('19')}
            >
              19
            </a>

            <a
              data-cy="century"
              className={`button mr-1 ${selectedCenturies?.includes('20') ? 'is-info' : ''}`}
              onClick={() => toggleCentury('20')}
            >
              20
            </a>
          </div>

          <div className="level-right ml-4">
            <a
              data-cy="centuryALL"
              className={`button ${selectedCenturies.length === 0 ? 'is-success' : ''}`}
              onClick={() => {
                const newParams = new URLSearchParams(searchParams);

                newParams.delete('centuries');
                setSearchParams(newParams);
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
            setSearchParams(new URLSearchParams());
          }}
        >
          Reset all filters
        </a>
      </div>
    </nav>
  );
};
