import classNames from 'classnames';
import { FC, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { Person } from '../types';
import { getSearchWith } from '../utils/searchHelper';
import { SearchLink } from './SearchLink';

type Props = {
  people: Person[];
  setFilteredPeople: (people: Person[]) => void;
};

export const PeopleFilters: FC<Props> = ({ people, setFilteredPeople }) => {
  const [searchParams, setSearchParams] = useSearchParams();
  const sex = searchParams.get('sex') || null;
  const query = searchParams.get('query') || '';
  const centuries = searchParams.getAll('centuries') || [];
  const genderList = ['All', 'Male', 'Female'];
  const centuryList = ['16', '17', '18', '19', '20'];

  useEffect(() => {
    let listOfPeople = [...people];

    if (sex) {
      listOfPeople = listOfPeople.filter(person => person.sex === sex);
    }

    if (query) {
      const isContainQuery = (person: string | null) => {
        return person
          ? person.toLowerCase().includes(query.toLowerCase())
          : null;
      };

      listOfPeople = listOfPeople.filter(person => (
        isContainQuery(person.name)
          || isContainQuery(person.motherName)
          || isContainQuery(person.fatherName)
      ));
    }

    if (centuries.length) {
      listOfPeople = listOfPeople.filter(person => {
        const personBornCentury = Math.ceil(person.born / 100).toString();

        return centuries.includes(personBornCentury);
      });
    }

    setFilteredPeople(listOfPeople);
  }, [searchParams]);

  const onGenderSelect = (params: string) => {
    switch (params) {
      case 'Male':
        return 'm';
      case 'Female':
        return 'f';
      case 'All':
      default:
        return null;
    }
  };

  const onQueryChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchParams(
      getSearchWith(searchParams, { query: event.target.value || null }),
    );
  };

  return (
    <nav className="panel">
      <p className="panel-heading">Filters</p>

      <p className="panel-tabs" data-cy="SexFilter">
        {genderList.map(gender => (
          <SearchLink
            key={gender}
            params={{ sex: onGenderSelect(gender) }}
            className={classNames(
              { 'is-active': sex === onGenderSelect(gender) },
            )}
          >
            {gender}
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
            value={query}
            onChange={onQueryChange}
          />

          <span className="icon is-left">
            <i className="fas fa-search" aria-hidden="true" />
          </span>
        </p>
      </div>

      <div className="panel-block">
        <div className="level is-flex-grow-1 is-mobile" data-cy="CenturyFilter">
          <div className="level-left">
            {centuryList.map(century => (
              <SearchLink
                key={century}
                data-cy="century"
                className={classNames(
                  'button mr-1',
                  { 'is-info': centuries.includes(century) },
                )}
                params={{
                  centuries: centuries.includes(century)
                    ? centuries.filter(c => c !== century)
                    : [...centuries, century],
                }}
              >
                {century}
              </SearchLink>
            ))}
          </div>

          <div className="level-right ml-4">
            <SearchLink
              data-cy="centuryALL"
              className={classNames(
                'button is-success',
                { 'is-outlined': centuries.length },
              )}
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
          params={{
            sex: null,
            query: null,
            centuries: null,
          }}
        >
          Reset all filters
        </SearchLink>
      </div>
    </nav>
  );
};
