import { Person } from '../types/Person';

interface PeopleFilterProps {
  people: Person[];
  query: string;
  setQuery: React.Dispatch<React.SetStateAction<string>>;
  setGenderFilter: React.Dispatch<React.SetStateAction<'all' | 'm' | 'f' >>;
  genderFilter: 'all' | 'm' | 'f';
  centuryFilter: string[];
  setCenturyFilter: React.Dispatch<React.SetStateAction<string[]>>;
}


export const PeopleFilters: React.FC<PeopleFilterProps> = ({ query, setQuery, setGenderFilter, genderFilter, centuryFilter, setCenturyFilter }) => {

  return (
    <nav className="panel">
      <p className="panel-heading">Filters</p>

      <p className="panel-tabs" data-cy="SexFilter">
        <a className={genderFilter === 'all' ? 'is-active' : ''} href="#/people" onClick={() => setGenderFilter('all')}>
          All
        </a>
        <a className={genderFilter === 'm' ? 'is-active' : ''} href="#/people?sex=m" onClick={() => setGenderFilter('m')}>
          Male
        </a>
        <a className={genderFilter === 'f' ? 'is-active' : ''} href="#/people?sex=f" onClick={() => setGenderFilter('f')}>
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
        {['16', '17', '18', '19', '20'].map((century) => (
          <a
            key={century}
            className={`button mr-1 ${centuryFilter.includes(century) ? 'is-info' : ''}`}
            href="#/people"
            onClick={() => {
            setCenturyFilter(prev =>
              prev.includes(century)
                ? prev.filter(item => item !== century)
                : [...prev, century]
            );
        }}
          >
      {century}
    </a>
  ))}
</div>


<div className="level-right ml-4">
  <a
    data-cy="centuryALL"
    className="button is-success is-outlined"
    href="#/people"
    onClick={() => setCenturyFilter(['16', '17', '18', '19', '20'])}
  >
              All
            </a>
          </div>
        </div>
      </div>

      <div className="panel-block">
        <a className="button is-link is-outlined is-fullwidth" href="#/people" onClick={() => {
          setQuery('');
          setGenderFilter('all');
          setCenturyFilter([]);
        }}>
          Reset all filters
        </a>
      </div>
    </nav>
  );
};
