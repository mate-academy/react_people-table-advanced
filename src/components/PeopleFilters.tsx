/* eslint-disable prettier/prettier */
import classNames from 'classnames';
import { Link, useSearchParams } from 'react-router-dom';
import { Status } from '../types/Status';
import { getSearchWith } from '../utils/searchHelper';

export const PeopleFilters = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const centuries = searchParams.getAll('centuries') || [];
  const query = searchParams.get('query') || '';
  const sex = searchParams.get('sex') || '';

  const setSearchWith = (params: any) => {
    const search = getSearchWith(searchParams, params);

    setSearchParams(search);
  };

  function handleCenturies(num: string ) {
    const newcenturies = centuries.includes(num)
      ? centuries.filter(el => el !== num)
      : [...centuries, num];

    return newcenturies;
  }

  const handleQueryChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchWith({query: event.target.value || null});
    
    
  };

  return (
    <nav className="panel">
      <p className="panel-heading">Filters</p>

      <p className="panel-tabs" data-cy="SexFilter">
        <Link
          className={classNames('', {'is-active' : sex === Status.All })}
  
          to={{search: getSearchWith(searchParams,{sex: Status.All})}}
        >
          All
        </Link>
        <Link
          to={{search: getSearchWith(searchParams,{sex: Status.Male })}}
          className={classNames('', {'is-active' : sex === Status.Male })}
        >
          Male
        </Link>
        <Link
          to={{search: getSearchWith(searchParams,{sex: Status.Female })}}
          className={classNames('', {'is-active' : sex === Status.Female })}
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
            onChange={handleQueryChange}
          />

          <span className="icon is-left">
            <i className="fas fa-search" aria-hidden="true" />
          </span>
        </p>
      </div>

      <div className="panel-block">
        <div className="level is-flex-grow-1 is-mobile" data-cy="CenturyFilter">
          {['16', '17', '18', '19', '20'].map(num => (
            <div className="level-left" key={num}>
              <Link
                data-cy="century"
                className={classNames('button mr-1', {
                  'is-info': centuries.includes(num),
                })}
                to={{
                  search: getSearchWith(searchParams ,
                    { centuries: handleCenturies(num)})
                } 
                }
              >
                {num}
              </Link>
            </div>
          ))}

          <div className="level-right ml-4">
            <Link
              data-cy="centuryALL"
              className="button is-success is-outlined"
              to="#/people"
            >
              All
            </Link>
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
