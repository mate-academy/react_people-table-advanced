import { SearchLink } from './Loader/SearchLink';

type Props = {
  query: string;
  sex: string;
  centuries: number[];
  onQueryChange: (query: string) => void;
  onSexChange: (sex: string) => void;
  onCenturiesChange: (centuries: number[]) => void;
};

export const PeopleFilters = ({
  query,
  sex,
  centuries,
  onQueryChange,
  onSexChange,
  onCenturiesChange,
}: Props) => {
  const allCenturies = [16, 17, 18, 19, 20];

  const handleQueryChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    onQueryChange(e.target.value);
  };

  const handleCenturyClick = (century: number) => {
    const newCenturies = centuries.includes(century)
      ? centuries.filter(c => c !== century)
      : [...centuries, century];

    onCenturiesChange(newCenturies);
  };

  const handleReset = () => {
    onQueryChange('');
    onSexChange('');
    onCenturiesChange([]);
  };

  return (
    <nav className="panel">
      <p className="panel-heading">Filters</p>

      <p className="panel-tabs" data-cy="SexFilter">
        <SearchLink
          params={{ sex: null }}
          className={!sex ? 'is-active' : ''}
          onClick={() => onSexChange('')}
        >
          All
        </SearchLink>
        <SearchLink
          params={{ sex: 'm' }}
          className={sex === 'm' ? 'is-active' : ''}
          onClick={() => onSexChange('m')}
        >
          Male
        </SearchLink>
        <SearchLink
          params={{ sex: 'f' }}
          className={sex === 'f' ? 'is-active' : ''}
          onClick={() => onSexChange('f')}
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
            {allCenturies.map(century => (
              <button
                key={century}
                data-cy="century"
                className={`button mr-1 ${centuries.includes(century) ? 'is-info' : ''}`}
                onClick={() => handleCenturyClick(century)}
              >
                {century}
              </button>
            ))}
          </div>

          <div className="level-right ml-4">
            <button
              data-cy="centuryALL"
              className="button is-success is-outlined"
              onClick={() => onCenturiesChange([])}
            >
              All
            </button>
          </div>
        </div>
      </div>

      <div className="panel-block">
        <SearchLink
          className="button is-link is-outlined is-fullwidth"
          params={{
            query: null,
            sex: null,
            centuries: null,
            sort: null,
            order: null,
          }}
          onClick={handleReset}
        >
          Reset all filters
        </SearchLink>
      </div>
    </nav>
  );
};
