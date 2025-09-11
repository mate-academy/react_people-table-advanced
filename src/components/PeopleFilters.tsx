import classNames from 'classnames';
import { GenderOption } from '../types/GenderOption';
import { CenturyOption } from '../types/CenturyOption';
import { Link } from 'react-router-dom';

type Props = {
  genderFilterOption: GenderOption;
  setGenderFilterOption: (value: GenderOption) => void;
  centuriesOptions: CenturyOption[];
  toggleCentury: (value: CenturyOption) => void;
  query: string;
  setQuery: (value: string) => void;
};

export const PeopleFilters: React.FC<Props> = ({
  genderFilterOption,
  setGenderFilterOption,
  centuriesOptions,
  toggleCentury,
  query,
  setQuery,
}) => {
  return (
    <nav className="panel">
      <p className="panel-heading">Filters</p>

      <p className="panel-tabs" data-cy="SexFilter">
        <Link
          className={classNames({
            'is-active': genderFilterOption === GenderOption.All,
          })}
          to="."
          onClick={() => {
            setGenderFilterOption(GenderOption.All);
          }}
        >
          All
        </Link>
        <Link
          className={classNames({
            'is-active': genderFilterOption === GenderOption.Male,
          })}
          to={`?${genderFilterOption}`}
          onClick={() => {
            setGenderFilterOption(GenderOption.Male);
          }}
        >
          Male
        </Link>
        <Link
          className={classNames({
            'is-active': genderFilterOption === GenderOption.Female,
          })}
          to={`?${genderFilterOption}`}
          onClick={() => {
            setGenderFilterOption(GenderOption.Female);
          }}
        >
          Female
        </Link>
      </p>

      <div className="panel-block">
        <p className="control has-icons-left">
          <input
            data-cy="NameFilter"
            type="search"
            className="input"
            placeholder="Search"
            value={query}
            onChange={e => {
              setQuery(e.target.value);
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
            <Link
              data-cy="century"
              className={classNames('button mr-1', {
                'is-info': centuriesOptions.includes(CenturyOption.Sixteenth),
              })}
              to={`?${centuriesOptions}`}
              onClick={() => toggleCentury(CenturyOption.Sixteenth)}
            >
              16
            </Link>

            <Link
              data-cy="century"
              className={classNames('button mr-1', {
                'is-info': centuriesOptions.includes(CenturyOption.Seventeenth),
              })}
              to={`?${centuriesOptions}`}
              onClick={() => toggleCentury(CenturyOption.Seventeenth)}
            >
              17
            </Link>

            <Link
              data-cy="century"
              className={classNames('button mr-1', {
                'is-info': centuriesOptions.includes(CenturyOption.Eighteenth),
              })}
              to={`?${centuriesOptions}`}
              onClick={() => toggleCentury(CenturyOption.Eighteenth)}
            >
              18
            </Link>

            <Link
              data-cy="century"
              className={classNames('button mr-1', {
                'is-info': centuriesOptions.includes(CenturyOption.Nineteenth),
              })}
              to={`?${centuriesOptions}`}
              onClick={() => toggleCentury(CenturyOption.Nineteenth)}
            >
              19
            </Link>

            <Link
              data-cy="century"
              className={classNames('button mr-1', {
                'is-info': centuriesOptions.includes(CenturyOption.Twentieth),
              })}
              to={`?${centuriesOptions}`}
              onClick={() => toggleCentury(CenturyOption.Twentieth)}
            >
              20
            </Link>
          </div>

          <div className="level-right ml-4">
            <Link
              data-cy="centuryALL"
              className={classNames('button is-success', {
                'is-outlined': centuriesOptions.length > 0,
              })}
              to="."
              onClick={() => toggleCentury(CenturyOption.All)}
            >
              All
            </Link>
          </div>
        </div>
      </div>

      <div className="panel-block">
        <Link
          className="button is-link is-outlined is-fullwidth"
          to="."
          onClick={() => {
            setGenderFilterOption(GenderOption.All);
            setQuery('');
            toggleCentury(CenturyOption.All);
          }}
        >
          Reset all filters
        </Link>
      </div>
    </nav>
  );
};
