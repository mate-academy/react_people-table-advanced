import cn from 'classnames';
import { useEffect } from 'react';
import { SearchLink } from './SearchLink';
import { Person } from '../types';

type Props = {
  centuries: string[];
  preparedPeople: Person[];
  setPreparedPeople: React.Dispatch<React.SetStateAction<Person[]>>;
  getpeople: Person[];
};

export const PeopleFilters: React.FC<Props> = ({
  centuries,
  preparedPeople,
  setPreparedPeople,
  getpeople,
}) => {
  const arrCenturies = [16, 17, 18, 19, 20];
  const handleCenturiesChange = (century: string) => {
    return centuries.includes(century)
      ? centuries.filter(c => c !== century)
      : [...centuries, century];
  };

  useEffect(() => {
    const filteredPeople = [...getpeople];
    let finishPeople = [...filteredPeople];

    centuries.forEach((century) => {
      const startYear = (+century - 1) * 100 + 1;
      const endYear = +century * 100;
      // console.log(startYear, endYear);

      finishPeople = finishPeople.filter((people) => {
        return (
          (people.born >= startYear && people.born <= endYear)
          || (people.died >= startYear && people.died <= endYear)
        );
      });
    });
    setPreparedPeople(finishPeople);
  }, [centuries, preparedPeople]);

  return (
    <nav className="panel">
      <p className="panel-heading">Filters</p>

      <p className="panel-tabs" data-cy="SexFilter">
        <a className="is-active" href="#/people">All</a>
        <a className="" href="#/people?sex=m">Male</a>
        <a className="" href="#/people?sex=f">Female</a>
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

            {arrCenturies.map((century) => (
              <SearchLink
                key={century}
                data-cy="century"
                className={cn('button mr-1', {
                  'is-info': centuries.includes(`${century}`),
                })}
                params={{ centuries: handleCenturiesChange(`${century}`) }}
              >
                {century}
              </SearchLink>
            ))}
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
        <a
          className="button is-link is-outlined is-fullwidth"
          href="#/people"
        >
          Reset all filters
        </a>
      </div>
    </nav>
  );
};
