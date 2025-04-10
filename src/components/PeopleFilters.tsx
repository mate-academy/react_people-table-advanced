import { Link, useSearchParams } from 'react-router-dom';
import cn from 'classnames';
import { useEffect } from 'react';
import { Person } from '../types';
import { getSearchWith } from '../utils/searchHelper';

interface Props {
  people: Person[];
  setVisiblePeople: (arg: Person[]) => void;
}

enum FilterBySex {
  'All' = '',
  'Male' = 'm',
  'Female' = 'f',
}

const centuriesForLinks = [16, 17, 18, 19, 20];

function getFilteredPeople(
  peopleWithParents: Person[],
  filterSex: string,
  query: string,
  centuries: string[],
) {
  let filtered = [...peopleWithParents];

  if (filterSex) {
    filtered = filtered.filter(person => person.sex === filterSex);
  }

  if (query) {
    const lower = query.toLowerCase().trim();

    filtered = filtered.filter(
      person =>
        person.name.toLowerCase().includes(lower) ||
        person.motherName?.toLowerCase().includes(lower) ||
        person.fatherName?.toLowerCase().includes(lower),
    );
  }

  if (centuries.length) {
    filtered = filtered.filter(person => {
      const birthCentury = Math.ceil(person.born / 100).toString();

      return centuries.includes(birthCentury);
    });
  }

  return filtered;
}

export const PeopleFilters = ({ people, setVisiblePeople }: Props) => {
  const [searchParams, setSearchParams] = useSearchParams();

  const query = searchParams.get('query') || '';
  const filterSex = searchParams.get('sex') || '';
  const centuries = searchParams.getAll('centuries') || [];

  useEffect(() => {
    const filtered = getFilteredPeople(people, filterSex, query, centuries);

    setVisiblePeople(filtered);
  }, [people, searchParams.toString()]);

  const handleCenturyClick = (century: number) => {
    const param = new URLSearchParams(searchParams);

    const centuryStr = century.toString();
    const newCenturies = centuries.includes(centuryStr)
      ? centuries.filter(cent => cent !== centuryStr)
      : [...centuries, centuryStr];

    param.delete('centuries');
    newCenturies.forEach(cent => param.append('centuries', cent));

    setSearchParams(param);
  };

  const handleResetFilters = () => {
    setSearchParams({});
  };

  return (
    <nav className="panel">
      <p className="panel-heading">Filters</p>

      <p className="panel-tabs" data-cy="SexFilter">
        {Object.entries(FilterBySex).map(([key, value]) => (
          <Link
            key={key}
            className={cn({ 'is-active': filterSex === value })}
            to={{
              pathname: '/people',
              search: getSearchWith(searchParams, { sex: value || null }),
            }}
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
              setSearchParams(
                getSearchWith(searchParams, {
                  query: event.target.value || null,
                }),
              )
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
            {centuriesForLinks.map(century => (
              <Link
                key={century}
                data-cy="century"
                className={cn('button mr-1', {
                  'is-info': centuries.includes(century.toString()),
                })}
                to={{
                  pathname: '/people',
                  search: getSearchWith(searchParams, {
                    centuries: [...centuries, century.toString()],
                  }),
                }}
                onClick={() => handleCenturyClick(century)}
              >
                {century}
              </Link>
            ))}
          </div>

          <div className="level-right ml-4">
            <Link
              data-cy="centuryALL"
              className={cn('button is-success', {
                'is-outlined': centuries.length > 0,
              })}
              to="."
              onClick={() =>
                setSearchParams(
                  getSearchWith(searchParams, { centuries: null }),
                )
              }
            >
              All
            </Link>
          </div>
        </div>
      </div>

      <div className="panel-block">
        <Link
          className="button is-link is-outlined is-fullwidth"
          to="."
          onClick={handleResetFilters}
        >
          Reset all filters
        </Link>
      </div>
    </nav>
  );
};
