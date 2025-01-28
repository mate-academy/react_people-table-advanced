/* eslint-disable jsx-a11y/control-has-associated-label */
import classNames from 'classnames';
import { Link, useSearchParams } from 'react-router-dom';

export const PeopleFilters = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const query = searchParams.get('query') || '';
  const sexParams = searchParams.get('sex') || '';
  const centuries = searchParams.getAll('centuries') || [];

  function sortByQuery(e: React.ChangeEvent<HTMLInputElement>) {
    const params = new URLSearchParams(searchParams);
    const value = e.target.value.trim();

    if (value) {
      params.set('query', value);
    } else {
      params.delete('query');
    }

    setSearchParams(params);
  }

  function toogleCenturies(number: string) {
    const params = new URLSearchParams(searchParams);
    const newCenturies = centuries.includes(number)
      ? centuries.filter(century => century !== number)
      : [...centuries, number];

    params.delete('centuries');
    newCenturies.forEach(century => params.append('centuries', century));

    return `?${params.toString()}`;
  }

  return (
    <nav className="panel">
      <p className="panel-heading">Filters</p>

      <p className="panel-tabs" data-cy="SexFilter">
        <a className={sexParams === '' ? 'is-active' : ''} href="#/people">
          All
        </a>
        <a
          className={sexParams === 'm' ? 'is-active' : ''}
          href="#/people?sex=m"
        >
          Male
        </a>
        <a
          className={sexParams === 'f' ? 'is-active' : ''}
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
            onChange={sortByQuery}
          />

          <span className="icon is-left">
            <i className="fas fa-search" aria-hidden="true" />
          </span>
        </p>
      </div>

      <div className="panel-block">
        <div className="level is-flex-grow-1 is-mobile" data-cy="CenturyFilter">
          <div className="level-left">
            {[16, 17, 18, 19, 20].map(btn => (
              <Link
                key={btn}
                onClick={() => toogleCenturies(btn.toString())}
                data-cy="century"
                className={classNames('button mr-1', {
                  'is-info': centuries.includes(btn.toString()),
                })}
                to={toogleCenturies(btn.toString())}
              >
                {btn}
              </Link>
            ))}
          </div>

          <div className="level-right ml-4">
            <a
              data-cy="centuryALL"
              className={classNames('button is-success', {
                'is-outlined': centuries.length !== 0,
              })}
              href="#/people"
            >
              All
            </a>
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
