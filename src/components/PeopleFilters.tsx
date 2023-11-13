import classNames from 'classnames';
import { Century, Gender } from '../types/Filters';
import { TableHeader } from '../types/TableHeader';

const centuries = [
  Century.XVI,
  Century.XVII,
  Century.XVIII,
  Century.XIX,
  Century.XX,
];

const genders = [
  { title: Gender.All, param: '' },
  { title: Gender.Male, param: '?sex=m' },
  { title: Gender.Female, param: '?sex=f' },
];

type Props = {
  selectedGender: Gender;
  setSelectedGender: (title: Gender) => void;
  query: string
  setQuery: (query: string) => void;
  selectedCenturies: Century[]
  setSelectedCenturies: (arr: Century[]) => void;
  sortBy: TableHeader | string
  isReversed: boolean
  toggleCentury: (century: Century) => void;
  resetFilters: () => void;
};

export const PeopleFilters: React.FC<Props> = ({
  selectedGender,
  setSelectedGender,
  query,
  setQuery,
  selectedCenturies,
  setSelectedCenturies,
  toggleCentury,
  resetFilters,
}) => {
  return (
    <nav className="panel">
      <p className="panel-heading">Filters</p>

      <p className="panel-tabs" data-cy="SexFilter">
        {genders.map(gender => (
          <a
            key={gender.param}
            className={classNames({
              'is-active': selectedGender === gender.title,
            })}
            href={`#/people${gender.param}`}
            onClick={() => setSelectedGender(gender.title)}
          >
            {gender.title}
          </a>
        ))}
      </p>

      <div className="panel-block">
        <p className="control has-icons-left">
          <input
            value={query}
            data-cy="NameFilter"
            type="search"
            className="input"
            placeholder="Search"
            onChange={(event) => setQuery(event?.target.value)}
          />

          <span className="icon is-left">
            <i className="fas fa-search" aria-hidden="true" />
          </span>
        </p>
      </div>

      <div className="panel-block">
        <div className="level is-flex-grow-1 is-mobile" data-cy="CenturyFilter">
          <div className="level-left">
            {centuries.map(century => (
              <a
                key={century}
                data-cy="century"
                className={classNames('button mr-1', {
                  'is-info': selectedCenturies.includes(century),
                })}
                href={`#/people?centuries=${century}`}
                onClick={() => toggleCentury(century)}
              >
                {century}
              </a>
            ))}
          </div>

          <div className="level-right ml-4">
            <a
              data-cy="centuryALL"
              className={classNames('button is-success', {
                'is-outlined': selectedCenturies.length,
              })}
              href="#/people"
              onClick={() => setSelectedCenturies([])}
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
          onClick={resetFilters}
        >
          Reset all filters
        </a>
      </div>
    </nav>
  );
};
