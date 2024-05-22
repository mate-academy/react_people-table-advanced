import React from 'react';
import { useSearchParams } from 'react-router-dom';

export const PeopleFilters = () => {
  const [searchParams, setSearchParams] = useSearchParams();

  const sex = searchParams.get('sex') || '';
  const query = searchParams.get('query') || '';
  const century = searchParams.getAll('century') || [];

  const getActiveClass = (filt: string) => (sex === filt ? 'is-active' : '');
  const filtCentury = ['16', '17', '18', '19', '20'];

  // set region
  const handleSex = (gend: string) => {
    const params = new URLSearchParams(searchParams);

    params.set('sex', gend);
    setSearchParams(params);
  };

  const handleQuery = (event: React.ChangeEvent<HTMLInputElement>) => {
    const params = new URLSearchParams(searchParams);

    params.set('query', event.target.value);
    setSearchParams(params);
  };

  const handleCentury = (cent: string) => {
    const params = new URLSearchParams(searchParams);

    const newCent = century.includes(cent)
      ? century.filter(num => num !== cent)
      : [...century, cent];

    params.delete('century');
    newCent.forEach(num => params.append('century', num));
    setSearchParams(params);
  };

  // reset region
  const handleReset = () => {
    const params = new URLSearchParams(searchParams);

    params.delete('query');
    params.delete('century');
    params.delete('sex');
    setSearchParams(params);
  };

  const handleResetCentury = () => {
    const params = new URLSearchParams(searchParams);

    params.delete('century');
    setSearchParams(params);
  };

  const handleResetSex = () => {
    const params = new URLSearchParams(searchParams);

    params.delete('sex');
    setSearchParams(params);
  };

  return (
    <nav className="panel">
      <p className="panel-heading">Filters</p>

      <p className="panel-tabs" data-cy="SexFilter">
        <a
          onClick={() => handleResetSex()}
          className={getActiveClass('')}
          // href="#/people"
        >
          All
        </a>
        <a
          onClick={() => handleSex('m')}
          className={getActiveClass('m')}
          // href="#/people?sex=m"
        >
          Male
        </a>
        <a
          onClick={() => handleSex('f')}
          className={getActiveClass('f')}
          // href="#/people?sex=f"
        >
          Female
        </a>
      </p>

      <div className="panel-block">
        <p className="control has-icons-left">
          <input
            value={query}
            onChange={handleQuery}
            data-cy="NameFilter"
            type="search"
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
            {filtCentury.map(cent => (
              <a
                key={cent}
                onClick={() => handleCentury(cent)}
                data-cy="century"
                className={`button mr-1 ${century.includes(cent) ? 'is-info' : ''}`}
                // href="#/people?centuries=16"
              >
                {cent}
              </a>
            ))}
          </div>

          <div className="level-right ml-4">
            <a
              data-cy="centuryALL"
              className={`button is-success ${!!century.length && 'is-outlined'}`}
              // href="#/people"
              onClick={() => handleResetCentury()}
            >
              All
            </a>
          </div>
        </div>
      </div>

      <div className="panel-block">
        <a
          onClick={() => handleReset()}
          className="button is-link is-outlined is-fullwidth"
          // href="#/people"
        >
          Reset all filters
        </a>
      </div>
    </nav>
  );
};
