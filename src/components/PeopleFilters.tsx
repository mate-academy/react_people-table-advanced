import { FC } from 'react';
import { NavLink, useSearchParams } from 'react-router-dom';

type Props = {
  filterChange: (params: any, searchParams: any) => void;
};

export const PeopleFilters: FC<Props> = ({ filterChange }) => {
  const [searchParams, setSearchParams] = useSearchParams();
  const newParams = new URLSearchParams(searchParams.toString());
  console.log('searchParams-sex', newParams.get('sex'));
  console.log('searchParams-search', newParams.get(''));
  const search = '';

  // const handleInputSearch=(e)=>{
  //   setSearchParams('seacrh', e.target.value);
  // }

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
          />

          <span className="icon is-left">
            <i className="fas fa-search" aria-hidden="true" />
          </span>
        </p>
      </div>

      <div className="panel-block">
        <div className="level is-flex-grow-1 is-mobile" data-cy="CenturyFilter">
          <div className="level-left">
            <a
              data-cy="century"
              className="button mr-1"
              href="#/people?centuries=16"
            >
              16
            </a>

            <a
              data-cy="century"
              className="button mr-1 is-info"
              href="#/people?centuries=17"
            >
              17
            </a>

            <a
              data-cy="century"
              className="button mr-1 is-info"
              href="#/people?centuries=18"
            >
              18
            </a>

            <a
              data-cy="century"
              className="button mr-1 is-info"
              href="#/people?centuries=19"
            >
              19
            </a>

            <a
              data-cy="century"
              className="button mr-1"
              href="#/people?centuries=20"
            >
              20
            </a>
          </div>

          <div className="level-right ml-4">
            <a
              data-cy="centuryALL"
              className="button is-success is-outlined"
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
