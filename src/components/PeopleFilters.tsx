type Props = {
  handleQueryChange: (query: string) => void;
  handleCenturyToggle: (century: string) => void;
  handleAllCenturies: () => void;
  handleSexChange: (sex: string | null) => void;
  selectedCenturies: string[];
  selectedSex: string | null;
};

export const PeopleFilters: React.FC<Props> = ({
  handleQueryChange,
  handleCenturyToggle,
  handleAllCenturies,
  selectedCenturies,
  selectedSex,
  handleSexChange,
}) => {
  const CENTURIES = ['16', '17', '18', '19', '20'];

  return (
    <nav className="panel">
      <p className="panel-heading">Filters</p>

      <p className="panel-tabs" data-cy="SexFilter">
        <a
          className={!selectedSex ? 'is-active' : ''}
          onClick={() => handleSexChange(null)}
        >
          All
        </a>
        <a
          className={selectedSex === 'm' ? 'is-active' : ''}
          onClick={() => handleSexChange('m')}
        >
          Male
        </a>
        <a
          className={selectedSex === 'f' ? 'is-active' : ''}
          onClick={() => handleSexChange('f')}
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
            onChange={event => handleQueryChange(event.target.value)}
          />

          <span className="icon is-left">
            <i className="fas fa-search" aria-hidden="true" />
          </span>
        </p>
      </div>

      <div className="panel-block">
        <div className="level is-flex-grow-1 is-mobile" data-cy="CenturyFilter">
          <div className="level-left">
            {CENTURIES.map(century => (
              <button
                key={century}
                type="button"
                data-cy="century"
                className={`button mr-1 ${
                  selectedCenturies.includes(century) ? 'is-info' : ''
                }`}
                onClick={() => handleCenturyToggle(century)}
              >
                {century}
              </button>
            ))}
          </div>

          <div className="level-right ml-4">
            <button
              type="button"
              data-cy="centuryALL"
              className="button is-success is-outlined"
              onClick={handleAllCenturies}
            >
              All
            </button>
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
