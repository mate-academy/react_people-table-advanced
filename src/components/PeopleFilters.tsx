import classNames from 'classnames';
import { Link, useSearchParams } from 'react-router-dom';

export const PeopleFilters = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const query = searchParams.get('query') || '';

  const handleQueryChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const params = new URLSearchParams(searchParams);

    params.set('query', event.target.value);

    if (event.target.value === '') {
      params.delete('query');
    }

    setSearchParams(params);
  };

  const centClick = (numOfCent: string) => {
    const newSearchParams = new URLSearchParams(searchParams);
    const cents = newSearchParams.getAll('centuries');
    const newCents = cents.includes(numOfCent)
      ? cents.filter(cent => cent !== numOfCent)
      : [...cents, numOfCent];

    newSearchParams.delete('centuries');

    newCents.forEach(century => newSearchParams.append('centuries', century));

    return newSearchParams.toString();
  };

  const centAllClick = () => {
    const newSearchParams = new URLSearchParams(searchParams);
    const cents = newSearchParams.getAll('centuries');

    if (!cents) {
      return newSearchParams.toString();
    } else {
      newSearchParams.delete('centuries');

      return newSearchParams.toString();
    }
  };

  const activeCentButton = (curCent: string) => {
    const allCents = searchParams.getAll('centuries');

    return allCents.includes(curCent);
  };

  const resetAllFilters = () => {
    const newParams = new URLSearchParams(searchParams);

    newParams.delete('sex');
    newParams.delete('centuries');

    return newParams.toString();
  };

  return (
    <nav className="panel">
      <p className="panel-heading">Filters</p>

      <p className="panel-tabs" data-cy="SexFilter">
        <Link
          className={classNames({
            'is-active': !searchParams.get('sex'),
          })}
          to={`/people?${(() => {
            const newSearchParams = new URLSearchParams(searchParams);

            newSearchParams.delete('sex');

            return newSearchParams.toString();
          })()}`}
        >
          All
        </Link>
        <Link
          className={classNames({
            'is-active': searchParams.get('sex') === 'm',
          })}
          to={`/people?${(() => {
            const newSearchParams = new URLSearchParams(searchParams);

            newSearchParams.delete('sex');
            newSearchParams.append('sex', 'm');

            return newSearchParams.toString();
          })()}`}
        >
          Male
        </Link>
        <Link
          className={classNames({
            'is-active': searchParams.get('sex') === 'f',
          })}
          to={`/people?${(() => {
            const newSearchParams = new URLSearchParams(searchParams);

            newSearchParams.delete('sex');
            newSearchParams.append('sex', 'f');

            return newSearchParams.toString();
          })()}`}
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
            onChange={event => handleQueryChange(event)}
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
              className={classNames('button mr-1', {
                'is-info': activeCentButton('16'),
              })}
              to={`/people?${centClick('16')}`}
            >
              16
            </Link>

            <Link
              data-cy="century"
              className={classNames('button mr-1', {
                'is-info': activeCentButton('17'),
              })}
              to={`/people?${centClick('17')}`}
            >
              17
            </Link>

            <Link
              data-cy="century"
              className={classNames('button mr-1', {
                'is-info': activeCentButton('18'),
              })}
              to={`/people?${centClick('18')}`}
            >
              18
            </Link>

            <Link
              data-cy="century"
              className={classNames('button mr-1', {
                'is-info': activeCentButton('19'),
              })}
              to={`/people?${centClick('19')}`}
            >
              19
            </Link>

            <Link
              data-cy="century"
              className={classNames('button mr-1', {
                'is-info': activeCentButton('20'),
              })}
              to={`/people?${centClick('20')}`}
            >
              20
            </Link>
          </div>

          <div className="level-right ml-4">
            <Link
              data-cy="centuryALL"
              className={classNames('button is-success', {
                'is-outlined': searchParams.getAll('centuries').length > 0,
              })}
              to={`/people?${centAllClick()}`}
            >
              All
            </Link>
          </div>
        </div>
      </div>

      <div className="panel-block">
        <Link
          className="button is-link is-outlined is-fullwidth"
          to={`/people?${resetAllFilters()}`}
        >
          Reset all filters
        </Link>
      </div>
    </nav>
  );
};
