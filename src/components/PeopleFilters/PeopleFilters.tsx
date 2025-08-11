import { useSearchParams } from 'react-router-dom';
import cn from 'classnames';

export const PeopleFilters = () => {
  const centuriesList = ['16', '17', '18', '19', '20'];
  const [searchParams, setSearchParams] = useSearchParams();

  const query = searchParams.get('query') || '';
  const centuries = searchParams.getAll('centuries') || [];
  const sex = searchParams.get('sex') || '';

  const handleQuery = (event: React.ChangeEvent<HTMLInputElement>) => {
    const params = new URLSearchParams(searchParams);

    params.set('query', event.target.value);
    setSearchParams(params);
  };

  const toggleCentury = (
    century: string,
    event: React.MouseEvent<HTMLAnchorElement, MouseEvent>,
  ) => {
    event.preventDefault();

    const params = new URLSearchParams(searchParams);
    const currentCenturies = params.getAll('centuries');

    if (currentCenturies.includes(century)) {
      const newCenturies = currentCenturies.filter(
        currCentury => currCentury !== century,
      );

      params.delete('centuries');
      newCenturies.forEach(currCentury =>
        params.append('centuries', currCentury),
      );
    } else {
      params.append('centuries', century);
    }

    setSearchParams(params);
  };

  const toggleAllCenturies = (
    event: React.MouseEvent<HTMLAnchorElement, MouseEvent>,
  ) => {
    event.preventDefault();
    const params = new URLSearchParams(searchParams);

    params.delete('centuries');
    setSearchParams(params);
  };

  const toggleGender = (
    gender: 'all' | 'm' | 'f',
    event: React.MouseEvent<HTMLAnchorElement, MouseEvent>,
  ) => {
    event.preventDefault();
    const params = new URLSearchParams(searchParams);

    if (gender === 'all') {
      params.delete('sex');
    } else {
      params.set('sex', gender);
    }

    setSearchParams(params);
  };

  return (
    <nav className="panel">
      <p className="panel-heading">Filters</p>

      <p className="panel-tabs" data-cy="SexFilter">
        <a
          className={cn({ 'is-active': !sex })}
          href="/people"
          onClick={event => toggleGender('all', event)}
        >
          All
        </a>
        <a
          className={cn({ 'is-active': sex === 'm' })}
          href="/people?sex=m"
          onClick={event => toggleGender('m', event)}
        >
          Male
        </a>
        <a
          className={cn({ 'is-active': sex === 'f' })}
          href="/people?sex=f"
          onClick={event => toggleGender('f', event)}
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
            onChange={event => {
              handleQuery(event);
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
            {centuriesList.map(century => (
              <a
                data-cy="century"
                className={cn('button mr-1', {
                  'is-info': centuries.includes(century.toString()),
                })}
                key={century}
                href={`/people?centuries=${century}`}
                onClick={event => toggleCentury(century.toString(), event)}
              >
                {century}
              </a>
            ))}
          </div>

          <div className="level-right ml-4">
            <a
              data-cy="centuryALL"
              className={cn('button is-success', {
                'is-outlined': centuries.length,
              })}
              href="#/people"
              onClick={toggleAllCenturies}
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
