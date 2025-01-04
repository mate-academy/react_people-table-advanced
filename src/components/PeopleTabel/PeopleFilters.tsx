import * as filterTypes from '../../types/filterTypes';
import { Link, useSearchParams } from 'react-router-dom';
import { getSearchWith, SearchParams } from '../../utils/searchHelper';
import classNames from 'classnames';

export const PeopleFilters: React.FC = () => {
  const [searchParams, setSearchParams] = useSearchParams();

  const sex = searchParams.get('sex') || '';
  const query = searchParams.get('query') || '';
  const centuries = searchParams.getAll('centuries') || [];

  const updateSearchParams = (updatedParams: SearchParams) => {
    const newParams = getSearchWith(searchParams, updatedParams);

    setSearchParams(newParams);
  };

  const updateSex = (
    updatedSex: filterTypes.Sex,
    event: React.MouseEvent<HTMLAnchorElement, MouseEvent>,
  ) => {
    event.preventDefault();

    updateSearchParams({ sex: updatedSex });
  };

  const updateCenturies = (
    century: string,
    event: React.MouseEvent<HTMLAnchorElement, MouseEvent>,
  ) => {
    event.preventDefault();

    const newCenturies = centuries.includes(century)
      ? centuries.filter(c => c !== century)
      : [...centuries, century];

    updateSearchParams({ centuries: newCenturies });
  };

  const handleAllCenturies = (
    event: React.MouseEvent<HTMLAnchorElement, MouseEvent>,
  ) => {
    event.preventDefault();
    updateSearchParams({ centuries: [] });
  };

  const handleReset = (
    event: React.MouseEvent<HTMLAnchorElement, MouseEvent>,
  ) => {
    event.preventDefault();
    updateSearchParams({ sex: '', query: '', centuries: [] });
  };

  return (
    <nav className="panel">
      <p className="panel-heading">Filters</p>

      <p className="panel-tabs" data-cy="SexFilter">
        {Object.keys(filterTypes.Sex).map(key => (
          <Link
            className={classNames({
              'is-active':
                sex === filterTypes.Sex[key as keyof typeof filterTypes.Sex],
            })}
            to={
              filterTypes.Sex[key as keyof typeof filterTypes.Sex]
                ? `#/people?sex=${filterTypes.Sex[key as keyof typeof filterTypes.Sex]}`
                : `#/people`
            }
            key={key}
            onClick={event =>
              updateSex(
                filterTypes.Sex[key as keyof typeof filterTypes.Sex],
                event,
              )
            }
          >
            {key}
          </Link>
        ))}
      </p>

      <div className="panel-block">
        <p className="control has-icons-left">
          <input
            data-cy="NameFilter"
            type="search"
            className="input"
            placeholder="Search"
            value={query}
            onChange={event =>
              updateSearchParams({ query: event.target.value })
            }
          />

          <span className="icon is-left">
            <i className="fas fa-search" aria-hidden="true" />
          </span>
        </p>
      </div>

      <div className="panel-block">
        <div className="level is-flex-grow-1 is-mobile" data-cy="CenturyFilter">
          <div className="level-left">
            {filterTypes.CENTURIES.map(century => (
              <Link
                data-cy="century"
                className={classNames('button', 'mr-1', {
                  'is-info': centuries.includes(century.toString()),
                })}
                to={`#/people?centuries=${century}`}
                key={century}
                onClick={event => updateCenturies(century.toString(), event)}
              >
                {century}
              </Link>
            ))}
          </div>

          <div className="level-right ml-4">
            <Link
              data-cy="centuryALL"
              className={classNames('button', 'is-success', {
                'is-outlined': !!centuries.length,
              })}
              to="#/people"
              onClick={event => handleAllCenturies(event)}
            >
              All
            </Link>
          </div>
        </div>
      </div>

      <div className="panel-block">
        <Link
          className="button is-link is-outlined is-fullwidth"
          to="#/people"
          onClick={event => handleReset(event)}
        >
          Reset all filters
        </Link>
      </div>
    </nav>
  );
};
