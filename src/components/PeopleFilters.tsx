import classNames from 'classnames';
import { Person } from '../types';
import { SearchLink } from './SearchLink';

type Props = {
  queryFilter: (e: React.ChangeEvent<HTMLInputElement>) => void;
  query: string;
  people: Person[];
  sexFilter: (value: string) => void;
  chooseCenturies: (value: string) => void;
  allCenturies: () => void;
  centuries: string[];
};

export const PeopleFilters: React.FC<Props> = ({
  queryFilter,
  query,
  people,
  sexFilter,
  chooseCenturies,
  allCenturies,
  centuries,
}) => {
  const centuriesFilters = ['16', '17', '18', '19', '20'];
  const hasMale = people.some(person => person.sex === 'm');
  const hasFemale = people.some(person => person.sex === 'f');

  return (
    <nav className="panel">
      <p className="panel-heading">Filters</p>

      <p className="panel-tabs" data-cy="SexFilter">
        <SearchLink
          className={classNames({ 'is-active': hasMale && hasFemale })}
          // href="#/people"
          params={{ sex: 'all' }}
          onClick={() => sexFilter('all')}
        >
          All
        </SearchLink>
        <SearchLink
          className={classNames({ 'is-active': hasMale && !hasFemale })}
          // href="#/people?sex=m"
          params={{ sex: 'm' }}
          onClick={() => sexFilter('m')}
        >
          Male
        </SearchLink>
        <SearchLink
          className={classNames({ 'is-active': !hasMale && hasFemale })}
          // href="#/people?sex=f"
          params={{ sex: 'f' }}
          onClick={() => sexFilter('f')}
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
            onChange={queryFilter}
          />

          <span className="icon is-left">
            <i className="fas fa-search" aria-hidden="true" />
          </span>
        </p>
      </div>

      <div className="panel-block">
        <div className="level is-flex-grow-1 is-mobile" data-cy="CenturyFilter">
          <div className="level-left">
            {centuriesFilters.map(century => (
              <SearchLink
                key={century}
                data-cy="century"
                className={classNames('button mr-1', {
                  'is-info': centuries.includes(century),
                })}
                params={{ centuries }}
                onClick={() => chooseCenturies(century)}
              >
                {century}
              </SearchLink>
            ))}

            {/* <a
              data-cy="century"
              className="button mr-1"
              href="#/people?centuries=16"
              // params={{ years: '16' }}
              onClick={() => chooseCenturies('16')}
            >
              16
            </a>

            <a
              data-cy="century"
              className="button mr-1 is-info"
              // params={{ years: '17' }}
              href="#/people?centuries=17"
              onClick={() => chooseCenturies('17')}
            >
              17
            </a>

            <a
              data-cy="century"
              className="button mr-1 is-info"
              // params={{ years: '18' }}
              href="#/people?centuries=18"
              onClick={() => chooseCenturies('18')}
            >
              18
            </a>

            <a
              data-cy="century"
              className="button mr-1 is-info"
              // params={{ years: '19' }}
              href="#/people?centuries=19"
              onClick={() => chooseCenturies('19')}
            >
              19
            </a>

            <a
              data-cy="century"
              className="button mr-1"
              // params={{ years: '20' }}
              href="#/people?centuries=20"
              onClick={() => chooseCenturies('20')}
            >
              20
            </a> */}
          </div>

          <div className="level-right ml-4">
            <a
              data-cy="centuryALL"
              className="button is-success is-outlined"
              href="#/people"
              // params={{}}
              onClick={() => allCenturies()}
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
