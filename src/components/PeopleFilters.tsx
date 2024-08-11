import { FC, useEffect, useMemo } from 'react';
import { useSearchParams } from 'react-router-dom';
import { Person } from '../types';
import { SearchLink } from './SearchLink';
import cn from 'classnames';

const centuriesList = [16, 17, 18, 19, 20];

interface Props {
  setPeopleFilter: React.Dispatch<React.SetStateAction<Person[]>>;
  people: Person[];
}

export const PeopleFilters: FC<Props> = ({ setPeopleFilter, people }) => {
  const [searchParams, setSearchParams] = useSearchParams();
  const query = searchParams.get('query') || '';
  const centuries = useMemo(
    () => searchParams.getAll('centuries') || [],
    [searchParams],
  );
  const sex = searchParams.get('sex') || '';

  function handleQueryChange(event: React.ChangeEvent<HTMLInputElement>) {
    const params = new URLSearchParams(searchParams);

    params.set('query', event.target.value);
    setSearchParams(params);
  }

  function toggleCentery(century: number) {
    const newCenturies = centuries.includes(century.toString())
      ? centuries.filter((c: string) => c !== century.toString())
      : [...centuries, century.toString()];

    return newCenturies.length
      ? { centuries: newCenturies }
      : { centuries: null };
  }

  useEffect(() => {
    let filteredPeople = people;

    if (sex) {
      filteredPeople = filteredPeople.filter(person => person.sex === sex);
    }

    if (query) {
      filteredPeople = filteredPeople.filter(person =>
        person.name.toLowerCase().includes(query.toLowerCase()),
      );
    }

    if (centuries.length) {
      filteredPeople = filteredPeople.filter(person =>
        centuries.includes(Math.ceil(person.born / 100).toString()),
      );
    }

    setPeopleFilter(filteredPeople);
  }, [sex, query, centuries, people, setPeopleFilter]);

  return (
    <nav className="panel">
      <p className="panel-heading">Filters</p>

      <p className="panel-tabs" data-cy="SexFilter">
        <SearchLink
          params={{ sex: null }}
          className={cn({ 'is-active': !sex })}
        >
          All
        </SearchLink>
        <SearchLink
          params={{ sex: 'm' }}
          className={cn({ 'is-active': sex === 'm' })}
        >
          Male
        </SearchLink>
        <SearchLink
          params={{ sex: 'f' }}
          className={cn({ 'is-active': sex === 'f' })}
        >
          Female
        </SearchLink>
      </p>

      <div className="panel-block">
        <p className="control has-icons-left">
          <input
            value={query}
            onChange={handleQueryChange}
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
            {centuriesList.map(century => (
              <SearchLink
                key={century}
                data-cy="century"
                className={cn('button', 'mr-1', {
                  'is-info': centuries.includes(century.toString()),
                })}
                params={toggleCentery(century)}
              >
                {century}
              </SearchLink>
            ))}
          </div>

          <div className="level-right ml-4">
            <SearchLink
              data-cy="centuryALL"
              className="button is-success is-outlined"
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
