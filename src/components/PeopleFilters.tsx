import { useSearchParams } from 'react-router-dom';
import { getSearchWith } from '../utils/searchHelper';
import { SearchLink } from './SearchLink';
import cn from 'classnames';
import { Person } from '../types';

export const PeopleFilters = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const sex = searchParams.get('sex');
  const query = searchParams.get('query') || '';
  const centuries = ['16', '17', '18', '19', '20'];

  const handleQery = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchParams(
      getSearchWith(searchParams, {
        query: event?.target.value || null,
      }),
    );
  };

  return (
    <nav className="panel">
      <p className="panel-heading">Filters</p>

      <p className="panel-tabs" data-cy="SexFilter">
        <SearchLink
          className={cn({ 'is-active': !sex })}
          params={{ sex: null }}
        >
          All
        </SearchLink>
        <SearchLink
          className={cn({ 'is-active': sex === 'm' })}
          params={{ sex: 'm' }}
        >
          Male
        </SearchLink>
        <SearchLink
          className={cn({ 'is-active': sex === 'f' })}
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
            onChange={handleQery}
          />

          <span className="icon is-left">
            <i className="fas fa-search" aria-hidden="true" />
          </span>
        </p>
      </div>

      <div className="panel-block">
        <div className="level is-flex-grow-1 is-mobile" data-cy="CenturyFilter">
          <div className="level-left">
            {centuries.map(century => (
              <SearchLink
                key={century}
                data-cy="century"
                className={cn('button mr-1', {
                  'is-info': centuries.includes(century),
                })}
                params={{
                  centuries: [...centuries].includes(century)
                    ? centuries.filter(item => item === century)
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
          params={{ sex: null, query: null, centuries: [] }}
        >
          Reset all filters
        </SearchLink>
      </div>
    </nav>
  );
};

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
    const q = query.trim().toLowerCase();

    newPeople = newPeople.filter(
      p =>
        p.name.toLocaleLowerCase().includes(q) ||
        p.motherName?.toLocaleLowerCase().includes(q) ||
        p.fatherName?.toLocaleLowerCase().includes(q),
    );
  }

  switch (sex) {
    case 'f':
      newPeople = newPeople.filter(p => p.sex === 'f');
      break;
    case 'm':
      newPeople = newPeople.filter(p => p.sex === 'm');
      break;
    default:
      break;
  }

  if (sort) {
    switch (sort) {
      case 'Name':
        newPeople = newPeople.sort((a, b) => a.name.localeCompare(b.name));
        break;
      case 'Sex':
        newPeople = newPeople.sort((a, b) => a.sex.localeCompare(b.sex));
        break;
      case 'Born':
      case 'Died':
        newPeople = newPeople.sort((a, b) => a.died - b.died);
        break;
    }
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
