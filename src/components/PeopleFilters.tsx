import classNames from 'classnames';

type Props = {
  query: string;
  centuries: string[];
  sexOption: string;
  handleQueryChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  handleSexChange: (chosenSex: string) => void;
  toggleCentury: (num: string) => void;
  toggleAllCenturies: () => void;
  handleDeleteParams: () => void;
};

export const PeopleFilters: React.FC<Props> = ({
  query,
  centuries,
  sexOption,
  handleQueryChange,
  handleSexChange,
  toggleCentury,
  toggleAllCenturies,
  handleDeleteParams,
}) => {
  return (
    <nav className="panel">
      <p className="panel-heading">Filters</p>
      {/* eslint-disable jsx-a11y/anchor-is-valid */}
      <p className="panel-tabs" data-cy="SexFilter">
        {['All', 'Male', 'Female'].map(sex => (
          <a
            key={sex}
            className={classNames('', {
              'is-active': sexOption === sex,
            })}
            onClick={e => {
              e.preventDefault();
              handleSexChange(sex);
            }}
            href="#"
          >
            {sex}
          </a>
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
            {['16', '17', '18', '19', '20'].map(century => (
              <button
                key={century}
                type="button"
                data-cy="century"
                onClick={e => {
                  e.preventDefault();
                  toggleCentury(century);
                }}
                className={classNames('button mr-1', {
                  'is-info': centuries.includes(century),
                })}
              >
                {century}
              </button>
            ))}
          </div>

          <div className="level-right ml-4">
            <button
              type="button"
              data-cy="centuryALL"
              onClick={() => toggleAllCenturies()}
              className="button is-success is-outlined"
            >
              All
            </button>
          </div>
        </div>
      </div>

      <div className="panel-block">
        <a
          className="button is-link is-outlined is-fullwidth"
          onClick={handleDeleteParams}
          href="#/people"
        >
          Reset all filters
        </a>
      </div>
    </nav>
  );
};
