interface PropsFilterPeople {
  searchQuery: string;
  selectedSex: string | null;
  onSearchChange: (newQuery: string) => void;
  onSexChange: (newSex: string) => void;
  onResetFilters: () => void;
  onCenturyChange: (centuries: string[]) => void;
  selectedCentury: string[];
}

export const PeopleFilters: React.FC<PropsFilterPeople> = ({
  selectedSex,
  searchQuery,
  onSearchChange,
  onSexChange,
  onResetFilters,
  onCenturyChange,
  selectedCentury,
}) => {
  const handleCenturyChange = (century: string) => {
    const updatedCentury = selectedCentury.includes(century)
      ? selectedCentury.filter(c => c !== century)
      : [...selectedCentury, century];

    onCenturyChange(updatedCentury);
  };

  return (
    <nav className="panel">
      <p className="panel-heading">Filters</p>

      <p className="panel-tabs" data-cy="SexFilter">
        <a
          className={selectedSex === '' ? 'is-active' : ''}
          onClick={() => onSexChange('')}
        >
          All
        </a>
        <a
          className={selectedSex === 'm' ? 'is-active is-info' : 'is-info'}
          onClick={() => onSexChange('m')}
        >
          Male
        </a>
        <a
          className={selectedSex === 'f' ? 'is-active is-danger' : 'is-danger'}
          onClick={() => onSexChange('f')}
        >
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
            value={searchQuery}
            onChange={event => onSearchChange(event.target.value)}
          />
          <span className="icon is-left">
            <i className="fas fa-search" aria-hidden="true" />
          </span>
        </p>
      </div>

      <div className="panel-block">
        <div className="level is-flex-grow-1 is-mobile" data-cy="CenturyFilter">
          <div className="level-left">
            <button
              data-cy="century"
              className={`button mr-1 ${selectedCentury.includes('16') ? 'is-info' : ''}`}
              onClick={() => handleCenturyChange('16')}
            >
              16
            </button>

            <button
              data-cy="century"
              className={`button mr-1 ${selectedCentury.includes('17') ? 'is-info' : ''}`}
              onClick={() => handleCenturyChange('17')}
            >
              17
            </button>

            <button
              data-cy="century"
              className={`button mr-1 ${selectedCentury.includes('18') ? 'is-info' : ''}`}
              onClick={() => handleCenturyChange('18')}
            >
              18
            </button>

            <button
              className={`button ${selectedCentury.includes('19') ? 'is-link' : ''}`}
              onClick={() => handleCenturyChange('19')}
            >
              19
            </button>

            <button
              data-cy="century"
              className={`button mr-1 ${selectedCentury.includes('20') ? 'is-info' : ''}`}
              onClick={() => handleCenturyChange('20')}
            >
              20
            </button>
          </div>

          <div className="level-right ml-4">
            <button
              data-cy="centuryALL"
              className="button is-success is-outlined"
              onClick={() => onCenturyChange([])}
            >
              All
            </button>
          </div>
        </div>
      </div>

      <div className="panel-block">
        <button
          className="button is-link is-outlined is-fullwidth"
          onClick={onResetFilters}
        >
          Reset all filters
        </button>
      </div>
    </nav>
  );
};
