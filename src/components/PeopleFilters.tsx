import { Person } from '../types/Person';

interface PeopleFilterProps {
  people: Person[];
  query: string;
  setQuery: React.Dispatch<React.SetStateAction<string>>;
  setGenderFilter: React.Dispatch<React.SetStateAction<'all' | 'm' | 'f'>>;
  genderFilter: 'all' | 'male' | 'female';
  centuryFilter: '16' | '17' | '18' | '19' | '20';
  setCenturyFilter: React.Dispatch<React.SetStateAction<'16' | '17' | '18' | '19' | '20'>>;
}


export const PeopleFilters: React.FC<PeopleFilterProps> = ({ query, setQuery, people, setGenderFilter, genderFilter, centuryFilter, setCenturyFilter }) => {

  return (
    <nav className="panel">
      <p className="panel-heading">Filters</p>

      <p className="panel-tabs" data-cy="SexFilter">
        <a className={genderFilter === 'all' ? 'is-active' : ''} href="#/people" onClick={() => setGenderFilter('all')}>
          All
        </a>
        <a className={genderFilter === 'male' ? 'is-active' : ''} href="#/people?sex=m" onClick={() => setGenderFilter('m')}>
          Male
        </a>
        <a className={genderFilter === 'female' ? 'is-active' : ''} href="#/people?sex=f" onClick={() => setGenderFilter('f')}>
          Female
        </a>
      </p>

      <div className="panel-block">
        <p className="control has-icons-left">
          <input
            data-cy="NameFilter"
            type="search"
            className="input"
            placeholder="Search"
            value={query}
            onChange={(event) => {
              setQuery(event.target.value);
            }}
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
              className={`button mr-1 ${centuryFilter === '16' ? 'is-info' : ''}`}
              href="#/people?centuries=16"
              onClick={() => setCenturyFilter('16')}
            >
              16
            </a>

            <a
              data-cy="century"
              className={`button mr-1 ${centuryFilter === '17' ? 'is-info' : ''}`}
              href="#/people?centuries=17"
              onClick={() => setCenturyFilter('17')}
            >
              17
            </a>

            <a
              data-cy="century"
              className={`button mr-1 ${centuryFilter === '18' ? 'is-info' : ''}`}
              href="#/people?centuries=18"
              onClick={() => setCenturyFilter('18')}
            >
              18
            </a>

            <a
              data-cy="century"
              className={`button mr-1 ${centuryFilter === '19' ? 'is-info' : ''}`}
              href="#/people?centuries=19"
              onClick={() => setCenturyFilter('19')}
            >
              19
            </a>

            <a
              data-cy="century"
              className={`button mr-1 ${centuryFilter === '20' ? 'is-info' : ''}`}
              href="#/people?centuries=20"
              onClick={() => setCenturyFilter('20')}
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
        <a className="button is-link is-outlined is-fullwidth" href="#/people" onClick={() => setQuery('')}>
          Reset all filters
        </a>
      </div>
    </nav>
  );
};
