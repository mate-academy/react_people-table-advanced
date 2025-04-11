import React, { useState } from 'react';
import { Link, useSearchParams } from 'react-router-dom';

export const PeopleFilters = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [name, setName] = useState(searchParams.get('name') || '');

  const currentSex = searchParams.get('sex');
  const selectedCenturies = searchParams.getAll('centuries');

  const handleSexChange = (sex: string | null) => {
    const newParams = new URLSearchParams(searchParams);

    if (sex) {
      newParams.set('sex', sex);
    } else {
      newParams.delete('sex');
    }

    setSearchParams(newParams);
  };

  const toggleCentury = (century: string) => {
    const newParams = new URLSearchParams(searchParams);
    const current = searchParams.getAll('centuries');

    if (current.includes(century)) {
      const update = current.filter(c => c !== century);

      newParams.delete('centuries');
      update.forEach(c => newParams.append('centuries', c));
    } else {
      newParams.append('centuries', century);
    }

    setSearchParams(newParams);
  };

  const resetCenturies = () => {
    const newParams = new URLSearchParams(searchParams);

    newParams.delete('centuries');

    setSearchParams(newParams);
  };

  const handleNameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const newName = event.target.value;

    setName(newName);

    const newParams = new URLSearchParams(searchParams);

    if (newName) {
      newParams.set('name', newName);
    } else {
      newParams.delete('name');
    }

    setSearchParams(newParams);
  };

  return (
    <nav className="panel">
      <p className="panel-heading">Filters</p>

      <p className="panel-tabs" data-cy="SexFilter">
        <a
          className={currentSex === null ? 'is-active' : ''}
          onClick={() => handleSexChange(null)}
        >
          All
        </a>
        <a
          className={currentSex === 'm' ? 'is-active' : ''}
          onClick={() => handleSexChange('m')}
        >
          Male
        </a>
        <a
          className={currentSex === 'f' ? 'is-active' : ''}
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
            value={name}
            onChange={handleNameChange}
          />

          <span className="icon is-left">
            <i className="fas fa-search" aria-hidden="true" />
          </span>
        </p>
      </div>

      <div className="panel-block">
        <div className="level is-flex-grow-1 is-mobile" data-cy="CenturyFilter">
          <div className="level-left">
            {[16, 17, 18, 19, 20].map(century => (
              <Link
                key={century}
                data-cy="century"
                className={`button mr-1 ${selectedCenturies.includes(century.toString()) ? 'is-info' : ''}`}
                onClick={() => toggleCentury(century.toString())}
                to={`?centuries=${century}`}
              >
                {century}
              </Link>
            ))}
          </div>

          <div className="level-right ml-4">
            <Link
              data-cy="centuryALL"
              className="button is-success is-outlined"
              to="?centuries="
              onClick={resetCenturies}
            >
              All
            </Link>
          </div>
        </div>
      </div>

      <div className="panel-block">
        <a
          className="button is-link is-outlined is-fullwidth"
          onClick={() => setSearchParams({})}
        >
          Reset all filters
        </a>
      </div>
    </nav>
  );
};
