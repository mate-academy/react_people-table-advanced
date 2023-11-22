import { Link } from 'react-router-dom';
import { Centuries } from '../types/Centuries';
import { Gender } from '../types/Gender';

type PeopleFiltersProps = {
  filterGenderStatus: Gender;
  setFilterGenderStatus: React.Dispatch<React.SetStateAction<Gender>>;
  setSelectedCenturies: React.Dispatch<React.SetStateAction<string[]>>;
  selectedCenturies: string[];
};

export const PeopleFilters: React.FC<PeopleFiltersProps> = ({
  filterGenderStatus,
  setFilterGenderStatus,
  setSelectedCenturies,
  selectedCenturies,
}) => {
  const toggleCentury = (century: string) => {
    setSelectedCenturies(prev => (prev.includes(century)
      ? prev.filter(c => c !== century)
      : [...prev, century]));
  };

  const resetAllCenturies = () => {
    setSelectedCenturies([]);
  };

  const resetAllFilters = () => {
    resetAllCenturies();
    setFilterGenderStatus(Gender.ALL);
  };

  return (
    <nav className="panel">
      <p className="panel-heading">Filters</p>

      <p className="panel-tabs" data-cy="SexFilter">
        {Object.values(Gender).map((sex) => (
          <Link
            key={sex}
            onClick={() => setFilterGenderStatus(sex)}
            className={`panel-tab ${filterGenderStatus === sex ? 'is-active' : ''}`}
            to={sex === Gender.ALL ? '.' : `?sex=${sex.toLowerCase().charAt(0)}`}
          >
            {sex}
          </Link>
        ))}
      </p>

      <div className="panel-block">
        <p className="control has-icons-left">
          <input
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
            {Object.values(Centuries).map((century) => (
              <Link
                key={century}
                onClick={() => toggleCentury(century)}
                className={`button mr-1 ${selectedCenturies.includes(century) ? 'is-info' : ''}`}
                data-cy="century"
                to={`?centuries=${century}`}
              >
                {century}
              </Link>
            ))}
            <Link
              onClick={resetAllCenturies}
              data-cy="centuryALL"
              className={`button is-success ${selectedCenturies.length > 0 ? 'is-outlined' : ''}`}
              to="."
            >
              All
            </Link>
          </div>
        </div>
      </div>

      <div className="panel-block">
        <Link
          onClick={resetAllFilters}
          className="button is-link is-outlined is-fullwidth"
          to="#/people"
        >
          Reset all filters
        </Link>
      </div>
    </nav>
  );
};
