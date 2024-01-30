import { Link } from "react-router-dom";
import { customSearchHelper } from "../utils/customSearchHelper";

export const PeopleFilters = ({
  setChosenCentury,
  setChosenSex,
  setFilteringType,
  enteredText,
  setEnteredText,
  searchParams,
  setSearchParams,
  centuries,
}) => {
  const handleInput = (e) => {
    setEnteredText(e.target.value);
    setFilteringType('by_text');
    const params = new URLSearchParams(searchParams);

    params.set('query', e.target.value);

    if (!e.target.value) {
      params.delete('query');
    }

    setSearchParams(params);
  };

  const handleSex = (sexType) => {
    setChosenSex(sexType);
    setFilteringType('by_sex');
  };

  const toggleCenturies = (century) => {
    setChosenCentury(century);
    setFilteringType('by_century');
  };


  const clearCenturies = () => {
    setFilteringType('');
    const params = new URLSearchParams(searchParams);

    params.delete('centuries');
    setSearchParams(params);
  };

  return (
    <nav className="panel">
      <p className="panel-heading">Filters</p>

      <p className="panel-tabs" data-cy="SexFilter">
        <Link
          onClick={() => {
            setFilteringType('');
          }}
          to="/people"

        >
          All
        </Link>
        <Link
          onClick={() => handleSex('m')}
          to={customSearchHelper(searchParams, { sex: 'm' })}
        >
          Male
        </Link>
        <Link
          onClick={() => handleSex('f')}
          to={customSearchHelper(searchParams, { sex: 'f' })}
        >
          Female
        </Link>
      </p>

      <div className="panel-block">
        <p className="control has-icons-left">
          <input
            onChange={handleInput}
            value={enteredText}
            data-cy="NameFilter"
            type="search"
            className="input"
            placeholder="Search"
          />

          <span className="icon is-left">
            <i className="fas fa-search" aria-hidden="true" />
          </span>
        </p>
      </div>

      <div className="panel-block">
        <div className="level is-flex-grow-1 is-mobile" data-cy="CenturyFilter">
          <div className="level-left">
            {[16, 17, 18, 19, 20].map((century) => (
              <Link
                data-cy="century"
                className="button mr-1"
                onClick={() => toggleCenturies(century)}
                to={customSearchHelper(searchParams,
                  { centuries: [...centuries, century] })}
              >
                {century}
              </Link>
            ))}

          </div>

          <div className="level-right ml-4">
            <a
              onClick={clearCenturies}
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
          onClick={() => {
            setFilteringType('');
          }}
          className="button is-link is-outlined is-fullwidth"
          href="#/people"
        >
          Reset all filters
        </a>
      </div>
    </nav>
  );
};
