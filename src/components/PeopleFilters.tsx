import { SearchLink } from './SearchLink';
import {  useSearchParams } from 'react-router-dom';
import { getSearchWith } from '../utils/searchHelper';

export const PeopleFilters = () => {


  const [searchParams, setSearchParams] = useSearchParams();

  const centuries = searchParams.getAll('centuries') || []



  return (
    <nav className="panel">
      <p className="panel-heading">Filters</p>

      <p className="panel-tabs" data-cy="SexFilter">

        <SearchLink
          params={{ sex: null }}
          className="is-active"
        >
          All
        </SearchLink>

        <SearchLink
          params={{ sex: 'm' }}
          className=""
        >
          Male
        </SearchLink>


        <SearchLink
          params={{ sex: 'f' }}
          className=""
        >
          Female
        </SearchLink>

      </p>

      <div className="panel-block">
        <p className="control has-icons-left">
          <input
            type="search"
            placeholder="Search"
            className="input"
            data-cy="NameFilter"
            onChange={(event) => {
              const value = event.target.value;
              const search = getSearchWith(searchParams, { query: value})
              setSearchParams(search);
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
            {/*<a*/}
            {/*  data-cy="century"*/}
            {/*  className="button mr-1"*/}
            {/*  href="#/people?centuries=16"*/}
            {/*>*/}
            {/*  16*/}
            {/*</a>*/}


            {
              ['16', '17', '18' , '19' , '20'].map(century => (
                <SearchLink
                  params={{ centuries: centuries.includes(century)
                    ? centuries.filter(c => century !== c)
                    : [...centuries, century]}}
                  data-cy="century"
                  className="button mr-1"
                >{century}
                </SearchLink>
              ))
            }



          {/*  */}
          {/*  */}
          {/*  <SearchLink*/}
          {/*    */}
          {/*    */}
          {/*    params={{ centuries: centuries.includes('16')*/}
          {/*          ? centuries.filter(c => '16' !== c)*/}
          {/*          : [...centuries, '16']}}*/}
          {/*    data-cy="century"*/}
          {/*    className="button mr-1"*/}
          {/*  >*/}

          {/*    16*/}
          {/*  </SearchLink>*/}


          {/*  <SearchLink*/}
          {/*    params={{ centuries: '17' }}*/}
          {/*    data-cy="century"*/}
          {/*    className="button mr-1"*/}
          {/*  >*/}
          {/*    17*/}
          {/*  </SearchLink>*/}

          {/*  <SearchLink*/}
          {/*    params={{ centuries: '18' }}*/}
          {/*    data-cy="century"*/}
          {/*    className="button mr-1"*/}
          {/*  >*/}
          {/*    18*/}
          {/*  </SearchLink>*/}

          {/*  <SearchLink*/}
          {/*    params={{ centuries: '19' }}*/}
          {/*    data-cy="century"*/}
          {/*    className="button mr-1"*/}
          {/*  >*/}
          {/*    19*/}
          {/*  </SearchLink>*/}

          {/*  <SearchLink*/}
          {/*    params={{ centuries: '20' }}*/}
          {/*    data-cy="century"*/}
          {/*    className="button mr-1"*/}
          {/*  >*/}
          {/*    20*/}
          {/*  </SearchLink>*/}
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
