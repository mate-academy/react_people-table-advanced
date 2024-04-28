import cn from 'classnames';
import { Link, useSearchParams } from 'react-router-dom';

import { usePeopleState } from '../store/PeopleContext';
import { getExistingCenturies } from '../services/getExistingCenturies';

export const PeopleFilters = () => {
  const { people } = usePeopleState();

  const [searchParams, setSearchParams] = useSearchParams();
  const sex = searchParams.get('sex') || '';
  const q = searchParams.get('q') || '';
  const centuries = searchParams.getAll('centuries') || [];

  console.log(centuries);

  const handleQueryChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newSearchParams = new URLSearchParams(searchParams);
    const query = e.target.value;

    if (query) {
      newSearchParams.set('q', query);
    } else {
      newSearchParams.delete('q');
    }

    setSearchParams(newSearchParams);
  };

  const toggleCenturies = (century: number) => {
    const params = new URLSearchParams(searchParams);

    const newCenturies = centuries.includes(century.toString())
      ? centuries.filter((c) => c !== century.toString())
      : [...centuries, century];

    newCenturies.forEach((c) => params.append('centuries', c.toString()));


    setSearchParams(params);
  };

  return (
    <nav className="panel">
      <p className="panel-heading">Filters</p>

      <p className="panel-tabs" data-cy="SexFilter">
        <Link
          className={!searchParams.toString() ? 'is-active' : ''}
          to="/people"
        >
          All
        </Link>

        <Link className={sex === 'm' ? 'is-active' : ''} to="/people?sex=m">
          Male
        </Link>

        <Link className={sex === 'f' ? 'is-active' : ''} to="/people?sex=f">
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
            value={q}
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
            {getExistingCenturies(people).map((century: number) => (
              <Link
                key={century}
                data-cy="century"
                className={cn("button", "mr-1", {
                  "is-info": centuries.includes(century.toString()),})}
                to={`/people?centuries=${century}`}
                onClick={() => toggleCenturies(century)}
              >
                {century}
              </Link>
            ))}
          </div>

          <div className="level-right ml-4">
            <Link
              data-cy="centuryALL"
              className="button is-success is-outlined"
              to="/people"
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
