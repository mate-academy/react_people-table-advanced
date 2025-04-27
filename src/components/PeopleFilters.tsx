import { FC } from 'react';
import { NavLink, useSearchParams } from 'react-router-dom';

type Props = {
  filterChange: (params: any, searchParams: any) => void;
};

export const PeopleFilters: FC<Props> = ({ filterChange }) => {
  const [searchParams, setSearchParams] = useSearchParams();

  const query = searchParams.get('query') || '';
  const centuries = searchParams.getAll('centuries') || [];

  const hendleFilterChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const params = new URLSearchParams(searchParams);
    params.set('query', e.target.value);
    setSearchParams(params);
  };

  const handleSenturiesChange = (e: React.MouseEvent<HTMLAnchorElement>) => {
    console.log(e.target);
  };
  console.log('searchParams', searchParams.getAll('centuries'));
  console.log('centuries:', centuries);

  return (
    <nav className="panel">
      <p className="panel-heading">Filters</p>

      <p className="panel-tabs" data-cy="SexFilter">
        <NavLink
          className="is-active"
          to={{
            search: '',
          }}
        >
          All
        </NavLink>
        <NavLink
          className=""
          to={{
            // pathname: "people?sex=m",
            search: 'sex=m',
          }}
        >
          Male
        </NavLink>
        <NavLink
          className=""
          to={{
            // pathname: "people?sex=f",
            search: 'sex=f',
          }}
        >
          Female
        </NavLink>
      </p>

      <div className="panel-block">
        <p className="control has-icons-left">
          <input
            data-cy="NameFilter"
            type="search"
            className="input"
            placeholder="Search"
            value={query}
            onChange={hendleFilterChange}
          />

          <span className="icon is-left">
            <i className="fas fa-search" aria-hidden="true" />
          </span>
        </p>
      </div>

      <div className="panel-block">
        <div className="level is-flex-grow-1 is-mobile" data-cy="CenturyFilter">
          <div className="level-left">
            <NavLink
              data-cy="century"
              className="button mr-1"
              to="#/people?centuries=16"
              onClick={handleSenturiesChange}
            >
              16
            </NavLink>

            <NavLink
              data-cy="century"
              className="button mr-1 is-info"
              to="#/people?centuries=17"
            >
              17
            </NavLink>

            <NavLink
              data-cy="century"
              className="button mr-1 is-info"
              to="#/people?centuries=18"
            >
              18
            </NavLink>

            <NavLink
              data-cy="century"
              className="button mr-1 is-info"
              to="#/people?centuries=19"
            >
              19
            </NavLink>

            <NavLink
              data-cy="century"
              className="button mr-1"
              to="#/people?centuries=20"
            >
              20
            </NavLink>
          </div>

          <div className="level-right ml-4">
            <NavLink
              data-cy="centuryALL"
              className="button is-success is-outlined"
              to="#/people"
            >
              All
            </NavLink>
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
