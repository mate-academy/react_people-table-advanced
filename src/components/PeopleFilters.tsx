// import { useSearchParams } from 'react-router-dom';

import { useSearchParams } from 'react-router-dom';
import { getSearchWith, SearchParams } from '../utils/searchHelper';

const FEMALE = 'f';
const MALE = 'm';

export const PeopleFilters = () => {
  const [searchParams, setSearchParams] = useSearchParams();

  const CENTURIES = [16, 17, 18, 19, 20];

  const sex = searchParams.get('sex') || '';
  const query = searchParams.get('query') || '';
  const century = searchParams.getAll('century') || [];

  const setSearchWith = (paramToUpdate: SearchParams) => {
    const newParams = getSearchWith(searchParams, paramToUpdate);

    setSearchParams(newParams);
  };

  const sexToggle = (
    currSex: string | null,
    event: React.MouseEvent<HTMLAnchorElement, MouseEvent>,
  ) => {
    event.preventDefault();
    setSearchWith({ sex: currSex });
  };

  const queryUpdate = (
    currQuery: string,
    event: React.ChangeEvent<HTMLInputElement>,
  ) => {
    event.preventDefault();
    setSearchWith({ query: currQuery || null });
  };

  const centuryToggle = (
    currCentury: string,
    event: React.MouseEvent<HTMLAnchorElement, MouseEvent>,
  ) => {
    event.preventDefault();

    const newCenturies = century.includes(currCentury)
      ? century.filter(item => item !== currCentury)
      : [...century, currCentury];

    setSearchWith({ century: newCenturies });
  };

  return (
    <nav className="panel">
      <p className="panel-heading">Filters</p>

      <p className="panel-tabs" data-cy="SexFilter">
        <a
          className={`${!sex && 'is-active'}`}
          href="#/people"
          onClick={e => sexToggle(null, e)}
        >
          All
        </a>
        <a
          className={`${sex === MALE && 'is-active'}`}
          href="#/people?sex=m"
          onClick={e => sexToggle(MALE, e)}
        >
          Male
        </a>
        <a
          className={`${sex === FEMALE && 'is-active'}`}
          href="#/people?sex=f"
          onClick={e => sexToggle(FEMALE, e)}
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
            onChange={e => queryUpdate(e.target.value, e)}
          />

          <span className="icon is-left">
            <i className="fas fa-search" aria-hidden="true" />
          </span>
        </p>
      </div>

      <div className="panel-block">
        <div className="level is-flex-grow-1 is-mobile" data-cy="CenturyFilter">
          <div className="level-left">
            {CENTURIES.map(item => {
              return (
                <a
                  key={item}
                  data-cy="century"
                  className={`button mr-1 ${century.includes(item.toString()) && 'is-info'}`}
                  href={`#/people?centuries=${item}`}
                  onClick={e => centuryToggle(item.toString(), e)}
                >
                  {item}
                </a>
              );
            })}
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
