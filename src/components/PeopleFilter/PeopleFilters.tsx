import { useSearchParams } from 'react-router-dom';
import { Filter, Person } from '../../types';
import { SearchLink } from '../SearchLink';
import { Person as PersonType } from '../../types';
import classNames from 'classnames';
import React, { useEffect } from 'react';

const centuriesList = [16, 17, 18, 19, 20];

interface Props {
  originPeopleList: Person[];
  setPeople: (list: Person[]) => void;
  sortPeople: (
    list: Person[],
    sort: string | null,
    order: string | null,
  ) => PersonType[];
}

export const PeopleFilters: React.FC<Props> = ({
  originPeopleList,
  setPeople,
  sortPeople,
}) => {
  const [searchParams, setSearchParams] = useSearchParams();
  const centuries = searchParams.getAll('centuries') || [];
  const query = searchParams.get('query') || '';
  const sex = searchParams.get('sex') || '';
  const sortParam = searchParams.get('sort');
  const orderParam = searchParams.get('order');

  useEffect(() => {
    let filteredPeople = originPeopleList;

    if (query) {
      const lowerQuery = query.toLowerCase();

      filteredPeople = filteredPeople.filter(person => {
        const lowerName = person.name.toLowerCase();
        const lowerFather = person.fatherName
          ? person.fatherName.toLowerCase()
          : '';
        const lowerMother = person.motherName
          ? person.motherName.toLowerCase()
          : '';

        return (
          lowerName.includes(lowerQuery) ||
          lowerFather.includes(lowerQuery) ||
          lowerMother.includes(lowerQuery)
        );
      });
    }

    if (centuries.length) {
      filteredPeople = filteredPeople.filter(person =>
        centuries.includes(Math.ceil(person.born / 100).toString()),
      );
    }

    if (sex) {
      filteredPeople = filteredPeople.filter(person => person.sex === sex);
    }

    setPeople(sortPeople(filteredPeople, sortParam, orderParam));
  }, [query, centuries, sex, originPeopleList, setPeople]);

  const handleQueryChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const params = new URLSearchParams(searchParams);

    params.set('query', event.target.value);
    setSearchParams(params);
  };

  const toggleCentury = (century: number) => {
    const centuryStr = century.toString();
    const updatedCenturies = centuries.includes(centuryStr)
      ? centuries.filter(cent => cent !== centuryStr)
      : [...centuries, centuryStr];

    return updatedCenturies.length
      ? { centuries: updatedCenturies }
      : { centuries: null };
  };

  const sexFilter = (sexValue: string) => {
    return searchParams.get('sex') === sexValue ? 'is-active' : '';
  };

  const allSex = () => {
    return !searchParams.get('sex') ? 'is-active' : '';
  };

  return (
    <nav className="panel">
      <p className="panel-heading">Filters</p>

      <p className="panel-tabs" data-cy="SexFilter">
        <a className={allSex()} href="#/people">
          {Filter.All}
        </a>
        <a className={sexFilter('m')} href="#/people?sex=m">
          {Filter.Male}
        </a>
        <a className={sexFilter('f')} href="#/people?sex=f">
          {Filter.Female}
        </a>
      </p>

      <div className="panel-block">
        <p className="control has-icons-left">
          <input
            data-cy="NameFilter"
            type="search"
            className="input"
            placeholder="Search"
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
            {centuriesList.map(currentCentury => (
              <SearchLink
                key={currentCentury}
                className={classNames('button mr-1', {
                  'is-info': centuries.includes(currentCentury.toString()),
                })}
                params={toggleCentury(currentCentury)}
              >
                {currentCentury}
              </SearchLink>
            ))}
          </div>
          <div className="level-right ml-4">
            <SearchLink
              data-cy="centuryALL"
              className={classNames('button is-success', {
                'is-outlined': centuries.length > 0,
              })}
              params={{ centuries: null }}
            >
              All
            </SearchLink>
          </div>
        </div>
      </div>

      <div className="panel-block">
        <SearchLink
          className="button is-link is-outlined is-fullwidth"
          params={{ query: null, sex: null, centuries: null }}
        >
          Reset all filters
        </SearchLink>
      </div>
    </nav>
  );
};
