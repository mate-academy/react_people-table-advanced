import classNames from 'classnames';
import { useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { Person } from '../types';
import { getSearchWith } from '../utils/searchHelper';
import { SearchLink } from './SearchLink';

type Props = {
  peopleList: Person[];
  setFilteredPeopleList: (list: Person[]) => void;
};

export const PeopleFilters: React.FC<Props> = ({
  peopleList,
  setFilteredPeopleList,
}) => {
  const [searchParams, setSearchParams] = useSearchParams();
  const sex = searchParams.get('sex') || null;
  const query = searchParams.get('query') || '';
  const centuries = searchParams.getAll('centuries') || [];
  const sexList = ['All', 'Male', 'Female'];
  const centuryList = ['16', '17', '18', '19', '20'];

  const filterDependencies = async () => {
    let filteredPeople = [...peopleList];

    if (sex) {
      filteredPeople = filteredPeople.filter(person => person.sex === sex);
    }

    if (query) {
      const queryCheck = (name: string | null) => {
        return name
          ? name.toLowerCase().includes(query.toLowerCase())
          : null;
      };

      filteredPeople = filteredPeople.filter(person => queryCheck(person.name)
      || queryCheck(person.motherName)
      || queryCheck(person.fatherName));
    }

    if (centuries.length) {
      filteredPeople = filteredPeople.filter(person => {
        const bornCentury = Math.ceil(person.born / 100).toString();

        return centuries.includes(bornCentury);
      });
    }

    setFilteredPeopleList(filteredPeople);
  };

  useEffect(() => {
    filterDependencies();

    return () => {
      setFilteredPeopleList(peopleList);
    };
  }, [searchParams]);

  enum Genders {
    All = 'All',
    Female = 'Female',
    Male = 'Male',
  }

  const handleSexSelect = (gender: string) => {
    switch (gender) {
      case (Genders.Female):
        return 'f';

      case (Genders.Male):
        return 'm';

      case (Genders.All):
      default:
        return null;
    }
  };

  const handleQueryChange = async (
    event: React.ChangeEvent<HTMLInputElement>,
  ) => {
    setSearchParams(
      getSearchWith(
        searchParams,
        { query: event.target.value || null },
      ),
    );
  };

  return (
    <nav className="panel">
      <p className="panel-heading">Filters</p>

      <p className="panel-tabs" data-cy="SexFilter">
        {sexList.map(gender => {
          return (
            <SearchLink
              key={gender}
              params={{ sex: handleSexSelect(gender) }}
              className={classNames(
                { 'is-active': sex === handleSexSelect(gender) },
              )}
            >
              {gender}
            </SearchLink>
          );
        })}
      </p>

      <div className="panel-block">
        <p className="control has-icons-left">
          <input
            data-cy="NameFilter"
            type="search"
            className="input"
            placeholder="Search"
            value={query}
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
            {centuryList.map(century => (
              <SearchLink
                key={century}
                data-cy="century"
                params={{
                  centuries: centuries.includes(century)
                    ? centuries.filter(cent => cent !== century)
                    : [...centuries, century],
                }}
                className={classNames(
                  'button',
                  'mr-1',
                  { 'is-info': centuries.includes(century) },
                )}
              >
                {century}
              </SearchLink>
            ))}
          </div>

          <div className="level-right ml-4">
            <SearchLink
              data-cy="centuryALL"
              params={{ centuries: [] }}
              className={classNames(
                'button',
                'is-success',
                { 'is-static': !centuries.length },
              )}
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
            centuries: null,
            sex: null,
            query: null,
          }}
        >
          Reset all filters
        </SearchLink>
      </div>
    </nav>
  );
};
