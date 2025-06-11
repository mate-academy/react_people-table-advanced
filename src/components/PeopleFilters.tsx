import { useSearchParams } from 'react-router-dom';
import { getSearchWith } from '../utils/searchHelper';
import { SearchLink } from './SearchLink';
import { Person } from '../types';

export const sortPeople = (
  people: Person[],
  {
    sex,
    query,
    sort,
    order,
    centuries,
  }: {
    sex: string | null;
    query: string | null;
    centuries: string[] | null;
    sort: string | null;
    order: string | null;
  },
): Person[] => {
  let newPeople = [...people];

  if (query) {
    const trimedQuery = query.trim().toLowerCase();

    newPeople = newPeople.filter(
      person =>
        person.name.toLowerCase().includes(trimedQuery) ||
        person.motherName?.toLowerCase().includes(trimedQuery) ||
        person.fatherName?.toLowerCase().includes(trimedQuery),
    );
  }

  switch (sex) {
    case 'f':
      newPeople = newPeople.filter(person => person.sex === 'f');
      break;
    case 'm':
      newPeople = newPeople.filter(person => person.sex === 'm');
      break;
    default:
      break;
  }

  switch (sort) {
    case 'Name':
      newPeople = newPeople.sort((person1, person2) =>
        person1.name.localeCompare(person2.name),
      );
      break;
    case 'Sex':
      newPeople = newPeople.sort((person1, person2) =>
        person1.sex.localeCompare(person2.sex),
      );
      break;
    case 'Born':
      newPeople = newPeople.sort(
        (person1, person2) => person1.born - person2.born,
      );
      break;
    case 'Died':
      newPeople = newPeople.sort(
        (person1, person2) => person1.died - person2.died,
      );
      break;
    default:
      break;
  }

  if (centuries && centuries.length) {
    newPeople = newPeople.filter(p =>
      centuries.includes((Math.floor((p.born - 1) / 100) + 1).toString()),
    );
  }

  if (order === 'desc') {
    newPeople = newPeople.reverse();
  }

  return newPeople;
};

export const PeopleFilters = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const sex = searchParams.get('sex');
  const query = searchParams.get('query') || '';
  const selectedCenturies = searchParams.getAll('centuries');
  const centuries = ['16', '17', '18', '19', '20'];

  const handleQuery = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchParams(
      getSearchWith(searchParams, { query: event.target.value || null }),
    );
  };

  return (
    <nav className="panel">
      <p className="panel-heading">Filters</p>

      <p className="panel-tabs" data-cy="SexFilter">
        <SearchLink className={!sex ? 'is-active' : ''} params={{ sex: null }}>
          All
        </SearchLink>
        <SearchLink
          className={sex === 'm' ? 'is-active' : ''}
          params={{ sex: 'm' }}
        >
          Male
        </SearchLink>
        <SearchLink
          className={sex === 'f' ? 'is-active' : ''}
          params={{ sex: 'f' }}
        >
          Female
        </SearchLink>
      </p>

      <div className="panel-block">
        <p className="control has-icons-left">
          <input
            data-cy="NameFilter"
            type="search"
            className="input"
            placeholder="Search"
            value={query}
            onChange={handleQuery}
          />

          <span className="icon is-left">
            <i className="fas fa-search" aria-hidden="true" />
          </span>
        </p>
      </div>

      <div className="panel-block">
        <div className="level is-flex-grow-1 is-mobile" data-cy="CenturyFilter">
          <div className="level-left">
            {centuries.map(c => (
              <SearchLink
                key={c}
                data-cy="century"
                className={`button mr-1 ${selectedCenturies.includes(c) ? 'is-info' : ''}`}
                params={{
                  centuries: selectedCenturies.includes(c)
                    ? selectedCenturies.filter(century => century != c)
                    : [...selectedCenturies, c],
                }}
              >
                {c}
              </SearchLink>
            ))}
          </div>

          <div className="level-right ml-4">
            <SearchLink
              data-cy="centuryALL"
              className={`button is-success ${selectedCenturies.length !== 0 ? 'is-outlined' : ''}`}
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
          params={{ sex: null, query: null, centuries: null }}
        >
          Reset all filters
        </SearchLink>
      </div>
    </nav>
  );
};
