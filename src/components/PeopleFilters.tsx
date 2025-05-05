import { useState } from 'react';
import { useSearchParams } from 'react-router-dom';

export const PeopleFilters: React.FC = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [nameImput, setNameImput] = useState<string>(
    searchParams.get('name') ?? '',
  );
  const sexFilter = searchParams.get('sex') || 'all';
  const selectedCenturies = searchParams.getAll('centuries');
  const handelNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;

    setNameImput(value);
    const params = new URLSearchParams(searchParams);

    if (value) {
      params.set('name', value);
    } else {
      params.delete('name');
    }

    setSearchParams(params);
  };

  const handleSexChange = (sex: string) => {
    const params = new URLSearchParams(searchParams);

    if (sex === 'all') {
      params.delete('sex');
    } else {
      params.set('sex', sex);
    }

    setSearchParams(params);
  };

  const toggleCentury = (century: string) => {
    const params = new URLSearchParams(searchParams);
    const centuries = params.getAll('centuries');
    const idx = centuries.indexOf(century);

    if (idx === -1) {
      params.append('centuries', century);
    } else {
      params.delete('centuries');
      centuries
        .filter(c => c !== century)
        .forEach(c => params.append('centuries', c));
    }

    setSearchParams(params);
  };

  const resetAll = () => {
    setSearchParams({});
    setNameImput('');
  };

  return (
    <nav className="panel">
      <p className="panel-heading">Filters</p>

      <p className="panel-tabs" data-cy="SexFilter">
        <a
          className={sexFilter === 'all' ? 'is-active' : ''}
          onClick={() => handleSexChange('all')}
        >
          All
        </a>
        <a
          className={sexFilter === 'm' ? 'is-active' : ''}
          onClick={() => handleSexChange('m')}
        >
          Male
        </a>
        <a
          className={sexFilter === 'f' ? 'is-active' : ''}
          onClick={() => handleSexChange('f')}
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
            value={nameImput}
            onChange={handelNameChange}
          />

          <span className="icon is-left">
            <i className="fas fa-search" aria-hidden="true" />
          </span>
        </p>
      </div>

      <div className="panel-block">
        <div className="level is-flex-grow-1 is-mobile" data-cy="CenturyFilter">
          <div className="level-left">
            {[16, 17, 18, 19, 20].map(c => {
              const str = String(c);
              const active = selectedCenturies.includes(str);

              return (
                <button
                  key={c}
                  data-cy="century"
                  className={`button mr-1 ${active ? 'is-info' : ''}`}
                  onClick={() => toggleCentury(str)}
                >
                  {c}
                </button>
              );
            })}
          </div>

          <div className="level-right ml-4">
            <button
              data-cy="centuryALL"
              className="button is-success is-outlined"
              onClick={() => {
                const params = new URLSearchParams(searchParams);

                params.delete('centuries');
                setSearchParams(params);
              }}
            >
              All
            </button>
          </div>
        </div>
      </div>

      <div className="panel-block">
        <button
          className="button is-link is-outlined is-fullwidth"
          onClick={resetAll}
        >
          Reset all filters
        </button>
      </div>
    </nav>
  );
};
