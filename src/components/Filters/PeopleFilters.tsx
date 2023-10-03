import { useSearchParams } from 'react-router-dom';
import cn from 'classnames';
import { SearchOptionsType } from '../../types/SearchTypes';
import { getSearchWith } from '../../utils/searchHelper';
import { SearchLink } from '../SeachLink/SearchLink';

const CENTURIES = ['16', '17', '18', '19', '20'];
const MALE = 'm';
const FEMALE = 'f';

export const PeopleFilters = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const query = searchParams.get(SearchOptionsType.Query) || '';
  const sex = searchParams.get(SearchOptionsType.Sex) || null;
  const centuries: string[] = searchParams.getAll(
    SearchOptionsType.Centuries,
  ) || [];

  const handleChangeInput = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchParams(
      getSearchWith(searchParams, {
        [SearchOptionsType.Query]: event.target.value || null,
      }),
    );
  };

  const toggleCentury = (century: string) => {
    return centuries.includes(century)
      ? centuries.filter(cent => cent !== century)
      : [...centuries, century];
  };

  return (
    <nav className="panel">
      <p className="panel-heading">Filters</p>

      <p className="panel-tabs" data-cy="SexFilter">
        <SearchLink
          className={cn({
            'is-active': !sex,
          })}
          params={{ [SearchOptionsType.Sex]: null }}
        >
          All
        </SearchLink>

        <SearchLink
          className={
            cn({
              'is-active': sex === MALE,
            })
          }
          params={{ [SearchOptionsType.Sex]: MALE }}
        >
          Male
        </SearchLink>

        <SearchLink
          className={
            cn({
              'is-active': sex === FEMALE,
            })
          }
          params={{
            [SearchOptionsType.Sex]: FEMALE,
          }}
        >
          Female
        </SearchLink>
      </p>

      <div className="panel-block">
        <p className="control has-icons-left">
          <input
            data-cy="NameFilter"
            type="search"
            className="input"
            placeholder="Search"
            value={query}
            onChange={handleChangeInput}
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
              <SearchLink
                data-cy="century"
                key={century}
                className={
                  cn('button', 'mr-1', {
                    'is-info': centuries.includes(century),
                  })
                }
                params={{
                  [SearchOptionsType.Centuries]: toggleCentury(century),
                }}
              >
                {century}
              </SearchLink>
            ))}
          </div>
          <div className="level-right ml-4">
            <SearchLink
              data-cy="centuryALL"
              className={
                cn('button', 'is-success', {
                  'is-outlined': centuries.length,
                })
              }
              params={{ [SearchOptionsType.Centuries]: [] }}
            >
              All
            </SearchLink>
          </div>
        </div>
      </div>

      <div className="panel-block">
        <SearchLink
          className="button is-link is-outlined is-fullwidth"
          params={{
            [SearchOptionsType.Sex]: null,
            [SearchOptionsType.Query]: null,
            [SearchOptionsType.Centuries]: [],
          }}
        >
          Reset all filters
        </SearchLink>
      </div>
    </nav>
  );
};
