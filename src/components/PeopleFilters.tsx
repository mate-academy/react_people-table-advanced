import { useSearchParams } from 'react-router-dom';
import { SearchLink } from './SearchLink';
import { SearchParams } from '../utils/searchHelper';
import classNames from 'classnames';
import { useContext, useEffect, useState } from 'react';
import { PeopleContext } from './PeopleProvider.tsx/PeopleProvider';

export const PeopleFilters = () => {
  const [searchParams] = useSearchParams();
  const [isActive, setIsActive] = useState('');
  const { setPeople, people } = useContext(PeopleContext);
  const sex = searchParams.get('sex');
  const copyByPeople = [...people];

  const sortBySex = () => {
    if (sex === null) {
      setPeople(copyByPeople);
    } else if (sex === 'f') {
      const filterByMen = copyByPeople.filter(item => item.sex === 'f');

      setPeople(filterByMen);
    } else if (sex === 'm') {
      const filterByMen = copyByPeople.filter(item => item.sex === 'm');

      setPeople(filterByMen);
    }
  };

  useEffect(() => {
    sortBySex();
  }, [sex]);

  const handleSex = (item: string): SearchParams => {
    switch (item) {
      case 'All':
        return { sex: null };
      case 'Male':
        return { sex: 'm' };
      case 'Female':
        return { sex: 'f' };
      default:
        return { sex: null };
    }
  };

  return (
    <nav className="panel">
      <p className="panel-heading">Filters</p>

      <p className="panel-tabs" data-cy="SexFilter">
        {['All', 'Male', 'Female'].map(item => (
          <SearchLink
            className={classNames({
              'is-active': (item === 'All' && !isActive) || isActive === item,
            })}
            params={handleSex(item)}
            key={item}
            onClick={() => setIsActive(item)}
          >
            {item}
          </SearchLink>
        ))}
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
