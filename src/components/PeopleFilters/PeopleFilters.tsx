import classNames from 'classnames';
import { NavLink, useSearchParams } from 'react-router-dom';

export const PeopleFilters = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const query = searchParams.get('query') || '';
  const sex = searchParams.get('sex') || '';
  const centuries = searchParams.getAll('centuries') || [];

  const centuriesContaine = ['16', '17', '18', '19', '20'];

  const handleSexChange = (
    event: React.MouseEvent<HTMLAnchorElement>,
    newSex: string | null,
  ) => {
    event.preventDefault();
    const params = new URLSearchParams(searchParams);

    if (newSex) {
      params.set('sex', newSex);
    } else {
      params.delete('sex');
    }

    setSearchParams(params);
  };

  const handleQueryChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const params = new URLSearchParams(searchParams);

    params.set('query', event.target.value);
    setSearchParams(params);
  };

  const handleCenturyChange = (
    event: React.MouseEvent<HTMLAnchorElement, MouseEvent>,
    century: string,
  ) => {
    event.preventDefault();
    const newCentury = centuries.includes(century)
      ? centuries.filter(currentCentury => currentCentury !== century)
      : [...centuries, century];

    setSearchParams({ centuries: newCentury });
  };

  const clearCentury = () => {
    const params = new URLSearchParams(searchParams);

    params.delete('centuries');
    setSearchParams(params);
  };

  return (
    <nav className="panel">
      <p className="panel-heading">Filters</p>

      <p className="panel-tabs" data-cy="SexFilter">
        <a
          className={classNames({
            'is-active': sex === '',
          })}
          href="#/people"
          onClick={e => handleSexChange(e, null)}
        >
          All
        </a>
        <a
          className={classNames({
            'is-active': sex === 'm',
          })}
          href="#/people?sex=m"
          onClick={e => handleSexChange(e, 'm')}
        >
          Male
        </a>
        <a
          className={classNames({
            'is-active': sex === 'f',
          })}
          href="#/people?sex=f"
          onClick={e => handleSexChange(e, 'f')}
        >
          Female
        </a>
      </p>

      <div className="panel-block">
        <p className="control has-icons-left">
          <input
            value={query}
            data-cy="NameFilter"
            type="search"
            className="input"
            placeholder="Search"
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
            {centuriesContaine.map(item => (
              <NavLink
                key={item}
                to={`#`}
                className={classNames('button', 'mr-1', {
                  'is-info': centuries.includes(item),
                })}
                data-year={item}
                onClick={e => handleCenturyChange(e, item)}
              >
                {item}
              </NavLink>
            ))}
          </div>

          <div className="level-right ml-4">
            <a
              data-cy="centuryALL"
              className="button is-success is-outlined"
              href="#/people"
              onClick={clearCentury}
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
