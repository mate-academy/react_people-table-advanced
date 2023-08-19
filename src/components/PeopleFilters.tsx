import classNames from 'classnames';
import { useSearchParams } from 'react-router-dom';
import { SearchParams, getSearchWith } from '../utils/searchHelper';
import { SearchLink } from './SearchLink';
import { Gender } from '../types';

const centuryOptions = ['16', '17', '18', '19', '20'];
const genderOptions = [
  { gender: 'All', value: Gender.All },
  { gender: 'Male', value: Gender.Male },
  { gender: 'Female', value: Gender.Female },
];

type Props = {
  sex: Gender,
  query: string,
  centuries: string[],
};

export const PeopleFilters:React.FC<Props> = ({
  sex, query, centuries,
}) => {
  const [searchParams, setSearchParams] = useSearchParams();

  function setSearchWith(params: SearchParams) {
    const search = getSearchWith(searchParams, params);

    setSearchParams(search);
  }

  function handleQueryChange(event: React.ChangeEvent<HTMLInputElement>) {
    setSearchWith({ query: event?.target.value || null });
  }

  function toggleCenturies(century: string) {
    return centuries.includes(century)
      ? centuries.filter(c => c !== century)
      : [...centuries, century];
  }

  return (
    <nav className="panel">
      <p className="panel-heading">Filters</p>

      <p className="panel-tabs" data-cy="SexFilter">
        {genderOptions.map(gender => (
          <SearchLink
            key={gender.gender}
            className={classNames({
              'is-active': sex === gender.value,
            })}
            params={{ sex: gender.value !== Gender.All ? gender.value : null }}
          >
            {gender.gender}
          </SearchLink>
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
            {centuryOptions.map(century => (
              <SearchLink
                key={century}
                params={{ centuries: toggleCenturies(century) }}
                data-cy="century"
                className={classNames('button mr-1', {
                  'is-info': centuries.includes(century),
                })}
              >
                {century}
              </SearchLink>
            ))}
          </div>

          <div className="level-right ml-4">
            <SearchLink
              params={{ centuries: null }}
              data-cy="centuryALL"
              className="button is-success is-outlined"
            >
              All
            </SearchLink>
          </div>
        </div>
      </div>

      <div className="panel-block">
        <SearchLink
          className="button is-link is-outlined is-fullwidth"
          params={{ query: null, centuries: null, sex: null }}
        >
          Reset all filters
        </SearchLink>
      </div>
    </nav>
  );
};
