import React, { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';

export const PeopleFilters = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const sex = searchParams.get('sex') || '';

  const [query, setQuery] = useState('');
  const [selectedCenturies, setSelectedCenturies] = useState<string[]>([]);

  useEffect(() => {
    setQuery(searchParams.get('query') || '');
    setSelectedCenturies(searchParams.getAll('centuries'));
  }, [searchParams]);

  const handleSexChange = (value: string) => {
    const params = new URLSearchParams(searchParams);

    if (value) {
      params.set('sex', value);
    } else {
      params.delete('sex');
    }

    setSearchParams(params);
  };

  const handleQueryChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value;

    setQuery(value);

    const params = new URLSearchParams(searchParams);

    if (value) {
      params.set('query', value);
    } else {
      params.delete('query');
    }

    setSearchParams(params);
  };

  const toggleCentury = (c: number) => {
    const params = new URLSearchParams(searchParams);
    const centuries = params.getAll('centuries');
    const cStr = c.toString();

    if (centuries.includes(cStr)) {
      const newCenturies = centuries.filter(item => item !== cStr);

      params.delete('centuries');
      newCenturies.forEach(val => params.append('centuries', val));
      setSelectedCenturies(newCenturies);
    } else {
      params.append('centuries', cStr);
      setSelectedCenturies([...centuries, cStr]);
    }

    setSearchParams(params);
  };

  const clearCentury = () => {
    const params = new URLSearchParams(searchParams);

    params.delete('centuries');
    setSearchParams(params);
    setSelectedCenturies([]);
  };

  const centuries = [16, 17, 18, 19, 20];

  return (
    <nav className="panel">
      <p className="panel-heading">Filters</p>

      <p className="panel-tabs" data-cy="SexFilter">
        <a
          className={sex === '' ? 'is-active' : ''}
          onClick={() => handleSexChange('')}
          href="#/people"
        >
          All
        </a>
        <a
          className={sex === 'm' ? 'is-active' : ''}
          onClick={() => handleSexChange('m')}
          href="#/people?sex=m"
        >
          Male
        </a>
        <a
          className={sex === 'f' ? 'is-active' : ''}
          onClick={() => handleSexChange('f')}
          href="#/people?sex=f"
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
            {centuries.map(c => (
              <button
                key={c}
                data-cy="century"
                className={`button mr-1 ${selectedCenturies.includes(c.toString()) ? 'is-info' : ''}`}
                onClick={() => toggleCentury(c)}
              >
                {c}
              </button>
            ))}
          </div>

          <div className="level-right ml-4">
            <button
              data-cy="centuryALL"
              className="button is-success is-outlined"
              onClick={clearCentury}
            >
              All
            </button>
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
