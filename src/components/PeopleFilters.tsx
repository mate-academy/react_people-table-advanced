import classNames from 'classnames';
import { Link, useSearchParams } from 'react-router-dom';
import { Filters } from '../types/Filtres';
import { centuries } from '../types/centuries';
import { getSearchWith } from '../utils/searchHelper';

export const PeopleFilters = () => {
  const filtres = [Filters.All, Filters.Male, Filters.Female];
  const [searchParams, setSearchParams] = useSearchParams();
  const selectedCenturies = searchParams.getAll('centuries');
  const centurie = searchParams.get('centuries');
  const handleQueryChange = (query: string) => {
    const newSearch = getSearchWith(searchParams, {
      query: query || null,
    });

    setSearchParams(newSearch);
  };

  const filter = searchParams.get('sex') || Filters.All;

  return (
    <nav className="panel">
      <p className="panel-heading">Filters</p>

      <p className="panel-tabs" data-cy="SexFilter">
        {filtres.map(filt => (
          <Link
            className={classNames({
              'is-active': filter === filt,
            })}
            to={`/people?${getSearchWith(searchParams, { sex: filt })}`}
            key={filt}
          >
            {filt}
          </Link>
        ))}
      </p>

      <div className="panel-block">
        <p className="control has-icons-left">
          <input
            data-cy="NameFilter"
            type="search"
            value={searchParams.get('query') || ''}
            className="input"
            placeholder="Search"
            onChange={event => handleQueryChange(event.target.value)}
          />

          <span className="icon is-left">
            <i className="fas fa-search" aria-hidden="true" />
          </span>
        </p>
      </div>

      <div className="panel-block">
        <div className="level is-flex-grow-1 is-mobile" data-cy="CenturyFilter">
          <div className="level-left">
            {centuries.map(cent => (
              <Link
                data-cy="century"
                className={classNames('button mr-1', {
                  'is-info': selectedCenturies.includes(cent.toString()),
                })}
                to={`/people?${getSearchWith(searchParams, {
                  centuries: selectedCenturies.includes(cent.toString())
                    ? selectedCenturies.filter(item => item !== cent.toString())
                    : [...selectedCenturies, cent.toString()],
                })}`}
                key={cent}
              >
                {cent}
              </Link>
            ))}
          </div>

          <div className="level-right ml-4">
            <Link
              data-cy="centuryALL"
              className={classNames('button', {
                'is-success': !centurie,
                'is-outlined': selectedCenturies.length > 0,
              })}
              to={`/people?${getSearchWith(searchParams, {
                centuries: null,
              })}`}
            >
              All
            </Link>
          </div>
        </div>
      </div>

      <div className="panel-block">
        <Link className="button is-link is-outlined is-fullwidth" to="/people">
          Reset all filters
        </Link>
      </div>
    </nav>
  );
};
