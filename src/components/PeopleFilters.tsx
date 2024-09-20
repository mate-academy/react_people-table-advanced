import { useSearchParams } from 'react-router-dom';
import { SexEnum } from '../types/enums';
import cn from 'classnames';

export const PeopleFilters = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const query = searchParams.get('query') || '';
  const centuries = searchParams.getAll('century') || [];

  function handleSexFiltering(
    event: React.MouseEvent<HTMLAnchorElement>,
    sex: string | null,
  ) {
    event.preventDefault();

    const params = new URLSearchParams(searchParams);

    if (sex) {
      params.set('sex', sex);
    } else {
      params.delete('sex');
    }
    setSearchParams(params);
  }

  function handleQueryChange(event: React.ChangeEvent<HTMLInputElement>) {
    const params = new URLSearchParams(searchParams);
    params.set('query', event.target.value);
    setSearchParams(params);
  }

  function handleCenturyFiltering(
    event: React.MouseEvent<HTMLAnchorElement>,
    c: string,
  ) {
    event.preventDefault();

    const params = new URLSearchParams(searchParams);
    const newCentury = centuries.includes(c)
      ? centuries.filter(century => century !== c)
      : [...centuries, c];

    params.delete('century');
    newCentury.forEach(century => params.append('century', century));

    setSearchParams(params);
  }

  function handleSelectAllCentury(event: React.MouseEvent<HTMLAnchorElement>) {
    event.preventDefault();

    const params = new URLSearchParams(searchParams);

    params.delete('century');
    allCenturies.forEach(century =>
      params.append('century', century.toString()),
    );

    setSearchParams(params);
  }

  const resetAll = (event: React.MouseEvent<HTMLAnchorElement>) => {
    event.preventDefault();

    const params = new URLSearchParams(searchParams);
    params.delete('sex');
    params.delete('query');
    params.delete('century');

    setSearchParams(params);
  };

  const allCenturies = [16, 17, 18, 19, 20];

  return (
    <nav className="panel">
      <p className="panel-heading">Filters</p>

      <p className="panel-tabs" data-cy="SexFilter">
        <a
          className="is-active"
          href="#/people"
          onClick={event => handleSexFiltering(event, null)}
        >
          All
        </a>
        <a
          className=""
          href="#/people?sex=m"
          onClick={e => handleSexFiltering(e, SexEnum.Male)}
        >
          Male
        </a>
        <a
          className=""
          href="#/people?sex=f"
          onClick={e => handleSexFiltering(e, SexEnum.Female)}
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
            {allCenturies.map(century => (
              <a
                key={century}
                data-cy="century"
                className={cn('button mr-1', {
                  'is-info': centuries.includes(century.toString()),
                })}
                href={`#/people?${century}`}
                onClick={e => handleCenturyFiltering(e, century.toString())}
              >
                {century}
              </a>
            ))}
          </div>

          <div className="level-right ml-4">
            <a
              data-cy="centuryALL"
              className="button is-success is-outlined"
              href="#/people"
              onClick={handleSelectAllCentury}
            >
              All
            </a>
          </div>
        </div>
      </div>

      <div className="panel-block">
        <a
          className="button is-link is-outlined is-fullwidth"
          href="#/people"
          onClick={resetAll}
        >
          Reset all filters
        </a>
      </div>
    </nav>
  );
};
