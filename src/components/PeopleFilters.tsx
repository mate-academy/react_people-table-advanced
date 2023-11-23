/* eslint-disable jsx-a11y/anchor-is-valid */
import { Link, useSearchParams } from 'react-router-dom';
import { Dispatch, SetStateAction } from 'react';
import { Centuries } from '../types/Centuries';
import { Gender } from '../types/Gender';
import { LinkWithParams } from './LinkWithParams';

type PeopleFiltersProps = {
  filterGenderStatus: Gender;
  setFilterGenderStatus: React.Dispatch<React.SetStateAction<Gender>>;
  setSelectedCenturies: React.Dispatch<React.SetStateAction<string[]>>;
  selectedCenturies: string[];
  handleSearchChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  searchQuery: string;
  setSearchQuery: Dispatch<SetStateAction<string>>;
};

export const PeopleFilters: React.FC<PeopleFiltersProps> = ({
  filterGenderStatus,
  setFilterGenderStatus,
  setSelectedCenturies,
  handleSearchChange,
  setSearchQuery,
  searchQuery,
}) => {
  const [searchParams, setSearchParams] = useSearchParams();
  const centuries = searchParams.getAll('centuries' || []);

  const toggleCentury = (century: string) => {
    setSelectedCenturies(prev => (prev.includes(century)
      ? prev.filter(c => c !== century)
      : [...prev, century]));
  };

  const resetAllCenturies = () => {
    const params = new URLSearchParams();

    params.delete('centuries');
    setSearchParams(params);
    setSelectedCenturies([]);
  };

  const resetAllFilters = () => {
    resetAllCenturies();
    setFilterGenderStatus(Gender.ALL);
    setSearchQuery('');
  };

  return (
    <nav className="panel">
      <p className="panel-heading">Filters</p>

      <p className="panel-tabs" data-cy="SexFilter">
        {Object.values(Gender).map((sex) => (
          <LinkWithParams
            key={sex}
            to={{
              sex: sex === Gender.ALL ? null : sex.toLowerCase().charAt(0),
            }}
          >
            <a
              role="button"
              tabIndex={0}
              onClick={() => setFilterGenderStatus(sex)}
              onKeyDown={(e) => e.key === 'Enter' && setFilterGenderStatus(sex)}
              className={`panel-tab ${filterGenderStatus === sex ? 'is-active' : ''}`}
              style={{ cursor: 'pointer', textDecoration: 'none' }}
            >
              {sex}
            </a>
          </LinkWithParams>
        ))}

      </p>

      <div className="panel-block">
        <p className="control has-icons-left">
          <input
            data-cy="NameFilter"
            type="search"
            className="input"
            value={searchQuery}
            onChange={handleSearchChange}
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
              <LinkWithParams
                key={century}
                to={{
                  centuries: centuries.includes(century)
                    ? centuries.filter(cent => cent !== century)
                    : [...centuries, century],
                }}
              >
                <button
                  type="button"
                  onClick={() => toggleCentury(century)}
                  className={`button mr-1 ${centuries.includes(century) ? 'is-info' : ''}`}
                >
                  {century}
                </button>
              </LinkWithParams>
            ))}
            <LinkWithParams to={{ centuries: [] }}>
              <button
                type="button"
                onClick={resetAllCenturies}
                className={`button is-success ${centuries.length > 0 ? '' : 'is-outlined'}`}
              >
                All
              </button>
            </LinkWithParams>
          </div>
        </div>
      </div>

      <div className="panel-block">
        <Link
          onClick={resetAllFilters}
          className="button is-link is-outlined is-fullwidth"
          to="."
        >
          Reset all filters
        </Link>
      </div>
    </nav>
  );
};
