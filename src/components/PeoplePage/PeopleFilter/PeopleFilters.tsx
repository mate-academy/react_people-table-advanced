import classNames from 'classnames';
import { useLocation, useSearchParams } from 'react-router-dom';
import { Person } from '../../../types';
import { SearchLink } from '../../SearchLink';

type Props = {
  people: Person[],
  searchInput: string,
  setSearchInput: (value: string) => void,
  setVisiblePeople: (value: Person[]) => void,
};

export const PeopleFilters:React.FC<Props> = ({
  people,
  setVisiblePeople,
  setSearchInput,
  searchInput,
}) => {
  const [searchParams] = useSearchParams();
  const centuries = searchParams.getAll('centuries') || [];
  const { search } = useLocation();
  const centuriesArray = ['16', '17', '18', '19', '20'];
  const centuriesToParams = (century: string) => {
    return centuries.includes(century)
      ? centuries.filter(el => el !== century)
      : [...centuries, century];
  };

  const filterByInput = (input: string = searchInput) => {
    setSearchInput(input);
  };

  const showAll = () => {
    setVisiblePeople(people.filter(
      (person) => person.name.toLowerCase().includes(searchInput.toLowerCase()),
    ));
  };

  return (
    <nav className="panel">
      <p className="panel-heading">Filters</p>

      <p className="panel-tabs" data-cy="SexFilter">
        <SearchLink
          className={classNames({
            'is-active': !search.includes('?sex='),
          })}
          params={{ sex: null }}
        >
          All
        </SearchLink>
        <SearchLink
          className={classNames({
            'is-active': search.includes('?sex=m'),
          })}
          params={{ sex: 'm' }}
        >
          Male
        </SearchLink>
        <SearchLink
          className={classNames({
            'is-active': search.includes('?sex=f'),
          })}
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
            value={searchInput}
            onChange={(event) => filterByInput(event.target.value)}
          />

          <span className="icon is-left">
            <i className="fas fa-search" aria-hidden="true" />
          </span>
        </p>
      </div>

      <div className="panel-block">
        <div className="level is-flex-grow-1 is-mobile" data-cy="CenturyFilter">
          <div className="level-left">
            {centuriesArray.map((century) => {
              return (
                <SearchLink
                  key={century}
                  data-cy="century"
                  className={classNames('button mr-1', {
                    'is-info':
                      centuries.includes(century.toString()),
                  })}
                  params={{ centuries: centuriesToParams(century) }}
                >
                  {century}
                </SearchLink>
              );
            })}

          </div>

          <div className="level-right ml-4">
            <SearchLink
              data-cy="centuryALL"
              className="button is-success is-outlined"
              params={{ centuries: [] }}
              onClick={showAll}
            >
              All
            </SearchLink>
          </div>
        </div>
      </div>

      <div className="panel-block">
        <SearchLink
          className="button is-link is-outlined is-fullwidth"
          params={{ sex: null, centuries: null }}
        >
          Reset all filters
        </SearchLink>
      </div>
    </nav>
  );
};
