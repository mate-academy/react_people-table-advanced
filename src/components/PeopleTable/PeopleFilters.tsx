import React from 'react';
import { useSearchParams } from 'react-router-dom';

export const PeopleFilters: React.FC = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const query = searchParams.get('query') || '';
  const sex = searchParams.get('sex');
  const centuries = searchParams.getAll('centuries');

  const handleQueryChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const newQuery = event.target.value.trim();
    const newParams = new URLSearchParams(searchParams);

    if (newQuery) {
      newParams.set('query', newQuery);
    } else {
      newParams.delete('query');
    }

    setSearchParams(newParams);
  };

  const handleSexChange = (event: React.MouseEvent<HTMLAnchorElement>) => {
    event.preventDefault();

    const newSex = event.currentTarget.dataset.sex;
    const newParams = new URLSearchParams(searchParams);

    if (newSex === 'm') {
      newParams.set('sex', newSex);
    } else if (newSex === 'f') {
      newParams.set('sex', newSex);
    } else if (newSex === 'all') {
      newParams.delete('sex');
    }

    setSearchParams(newParams);
  };

  const toggleCenturies = (num: string) => {
    const params = new URLSearchParams(searchParams);
    const current = params.getAll('centuries');

    const newCenturies = current.includes(num)
      ? current.filter(cent => cent !== num)
      : [...current, num];

    params.delete('centuries');

    newCenturies.forEach(century => params.append('centuries', century));
    setSearchParams(params);
  };

  const clearCenturies = () => {
    const params = new URLSearchParams(searchParams);

    params.delete('centuries');
    setSearchParams(params);
  };

  return (
    <nav className="panel">
      <p className="panel-heading">Filters</p>

      <p className="panel-tabs" data-cy="SexFilter">
        <a
          data-sex="all"
          className={!sex ? 'is-active' : ''}
          onClick={handleSexChange}
        >
          All
        </a>
        <a
          data-sex="m"
          className={sex === 'm' ? 'is-active' : ''}
          onClick={handleSexChange}
        >
          Male
        </a>
        <a
          data-sex="f"
          className={sex === 'f' ? 'is-active' : ''}
          onClick={handleSexChange}
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
            <button
              type="button"
              data-cy="century"
              className={`button mr-1 ${centuries.includes('16') ? 'is-info' : ''}`}
              onClick={() => toggleCenturies('16')}
            >
              16
            </button>

            <button
              type="button"
              data-cy="century"
              className={`button mr-1 ${centuries.includes('17') ? 'is-info' : ''}`}
              onClick={() => toggleCenturies('17')}
            >
              17
            </button>

            <button
              type="button"
              data-cy="century"
              className={`button mr-1 ${centuries.includes('18') ? 'is-info' : ''}`}
              onClick={() => toggleCenturies('18')}
            >
              18
            </button>

            <button
              type="button"
              data-cy="century"
              className={`button mr-1 ${centuries.includes('19') ? 'is-info' : ''}`}
              onClick={() => toggleCenturies('19')}
            >
              19
            </button>

            <button
              type="button"
              data-cy="century"
              className={`button mr-1 ${centuries.includes('20') ? 'is-info' : ''}`}
              onClick={() => toggleCenturies('20')}
            >
              20
            </button>
          </div>

          <div className="level-right ml-4">
            <button
              data-cy="centuryALL"
              className={`button is-outlined ${centuries.length === 0 ? ' is-success' : ''}`}
              onClick={clearCenturies}
            >
              All
            </button>
          </div>
        </div>
      </div>

      <div className="panel-block">
        <button
          type="button"
          className="button is-link is-outlined is-fullwidth"
          onClick={() => setSearchParams(new URLSearchParams())}
        >
          Reset all filters
        </button>
      </div>
    </nav>
  );
};
