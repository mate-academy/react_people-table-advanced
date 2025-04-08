import classNames from 'classnames';
import { Link, useSearchParams } from 'react-router-dom';

export const PeopleFilters = () => {
  const [searchParams, setSearchParams] = useSearchParams();

  const century = searchParams.getAll('centuries');
  const sex = searchParams.get('sex');
  const query = searchParams.get('query');

  

  function toggleCentury(data: string) {
    const params = new URLSearchParams(searchParams);

    if (century.length === 0) {
      params.append('centuries', data);
      setSearchParams(params);

      return;
    }

    const newCentury = century.includes(data)
      ? century.filter(year => year !== data)
      : [...century, data];

    params.delete('centuries');

    newCentury.forEach(year => params.append('centuries', year));

    setSearchParams(params);
  }

  type Sex = 'm' | 'f' | null;

  function toggleSex(personSex: Sex) {
    const params = new URLSearchParams(searchParams);

    switch (personSex) {
      case 'f':
        params.set('sex', 'f');
        break;
      case 'm':
        params.set('sex', 'm');
        break;
      default:
        params.delete('sex');
        break;
    }

    setSearchParams(params);
  }

  return (
    <nav className="panel">
      <p className="panel-heading">Filters</p>
      {/* <p className="panel-heading">{params.toString()}</p> */}

      <p className="panel-tabs" data-cy="SexFilter">
        {/* <Link className="is-active" to="#/people"> */}
        <Link
          // className="is-active"
          className={classNames({
            'is-active': sex !== 'm' && sex !== 'f',
          })}
          to=""
          onClick={event => {
            event.preventDefault();

            toggleSex(null);
          }}
        >
          All
        </Link>
        {/* <Link className="" to="#/people?sex=m"> */}
        <Link
          className={classNames({
            'is-active': sex === 'm',
          })}
          to=""
          onClick={event => {
            event.preventDefault();

            toggleSex('m');
          }}
        >
          Male
        </Link>
        <Link
          className={classNames({
            'is-active': sex === 'f',
          })}
          to=""
          onClick={event => {
            event.preventDefault();

            toggleSex('f');
          }}
        >
          Female
        </Link>
      </p>

      <div className="panel-block">
        <p className="control has-icons-left">
          <input
            data-cy="NameFilter"
            type="search"
            className="input"
            placeholder="Search"
            value={query}
            onChange={event => {
              const params = new URLSearchParams(searchParams);

              params.set('query', event.target.value);

              setSearchParams(params);
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
            <Link
              data-cy="century"
              className={classNames('button', 'mr-1', {
                'is-info': century.includes('16'),
              })}
              to=""
              onClick={event => {
                event.preventDefault();
                toggleCentury('16');
              }}
            >
              16
            </Link>

            <Link
              data-cy="century"
              className={classNames('button', 'mr-1', {
                'is-info': century.includes('17'),
              })}
              to=""
              onClick={event => {
                event.preventDefault();
                toggleCentury('17');
              }}
            >
              17
            </Link>

            <Link
              data-cy="century"
              className={classNames('button', 'mr-1', {
                'is-info': century.includes('18'),
              })}
              to=""
              onClick={event => {
                event.preventDefault();
                toggleCentury('18');
              }}
            >
              18
            </Link>

            <Link
              data-cy="century"
              className={classNames('button', 'mr-1', {
                'is-info': century.includes('19'),
              })}
              to=""
              onClick={event => {
                event.preventDefault();
                toggleCentury('19');
              }}
            >
              19
            </Link>

            <Link
              data-cy="century"
              className={classNames('button', 'mr-1', {
                'is-info': century.includes('20'),
              })}
              to=""
              onClick={event => {
                event.preventDefault();
                toggleCentury('20');
              }}
            >
              20
            </Link>
          </div>

          <div className="level-right ml-4">
            <Link
              data-cy="centuryALL"
              // className="button is-success is-outlined"
              className={classNames('button', 'is-success', {
                'is-outlined': century.length !== 0,
              })}
              to=""
              onClick={event => {
                event.preventDefault();
                const params = new URLSearchParams(searchParams);

                params.delete('centuries');
                setSearchParams(params);
              }}
            >
              All
            </Link>
          </div>
        </div>
      </div>

      <div className="panel-block">
        <Link
          className="button is-link is-outlined is-fullwidth"
          to="/people"
          onClick={() => {
            searchParams.set('query', '');
          }}
        >
          Reset all filters
        </Link>
      </div>
    </nav>
  );
};
