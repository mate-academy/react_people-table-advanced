import { useSearchParams } from 'react-router-dom';
import { SearchLink } from './SearchLink';

enum Sex {
  Male = 'm',
  Female = 'f',
}

type Props = {
  onNameChange: (name: string) => void;
};

export const PeopleFilters: React.FC<Props> = ({ onNameChange }) => {
  const [searchParams, setSearchParams] = useSearchParams();
  const query = searchParams.get('query') || '';
  const selectedCenturies = searchParams.getAll('centuries') || [];
  const selectedSex = searchParams.get('sex') || '';

  const sexFilters = [
    { label: 'All', value: '' },
    { label: 'Male', value: Sex.Male },
    { label: 'Female', value: Sex.Female },
  ];

  const toggleCentury = (century: string) => {
    const index = selectedCenturies.indexOf(century);

    if (index === -1) {
      return [...selectedCenturies, century];
    } else {
      return selectedCenturies.filter(c => c !== century);
    }
  };

  const handleNameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const name = event.target.value;

    onNameChange(name);
    const params = new URLSearchParams(searchParams);

    params.set('query', name);
    setSearchParams(params);
  };

  const handleResetFilters = () => {
    onNameChange('');
  };

  return (
    <nav className="panel">
      <p className="panel-heading">Filters</p>


      <p className="panel-tabs" data-cy="SexFilter">
        {sexFilters.map((filter) => (
          <SearchLink
            key={filter.value}
            className={selectedSex === filter.value ? 'is-active' : ''}
            params={{ sex: filter.value }}
          >
            {filter.label}
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
            onChange={handleNameChange}
          />

          <span className="icon is-left">
            <i className="fas fa-search" aria-hidden="true" />
          </span>
        </p>
      </div>

      <div className="panel-block">
        <div className="level is-flex-grow-1 is-mobile" data-cy="CenturyFilter">
          <div className="level-left">
            {Array.from({ length: 5 }, (_, index) => index + 16 + '').map(
              century => (
                <SearchLink
                  key={century}
                  data-cy="century"
                  className={`button mr-1${selectedCenturies.includes(century) ? ' is-info' : ''}`}
                  params={{ centuries: toggleCentury(century) }}
                >
                  {century}
                </SearchLink>
              ),
            )}
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
        <a
          className="button is-link is-outlined is-fullwidth"
          href="#/people"
          onClick={handleResetFilters}
        >
          Reset all filters
        </a>
      </div>
    </nav>
  );
};
