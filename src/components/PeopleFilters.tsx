interface FilterProps {
  sex: string | null;
  searchQuery: string;
  centuries: number[];
  handleNameChange: (value: string) => void;
  handleSexChange: (value: string) => void;
  handleCenturiesChange: (value: string) => void;
  clearCenturies: () => void;
}

export const PeopleFilters = ({
  sex,
  searchQuery,
  centuries,
  handleNameChange,
  handleSexChange,
  handleCenturiesChange,
  clearCenturies,
}: FilterProps) => {
  return (
    <nav className="panel">
      <p className="panel-heading">Filters</p>

      <p className="panel-tabs" data-cy="SexFilter">
        <a
          className={!sex ? 'is-active' : ''}
          href="#/people"
          onClick={() => handleSexChange('')}
        >
          All
        </a>
        <a
          className={sex === 'm' ? 'is-active' : ''}
          href="#/people?sex=m"
          onClick={() => handleSexChange('m')}
        >
          Male
        </a>
        <a
          className={sex === 'f' ? 'is-active' : ''}
          href="#/people?sex=f"
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
            value={searchQuery}
            onChange={e => handleNameChange(e.target.value)}
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
              className={
                centuries.includes(16) ? 'button mr-1 is-info' : 'button mr-1'
              }
              href="#"
              onClick={e => {
                e.preventDefault();
                handleCenturiesChange('16');
              }}
            >
              16
            </a>

            <a
              data-cy="century"
              className={
                centuries.includes(17) ? 'button mr-1 is-info' : 'button mr-1'
              }
              href="#"
              onClick={e => {
                e.preventDefault();
                handleCenturiesChange('17');
              }}
            >
              17
            </a>

            <a
              data-cy="century"
              className={
                centuries.includes(18) ? 'button mr-1 is-info' : 'button mr-1'
              }
              href="#"
              onClick={e => {
                e.preventDefault();
                handleCenturiesChange('18');
              }}
            >
              18
            </a>

            <a
              data-cy="century"
              className={
                centuries.includes(19) ? 'button mr-1 is-info' : 'button mr-1'
              }
              href="#"
              onClick={e => {
                e.preventDefault();
                handleCenturiesChange('19');
              }}
            >
              19
            </a>

            <a
              data-cy="century"
              className={
                centuries.includes(20) ? 'button mr-1 is-info' : 'button mr-1'
              }
              href="#"
              onClick={e => {
                e.preventDefault();
                handleCenturiesChange('20');
              }}
            >
              20
            </a>
          </div>

          <div className="level-right ml-4">
            <a
              data-cy="centuryALL"
              className={
                centuries.length === 0
                  ? 'button is-success is-outlined'
                  : 'button is-outlined'
              }
              href="#/people"
              onClick={e => {
                e.preventDefault();
                clearCenturies();
              }}
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
          onClick={() => {
            clearCenturies();
            handleNameChange('');
            handleSexChange('');
          }}
        >
          Reset all filters
        </a>
      </div>
    </nav>
  );
};
